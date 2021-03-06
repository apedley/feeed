import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import firebaseAdmin from 'firebase-admin';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

import newsRoutes from './routes/news';
import usersRoutes from './routes/users';

import configFile from '../config.json'

let app = express();

const env = process.env.NODE_ENV || 'development';
console.log('Environment: ', env);
const config = configFile[env];

if (env !== 'test') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(bodyParser.json());

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(config.firebaseAdmin),
  databaseURL: config.firebaseDb
});

if (process.env.mongoConnection) {
  config.mongoConnectionString = process.env.mongoConnection
}

console.log('connecting to mongo on: ', config.mongoConnectionString);

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
module.exports = app;
