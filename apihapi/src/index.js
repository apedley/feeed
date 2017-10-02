import Hapi from 'hapi';
import mongoose from 'mongoose';
import restHapi from 'rest-hapi';

const env = process.env.NODE_ENV || 'development';

import environmentFile from '../environment.json'
const environmentConfig = environmentFile[env];

function api() {

  let server = new Hapi.Server();

  restHapi.config.server.port = environmentConfig.port;

  debugger;

  restHapi.config.mongo.URI = environmentConfig.mongoConnectionString;
  restHapi.config.logLevel = environmentConfig.logLevel;
  restHapi.config.modelPath = 'src/models';

console.dir(restHapi.config);

  server.connection({ port: environmentConfig.port, host: environmentConfig.host });

  server.register({
      register: restHapi,
      options: {
        mongoose: mongoose
      }
    },
    err => {
      server.start(err => {
        restHapi.logUtil.logActionComplete(restHapi.logger, "Server Initialized", server.info);
      });
    });

  return server;
}

module.exports = api();