import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    email: string;
    name: string;
    password: string;
    role: number;
    birthdate: Date;
    points: number;
    createdAt: Date;

    comparePassword: (password: string, callback: (error: Error | null, isMatch: boolean) => void) => void;
}

export const UserSchema = new Schema({
    email: {type: String, required: true, unique: true, trim: true,maxLength: 40},
    password: {type: String, required: true},
    name: {type: String, required: true, trim: true, maxLength: 40},
    role: {type: Number, default: 0},
    birthdate: {type: Date, required: true},
    points: {type: Number, default: 0},
    createdAt: { type: Date, default: Date.now },
});

/**
 * Validations
 */
UserSchema.path('email').validate(function validateEmail(email: string) {
    return email.length;
}, 'Email cannot be blank');

UserSchema.path('password').validate(function validatePassword(password: string) {
    return password.length;
}, 'Password cannot be blank');

UserSchema.path('name').validate(function validateName(name: string) {
    return name.length;
}, 'Name cannot be blank');

UserSchema.path('birthdate').validate(function validateBirthdate(birthdate: Date) {
    return birthdate;
}, 'Birthdate cannot be blank');


const SALT_FACTOR = 10;

UserSchema.pre<IUser>('save', function(next) {
    const user = this;

    // hash password
    bcrypt.genSalt(SALT_FACTOR, (error, salt) => {
        if (error) {
            return next(error);
        }
        bcrypt.hash(user.password, salt, (err, encrypted) => {
            if (err) {
                return next(err);
            }
            user.password = encrypted;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function comparePassword(password: string, cb: any) {
    const _this = this as any;
    bcrypt.compare(password, _this.password, function compareCallback(error, isMatch) {
        if (error) {
            return cb(error);
        }
        cb(null, isMatch);
    });
}

/**
 * Statics functions
 */
UserSchema.statics = {
    findByEmail: async function findByEmail(email: string) {
        return this.findOne({email});
    },
};

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);