import {User} from '../models/User';
import passportLocal from 'passport-local';
import {PassportStatic} from "passport";

export default function passportConfig(passport: PassportStatic) {
    passport.serializeUser((user: Express.User, done: any) => {
        done(null, user);
    });

    passport.deserializeUser((user: Express.User, done: any) => {
        done(null, user);
    });

    passport.use('local', new passportLocal.Strategy(async (email, password, done) => {
        // db query
        const user: any = await User.findOne({email: email});
        if (!user) {
            return done(null, undefined);
        }
        user.comparePassword(password, (err: any, isMatch: boolean) => {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, undefined);
            }
            return done(null, user);
        });
    }));
}
