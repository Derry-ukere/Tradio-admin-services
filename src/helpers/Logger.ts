import LoggerFactory from '@distinctai/application-logger';

const Logger = LoggerFactory.configure({
  id: 'nodejs-ts-template',
  type: { type: 'file', filename: `logs/template_logs_${Date.now()}` },
  level: 'info',
});

export { Logger };
