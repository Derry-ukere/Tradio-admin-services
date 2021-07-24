import  jwt from 'jsonwebtoken';

export const generateToken = (id : string) =>{
  return jwt.sign({id}, 'abc123',{
    expiresIn:'1d'
  });
};


