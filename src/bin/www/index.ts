/* istanbul ignore file */
import errorHandler from 'errorhandler';
import { createConnection } from 'typeorm';

import app from '../../app';
import dbConnection from '../../typeorm';
import { autoCreateDb } from '../../mysql';
import { Logger } from '../../helpers';

app.use(errorHandler());

(async () => {
  await autoCreateDb();

  await createConnection(dbConnection)
    .then(() => {
      // Initialize server
      const server = app.listen(process.env.APP_PORT || 8000, () => {
        const port = app.get('port');

        Logger.Info(`Service Started at http://localhost:${port}`);
        Logger.Info('Press CTRL+C to stop\n');
      });

      // Nodemon dev hack
      process.once('SIGUSR2', function() {
        server.close(function() {
          process.kill(process.pid, 'SIGUSR2');
        });
      });
    })
    .catch(error => {
      Logger.Error('(TypeORM) Database connection error: ', error);
    });
})();
