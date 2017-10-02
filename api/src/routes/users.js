import {
  Router
} from "express";
import Request from "request";
import uuidv4 from 'uuid';
import * as FirebaseAdmin from "firebase-admin";

import {
  sendError,
  firebaseAuthTokenMiddleware
} from '../utils';
import User from '../models/user';

export default ({
  config
}) => {
  let api = Router();

  api.get('/test', firebaseAuthTokenMiddleware, (req, res) => {
    res.send('test');
  })

  api.post('/login', (req, res, next) => {
    const email = req.body.email;
    const clientToken = req.body.token || '';

    console.info('token' + clientToken);


    if (!email) {
      return sendError(res, 'Email required');
    }

    FirebaseAdmin.auth().verifyIdToken(clientToken)
      .then(decodedToken => {
        debugger;
      }).catch(err => {
        console.log(err) 
      })

    User.findOneAndUpdate(
      { email }, 
      { clientToken },
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

  api.get('/:email', (req, res, next) => {
    const email = req.params.email;

    if (!email) {
      return sendError(res, 'Email required');
    }
    User.findOne({
      email
    }, (err, user) => {
      if (err) {
        return sendError(res, err);
      }

      if (!user) {
        return sendError(res, 'Did not get a response');
      }

      res.status(200).json(user.toObject());
    })
  });

  api.post('/', (req, res, next) => {

    const email = req.body.email;
    const authId = req.body.authId;
    const language = req.body.language || 'en';
    if (!email || !authId) {
      return sendError(res, 'Email and authid required');
    }

    User.findOne({
      email
    }, (err, existingUser) => {
      if (err) {
        return sendError(res, err);
      }
      if (existingUser) {
        return sendError(res, 'Email associated with another account');
      }

      const user = new User({
        email,
        authId,
        language
      });

      user.save(err => {
        if (err) {
          return sendError(res, err);
        }

        res.status(200).json({
          user: user.toObject()
        });
      })
    })
  })
  return api;
}