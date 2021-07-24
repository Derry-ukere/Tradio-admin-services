import bunyan from 'bunyan';

require('dotenv').config();

const Logger = {  
  development : () => {
    bunyan.createLogger({name: 'development', level : 'debug'});
  },
  production : () => {
    bunyan.createLogger({name: 'production', level : 'info'});
  },
  test : () => {
    bunyan.createLogger({name: 'test', level : 'fatal'});
  }
};

  
export const  configurations   = {
  development: {
    log: Logger.development,
    database: {
      dsn: process.env.DEVELOPMENT_DB_DSN,
    },
  },
  production: {
    log: Logger.production,
    database: {
      dsn: process.env.PRODUCTION_DB_DSN,
    },
  },
  test: {
    log: Logger.test,
    database: {
      dsn: process.env.TEST_DB_DSN,
    },
  },
};
