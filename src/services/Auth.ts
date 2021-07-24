import { AdminDto } from '../interfaces/Iadmin';
import AdminModel from '../entity/adminEntity';
import { Logger } from '../helpers';
import AdminServices from './Client';
import  bcrypt from 'bcrypt';
import {generateToken} from '../helpers/AuthHelp';
import {sendMail,sendPasswordRecoverMail} from './Notification';

export default class AuthServices {
  static  async createClient (clientData : AdminDto){
    try {
      const {name, email} = clientData;
      const clientExist = await AdminModel.findOne({email});
      let randompassword = Math.random().toString(8).substring(3);
      console.log('randompassword', randompassword);
      if (clientExist){
        throw new Error ('user already exist');
      }
      const registeredClient = await AdminModel.create({
        name,
        email,
        password : randompassword,
      });
      if(registeredClient){
        sendMail(registeredClient.email,randompassword);
        Logger.info('user created', registeredClient._id);
        return {
          message : `User created sucessfully,${registeredClient._id}`,
        };
      }
     
    } catch (error) {
      Logger.error(' user was not created',error);
      throw new Error ('unable to create user');
    }
  }

  static async authenticateUser (data : {email : string, password : string}){
    let user! :  AdminDto;
    try{
      user  =  await AdminServices.lookUpClientWithEmail(data.email);
      if (user){
        console.log('current user password is--', user.password);
        const matched =  await bcrypt.compare(data.password, user.password);
        if(!matched){
          throw new Error('invalid password');
        }
      }
      return user;

    }catch(error){
      Logger.error(' user was not logged in', error);
      throw new Error('user not found');
    }
  }


  static  async sendPasswordRecoveryMail (data : {email : string}){
    try {
      const {email} = data; 
      const clientExist = await AdminModel.findOne({email});
      if (!clientExist){
        throw new Error ('Email does not exist');
      } 
      const token = generateToken(clientExist._id);
      sendPasswordRecoverMail(token,clientExist.email);
      Logger.info('recovery mail sent successfully', clientExist._id);
      return {
        message : `recovery mail sent successfully,${clientExist._id}`,
      };
    }
    catch (error) {
      Logger.error('unable to send mail',error);
      throw new Error ('unable to send mail');
    }
  }
}

