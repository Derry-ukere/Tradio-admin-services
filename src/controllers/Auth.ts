import {Request,Response} from 'express';
import {AdminDto} from '../interfaces/Iadmin';
import {handleErrorResponse} from '../handlers/RouteHandlers';
import {generateToken} from '../helpers/AuthHelp';
import AuthServices from '../services/Auth';

export default class AuthController {
  static async registerUser (req : Request, res : Response){
    try {
      const status = await AuthServices.createClient(<AdminDto>req.query);
      res.status(200).json(status);
    } catch (error) {
      handleErrorResponse(error, res); 
    }
  }

  static async authenticateUser (req : Request, res : Response){
    try {
      const authenticated = await AuthServices.authenticateUser(req.query);
      if(authenticated){
        return   res.status(200).json({
          data: authenticated,
          token:generateToken(authenticated._id)
        });                                  
      }
    } catch (error) {
      handleErrorResponse(error, res); 
    }
  }
 
  static async sendRecovermail (req : Request, res : Response){
    try {
      const status = await AuthServices.sendPasswordRecoveryMail(req.query);
      res.status(200).json(status);
    } catch (error) {
      console.log('error from controller',error);
      handleErrorResponse(error, res); 
    }
  }
}
