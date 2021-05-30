import { Logger } from '../../helpers/Logger';
import { ErrorLog } from '../../handlers/ErrorLog';

describe('ErrorLog tests', () => {
  it('Should log error', () => {
    Logger.Error = jest.fn();

    ErrorLog.log('__DUMMY__');

    expect(Logger.Error).toHaveBeenCalledTimes(1);
  });
});
