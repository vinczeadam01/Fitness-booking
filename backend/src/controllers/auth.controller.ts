import {NextFunction, RequestHandler, Request, Response} from 'express';
import passport from "passport";
import {User} from "../models/User";

export default class AuthController {
    public login: RequestHandler = (req, res, next) => {
        passport.authenticate('local', (err: any, user: any) => {
            if (err) {
                res.status(500).send(err.toString());
            } else {
                req.login(user, (error) => {
                    if (error) {
                        console.log(error);
                        res.status(500).send('Incorrect username or password.');
                    } else {
                        res.status(200).send(user);
                    }
                });
            }
        })(req, res, next);
    };

    public signup = (req: Request, res: Response, next: NextFunction) => {
        const email = req.body.email;
        const password = req.body.password;
        const user = new User({email: email, password: password});
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    };

    public logout: RequestHandler = (req, res) => {
        res.send('Logged out');
    };

}