import mongoose from 'mongoose';
import  bcrypt from 'bcrypt';
import {AdminDto} from '../interfaces/Iadmin';


const clientSchema = new mongoose.Schema({
  email : {type : String},
  password : {type : String},
  name: {type : String},
}); 

   

clientSchema.pre<AdminDto>('save', async function (next){
  if(!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
});

const Client = mongoose.model('Client',clientSchema);
export default Client;
