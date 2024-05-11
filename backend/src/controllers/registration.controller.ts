import {NextFunction, RequestHandler, Request, Response} from 'express';
import {Course, ICourse} from "../models/Course";
import {Document} from "mongoose";
import {IUser} from "../models/User";
import roles from "../configs/roles.config";
import {Registration} from "../models/Registration";

export default class RegistrationController {
    createRegistration: RequestHandler = (req: Request, res, next) => {
        let userId;
        if ((req.user as IUser).role == roles.ADMIN) {
            userId = req.body.userId;
        } else {
            userId = (req.user as IUser)._id;
        }
        const courseId = req.body.courseId;
        const appointmentId = req.body.appointmentId;

        const registration = new Registration({
            user: userId,
            course: courseId,
            appointmentId: appointmentId,
            date: new Date()
        });

        registration.save().then((registration) => {
            res.status(200).send(true);
        }).catch((error) => {
            res.status(500).send(false);
        });
    }

    deleteRegistration: RequestHandler = (req: Request, res, next) => {
        let filter;
        if ((req.user as IUser).role == roles.ADMIN) {
            filter = {
                _id: req.params.id
            };
        } else {
            filter = {
                _id: req.params.id,
                user: (req.user as IUser)._id
            };
        }

        Registration.findOneAndDelete(filter).then(result => {
            res.status(200).send(result);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    cancelRegistration: RequestHandler = (req: Request, res, next) => {
        const userId = (req.user as IUser)._id;
        const appointmentId = req.body.appointmentId;

        Registration.findOneAndDelete({user: userId, appointmentId: appointmentId}).then(result => {
            res.status(200).send(true);
        }).catch(error => {
            res.status(500).send(false);
        });
    }
}