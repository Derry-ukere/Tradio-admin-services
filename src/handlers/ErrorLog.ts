/* istanbul ignore file */

import { Logger } from '../helpers/Logger';

export const ErrorLog = {
  /**
   * Log an error
   * @param err
   */
  log(err: Error | string) {
    'string' === typeof err ? Logger.error('SERVER_ERROR: ', err) : Logger.error('SERVER_ERROR: ', err.message, err.stack);
  },
};
