import {NextFunction, RequestHandler, Request, Response} from 'express';
import {User} from "../models/User";
import {Registration} from "../models/Registration";
import {Course} from "../models/Course";

export default class UserController {
    public getUser: RequestHandler = (req, res, next) => {
        User.findById(req.params.id).then(user => {
            res.status(200).send(user);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public getAllUsers: RequestHandler = (req, res, next) => {
        User.find().then(users => {
            res.status(200).send(users);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public updateUser: RequestHandler = (req, res, next) => {
        User.findByIdAndUpdate(req.params.id, req.body).then(user => {
            res.status(200).send(user);
        }).catch(error => {
            res.status(500).send(error);
        });
    }
    getUserRegistrations: RequestHandler = (req, res, next) => {
        Registration.find({user: req.params.id})
            .populate('course')
            .then(registrations => {
                res.status(200).send(registrations);
            }).catch(error => {
                res.status(500).send(error);
        });
    };

    getUserFavoriteCourses: RequestHandler = (req, res, next) => {
        Registration.find({ user: req.params.id })
            .distinct('course')
            .then(courseIds => {
                // Populate each course individually
                const promises = courseIds.map(courseId => {
                    return Course.findById(courseId).populate('trainer').exec();
                });

                return Promise.all(promises);
            })
            .then(courses => {
                res.status(200).send(courses);
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }
}