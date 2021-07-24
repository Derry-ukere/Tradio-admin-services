/* eslint-disable linebreak-style */


export interface AdminDto  {
  _id:string
  email : string
  password : string
  name :  string
  isModified: (arg0: string) => any; 
}

export interface AdminRegistrationDto  {
  email : string
  password : string
  name :  string
}

