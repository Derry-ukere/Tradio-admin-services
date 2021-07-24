import errorHandler from 'errorhandler';
import app from '../../app'; 
import { Logger } from '../../helpers';    
import connectDB from '../../lib/db';                                  
          
app.use(errorHandler());                                         
(async () => {   
  app.set('port', (process.env.PORT || 7000));    
       
  await connectDB()     
    .then(() => {           
      // Initializure server                     
      const server = app.listen(app.get('port')); 

      server.on('listening',()=>{
        Logger.info(`Hi there! I'm listening on port 7000  in ${app.get('env')} mode.`,);
      });
      // Nodemon dev hack ff
      process.once('SIGUSR2', function() { 
        server.close(function() { 
          process.kill(process.pid, 'SIGUSR2');     
        });
      }); 
    })
    .catch(error => {
      Logger.error('(TypeORM) Database connection error: ', error);
    });
})();  

