import { User } from "../models/user.model"
import jwt from "jsonwebtoken"
import { SECRET } from "./env"
import { Types } from "mongoose"


export interface IUserToken extends Omit<User,
    | "password" 
    | "activationCode" 
    | "isActive" 
    | "profilePicture" 
    | "fullName"
    | "email" 
    | "username"
    > {
        id?: Types.ObjectId
}

export const generateToken = (user: IUserToken): string => {
    const token = jwt.sign (user, SECRET, {
        expiresIn: "1h"
    })

    return token
}

export const getUserData = (token: string) => {
    const user = jwt.verify(token, SECRET) as IUserToken;
    
    return user;
}