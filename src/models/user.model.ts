import mongoose, { SchemaType } from "mongoose";

export interface User {
    fullName: string;
    username: string;
    email: string;
    password: string;
    role: string;
    profilePicture: string;
    isActive: boolean;
    activationCode: string;
}

const Schema = mongoose.Schema;

const userSchema = new Schema<User>(   
    {
        fullName: {
            type: Schema.Types.String,
            required: true
        },
        username: {
            type: Schema.Types.String,
            required: true
        },
        email: {
            type: Schema.Types.String,
            required: true
        },
        password: {
            type: Schema.Types.String,
            required: true
        },
        role: {
            type: Schema.Types.String,
            default: "user"
        },
        profilePicture: {
            type: Schema.Types.String,
            default: "user.jpg"
        },
        isActive: {
            type: Schema.Types.Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;