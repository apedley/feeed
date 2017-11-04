import {
  Router
} from "express";


import {
  sendError,
  firebaseAuthTokenMiddleware
} from '../utils';
import User from '../models/user';
import Subscription from '../models/subscription';

export default () => {
  let api = Router();

  // get info
  api.post('/current', firebaseAuthTokenMiddleware, (req, res) => {

    const userData = req.body;

    User.findOne({ email: userData.email })
      .exec((err, user) => {
        
        if (err) {
          return sendError(res, err);
        }

        if (!user) {
          return sendError(res, 'Could not find user');
        }

        User.findOneAndUpdate(
          { email: userData.email },
          { authId: userData.authId })
          .populate('subscriptions')
          .exec((err, newUser) => {
            if (err) {
              return sendError(err);
            }
            res.status(200).json(newUser.toObject());
          });

      })
  });


  // Sign up
  api.post('/', (req, res) => {
    const userData = req.body;
    if (!userData.email || !userData.authId ) {
      return sendError(res, 'Email and authid required');
    }

    User.findOne({
      email: userData.email
    }, (err, existingUser) => {
      if (err) {
        return sendError(res, err);
      }

      if (existingUser) {
        return sendError(res, 'Email associated with another account');
      }

      const user = new User(userData);

      user.save(err => {
        if (err) {
          return sendError(res, err);
        }

        res.status(201).json({
          user: user.toObject()
        });
      })
    })
  });

  api.post('/subscribe', firebaseAuthTokenMiddleware, (req, res) => {
    let authId = res.locals.token.uid;

    if (!authId) {
      return sendError(res, 'authId required');
    }

    const subscriptionData = req.body;

    User.findOne({ authId })
      .populate('subscriptions')
      .exec((err, user) => {

      if (err) {
        return sendError(res, err);
      }

      if (!user) {
        return sendError(res, 'Did not get a response');
      }

      for (let i = 0; i < user.subscriptions.length; i++) {
        if (user.subscriptions[i].sourceId === subscriptionData.sourceId) {
          return sendError(res, 'User is already subscribed');
        }
      }
      const data = {
        ...subscriptionData,
        user: user._id
      }


      const subscription = new Subscription(data);

      subscription.save(err => {
        if (err) {
          return sendError(res, err);
        }

        user.subscriptions.push(subscription);
        user.save(err => {
          if (err) {
            return sendError(res, err);
          }

          res.status(201).json(subscription.toObject());
        })
                
      })
    })

  })

  api.post('/unsubscribe', firebaseAuthTokenMiddleware, (req, res) => {
    let authId = res.locals.token.uid;

    if (!authId) {
      return sendError(res, 'authId required');
    }

    const subscriptionData = req.body;
    User.findOne({ authId })
      .populate('subscriptions')
      .exec((err, user) => {
        if (err) {
          return sendError(res, err);
        }
        debugger;
        Subscription.findOneAndRemove({ sourceId: subscriptionData.sourceId, user: user._id}, (findRemoveErr, subscription) => {
          
          if (findRemoveErr) {
            return sendError(res, findRemoveErr);
          }
          User.update({ authId}, { $pull: { 'subscriptions':  subscription._id}  }, (updateErr, result) => {
            
            if (updateErr) {
              return sendError(res, updateErr);
            }

            return res.status(200).json({
              "status": "ok"
            })
          })
        })

      });
  });

  api.get('/test', (req, res) => {
    res.status(200).json({
      "test": "ok"
    })
  })
  return api;
}