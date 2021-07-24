
import Admin from '../entity/adminEntity';
import {JwtPayload} from 'jsonwebtoken';



export default  class AdminServices {
  static async lookUpClientWithEmail ( email : string) {
    if(!email){
      throw new Error ('user not found, specify user email');
    }
    try{
      const client = await Admin.findOne({email});
      if(!client){
        throw new Error ('user not found');
      }
      return client;
    }catch (error){
      throw {
        ...error
      };
    }
  }

  static async deleteAdmin (id : string) {
    try{
      const client = await Admin.findByIdAndDelete(id);
      return client;
    }catch (error){
      throw {
        ...error
      };
    }
  }

  static async lookUpClientWithId (id : string | JwtPayload | null) {
    if(!id){
      throw new Error ('user not found, specify id');
    }
    try{
      const client = await Admin.findById(id);
      return client;
    }catch (error){
      throw {
        ...error
      };
    }
  }

  static async lookUpAllAdmin ( ) {
    try{
      const clients = await Admin.find();
      return clients;
    }catch (error){
      throw {
        ...error
      };
    }
  }


  static async resetPassword ( obj:any, password:string) {
    try{
      const id = obj.id;
      const options = {
        'password': password,
      };
      const user =  await Admin.findByIdAndUpdate(id, {$set: options}, (err : any, doc : any) =>{
        if (err) {
          throw new Error('An Error occured while updating user info');
        }
        return {
          message: 'User passworded updated sucessfully',
          user: doc
        };
      });
      return user;
    }catch (error){
      throw {
        ...error
      };
    }
  }
}

