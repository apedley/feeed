import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';
import configFile from '../config.json'

let app = express();

const env = process.env.NODE_ENV || 'development';

const config = configFile[env];

if (env !== 'test') {
  app.use(morgan('dev'));
}

app.use(cors({
  exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
  limit: config.bodyLimit
}));

app.use('/', routes({ config }));


// Only open port if this is run directly, not testing
if (!module.parent) {
  app.listen(config.port, () => {
    console.log(`Starting on port ${config.port}`);
  });
}

export default app;