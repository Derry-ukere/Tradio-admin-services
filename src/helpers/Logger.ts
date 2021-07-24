import bunyan from 'bunyan';

const Logger = bunyan.createLogger({name: 'development', level : 'debug'});

export { Logger };

