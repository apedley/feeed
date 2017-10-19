import {
  Router
} from "express";
import * as FirebaseAdmin from "firebase-admin";

import {
  sendError,
  firebaseAuthTokenMiddleware
} from '../utils';
import User from '../models/user';
import Subscription from '../models/subscription';

export default ({ config }) => {
  let api = Router();

  // get info
  api.get('/current', firebaseAuthTokenMiddleware, (req, res) => {

    let authId = res.locals.token.uid;

    if (!authId) {
      return sendError(res, 'authId required');
    }

    // User.findOne(
    //   { authId },
    //   (err, user) => {
    //     if (err) {
    //       return sendError(res, err);
    //     }

    //     if (!user) {
    //       return sendError(res, 'Did not get a response');
    //     }

    //     res.status(200).json(user.toObject());
    //   })

    User.findOne({ authId })
      .populate('subscriptions')
      .exec((err, user) => {
        debugger;
        if (err) {
          return sendError(res, err);
        }

        if (!user) {
          return sendError(res, 'Did not get a response');
        }

        res.status(200).json(user.toObject());
      })
  } );
  

  // Log in
  api.post('/login', (req, res) => {
    const email = req.body.email;
    const firebaseToken = req.body.token || '';

    console.info('token' + firebaseToken);


    if (!email) {
      return sendError(res, 'Email required');
    }

    FirebaseAdmin.auth().verifyIdToken(firebaseToken)
      .then(decodedToken => {
        console.log('decoded', decodedToken);
      }).catch(err => {
        console.log(err) 
      })

    User.findOneAndUpdate(
      { email }, 
      { firebaseToken },
      { new: true },
      (err, user) => {
        if (err) {
          return sendError(res, err);
        }

        if (!user) {
          return sendError(res, 'Did not get a response');
        }

        res.status(200).json(user.toObject());
      })
  })


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

        res.status(200).json({
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

    User.findOne({ authId }, (err, user) => {
      if (err) {
        return sendError(res, err);
      }

      if (!user) {
        return sendError(res, 'Did not get a response');
      }

      const data = {
        ...subscriptionData,
        user: user._id
      }
      debugger;

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

          res.status(200).json({
            subscription: subscription.toObject()
          });
        })
                
      })
    })

  })
  return api;
}