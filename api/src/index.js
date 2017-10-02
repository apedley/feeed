import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import firebaseAdmin from 'firebase-admin';

import mongoose from 'mongoose';

import { sendError } from './utils';

import newsRoutes from './routes/news';
import usersRoutes from './routes/users';

import configFile from '../config.json'

let app = express();

const env = process.env.NODE_ENV || 'development';

const config = configFile[env];

if (env !== 'test') {
  app.use(morgan('dev'));
}

// app.use(cors({
//   exposedHeaders: config.corsHeaders
// }));
app.use(cors());

app.use(bodyParser.json({
  limit: config.bodyLimit
}));

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(config.firebaseAdmin),
  databaseURL: config.firebaseDb
});

mongoose.connect(config.mongoConnectionString, {
  useMongoClient: true
});

app.use('/users', usersRoutes({ config }));
app.use('/news', newsRoutes({ config }));

// Only open port if this is run directly, not testing
if (!module.parent) {
  app.listen(config.port, () => {
    console.log(`Starting on port ${config.port}`);
  });
}

export default app;