import dotenv from 'dotenv';
import { ErrorReporter } from '@distinctai/node-error-reporting';

dotenv.config();

const ReportError = ErrorReporter.configure({
  sentryKey: <string>process.env.SENTRY_DSN,
});

export { ReportError };
