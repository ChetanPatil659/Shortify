import User from '../models/UserModel.js'
import { compareHash, createHash } from '../util/hash.js';

//create user 
export const createUser = async(payload)=>{
    try{
        const user = await User.create({...payload, password: createHash(payload.password)});
        return user;
    }catch(error){
        throw Error(error)
    }
}

//login user
export const loginUser = async(payload)=>{
    try {
        const user = await User.findOne({ email: payload.email });
        if (!user) return false;
    
        //compare the password
        const passwordMatch = compareHash(payload.password, user.password);
        if (!passwordMatch) return false;
    
        return user;
      } catch (error) {
        throw Error(error);
      }
}