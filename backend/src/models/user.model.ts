import mongoose, {Schema} from "mongoose"; 

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    lastLogin: Date;
    isVerified: boolean;
    resetPasswordToken: string;
    resetPasswordExpiresAt?: Date;
    verificationToken: string;
    verificationTokenExpiresAt?: Date;
}
const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    }, 
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: {
        type: String,
        default: null,
    }, 
    resetPasswordExpiresAt: {
        type: Date,
        default: null,
    }, 
    verificationToken: {
        type: String,
        default: null,
    }, 
    verificationTokenExpiresAt: {
        type: Date,
        default: null,
    },
},{timestamps: true})
    .index({ email: 1 }, { unique: true });      


export const User = mongoose.model<IUser>("User", userSchema);