import {Request,Response} from 'express';
import {handleErrorResponse} from '../handlers/RouteHandlers';
import AdminServices from '../services/Client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


interface jwtType {
  id: string
}
export default class ClientController {
  
  // @desc    a function to get all users
  // @route   GET /api/client/lookup/all
  // @access  private
  static async lookupAllClient(req : Request, res : Response){
    try {
      const allAdmin = await   AdminServices.lookUpAllAdmin();
      return  res.send(allAdmin);
    }catch(error){
      handleErrorResponse(error, res); 
    }
  }

  //@ a function to update bank and card details
  // @route    Post /api/client/emailAndPhone
  // @access  private
  static async deleteClient(req : Request, res : Response){
    try {
      const {id} = req.query;
      const client = await AdminServices.deleteAdmin(id);
      return  res.send(client);
    }catch(error){
      handleErrorResponse(error, res); 
    }
  } 

  // @desc   a function to reset and save password 
  // @route    Post /api/client/reset-passoword
  // @access  private
  static async resetPassword(req : Request, res : Response){
    let user : any;
    try {
      const {id,oldPassword, password} = req.query;
      const decoded : any = jwt.decode(id);
      if (decoded){
        user  =  await AdminServices.lookUpClientWithId(decoded.id);
        if (user){
          console.log('user is', user);
          const matched =  await bcrypt.compare(oldPassword, user.password);
          if(!matched){
            console.log('password does not match', oldPassword, user.password);
            throw new Error('invalid password');
          }
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        console.log('hashed password is',hashedPassword);
        const client = await AdminServices.resetPassword(decoded,hashedPassword);
        return  res.send(client);
      }
     
    }catch(error){
      handleErrorResponse(error, res); 
      console.log('error',error);
    }
  }

}


