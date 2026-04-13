import { request, Request, Response } from "express";
import * as Yup from "yup";
import UserModel from "../models/user.model";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { IReqUser } from "../middlewares/auth.middleware";

type TRegister = {
    fullName: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

type TLogin = {
    identifier: string,
    password: string
}

const registerValidateSchema = Yup.object({
    fullName: Yup.string()
        .required(),
    username: Yup.string()
        .required(),
    email: Yup.string()
        .email()
        .required(),
    password: Yup.string()
        .required()
        .min(8, "Password must be at least 8 characters")
        .test(
            "at-least-one-uppercase", 
            "Password must contain at least one uppercase letter", 
            (value) => /[A-Z]/.test(value)
        )
        .test(
            "at-least-one-number", 
            "Password must contain at least one number", 
            (value) => /[0-9]/.test(value)
        ),
    confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), ""], "Password does not match") 
})

export default {
    async register (req: Request, res: Response) {

        /**
            #swagger.tags = ['Auth']            
         */

        const { fullName, username, email, password, confirmPassword } = 
        req.body as unknown as TRegister;

    try {

        await registerValidateSchema.validate({
            fullName, 
            username, 
            email, 
            password, 
            confirmPassword
        });

        const result = await UserModel.create({
            fullName, 
            username, 
            email, 
            password
        });

        res.status(200).json({
            message: "Register successfully",
            data: result
        });

    } catch(error) {

        const err = error as unknown as Error;

        res.status(400).json({

            message: err.message,
            data: null

        });
    }

    },

    async login (req: Request, res: Response) {

        /**
            #swagger.tags = ['Auth']
            #swagger.requestBody = {
                required: true,
                schema: { $ref: "#/components/schemas/LoginRequest" }
            }

         */

        const { identifier, password } = req.body as unknown as TLogin;

        try {

            const userByIdentifier = await UserModel.findOne({
                $or: [
                    {
                        email: identifier
                    },
                    {
                        username: identifier
                    }
                ]
            });

            if (!userByIdentifier) {
                return res.status(403).json({
                    message: "User not found",
                    data: null
                })
            }

            const validatePassword: boolean = encrypt(password) === userByIdentifier.password;
            
            if (!validatePassword) {
                return res.status(403).json({
                    message: "Invalid password",
                    data: null
                })
            }

            const token = generateToken({
                id: userByIdentifier._id,
                role: userByIdentifier.role                
            })

            res.status(200).json({
                message: "Login successfully",
                data: token
            })

        } catch(error) {

            const err = error as unknown as Error;

            res.status(400).json({

                message: err.message,
                data: null

            });
        }

    },

    async me (req: IReqUser, res: Response) {

        /**
            #swagger.tags = ['Auth']
            #swagger.security = [
                {
                    "bearerAuth": []
                }
            ]

         */


        try {

            const user = req.user;
            const result = await UserModel.findById(user?.id);

            res.status(200).json({
                message: "Get user successfully",
                data: result
            })
            
        } catch (error) {

            const err = error as unknown as Error;

            res.status(400).json({

                message: err.message,
                data: null

            });
        }
    }
}