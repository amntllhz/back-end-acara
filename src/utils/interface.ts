import { User } from "../models/user.model";
import { Request } from "express";
import { Types } from "mongoose";

export interface IReqUser extends Request {
    user?: IUserToken
}

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

export interface IPaginationQuery {
    page: number;
    limit: number;
    search?: string;
}