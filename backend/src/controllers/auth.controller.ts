import {NextFunction, RequestHandler, Request, Response} from 'express';
import passport from "passport";
import {User} from "../models/User";

export default class AuthController {
    public login: RequestHandler = (req, res, next) => {
        passport.authenticate('local', (err: any, user: any) => {
            if (err) {
                res.status(400).send(err.toString());
            } else {
                req.login(user, (error) => {
                    if (error) {
                        console.log(error);
                        res.status(400).send('Incorrect username or password.');
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
        const name = req.body.name;
        const user = new User({email: email, password: password, name: name});
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    };

    public logout: RequestHandler = (req, res) => {
        if (req.isAuthenticated()) {
            req.session.destroy(err => console.log(err));
            res.status(200).send({message: 'User is logged out.'});
        } else {
            res.status(500).send({message: 'User is not logged in.'});
        }
    };

    public check: RequestHandler = (req, res) => {
        res.send(req.isAuthenticated());
    };

    public user: RequestHandler = (req, res) => {
        res.send(req.user);
    }
}