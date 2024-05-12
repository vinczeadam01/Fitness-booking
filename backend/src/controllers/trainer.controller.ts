import {NextFunction, RequestHandler, Request, Response} from 'express';
import {Trainer} from "../models/Trainer";
import RolesConfig from "../configs/roles.config";
import {Course} from "../models/Course";
import {createUploadUrl} from "../helpers/Url.helper";

export default class TrainerController {
    public getTrainer: RequestHandler = (req, res, next) => {
        Trainer.findOne({ _id: req.params.id }).then(trainer => {
            res.status(200).send(trainer);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public getAllTrainers: RequestHandler = (req, res, next) => {
        Trainer.find().then(trainers => {
            res.status(200).send(trainers);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public createTrainer: RequestHandler = (req, res, next) => {
        const trainer = new Trainer({
            name: req.body.name,
            description: req.body.description
        });

        trainer.save().then(result => {
            res.status(201).send(result);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public updateTrainer: RequestHandler = (req, res, next) => {
        Trainer.findOneAndUpdate({_id: req.params.id}, {
            name: req.body.name,
            description: req.body.description
        }).then(result => {
            res.status(200).send(result);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public deleteTrainer: RequestHandler = (req, res, next) => {
        Trainer.findOneAndDelete({_id: req.params.id}).then(result => {
            res.status(200).send(result);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public getTrainerCourses: RequestHandler = (req, res, next) => {
        Course.findByTrainer(req.params.id).then(courses => {
            res.status(200).send(courses);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public uploadImage: RequestHandler = (req: any, res, next) => {
        const url = createUploadUrl(req.files.file.path);
        Trainer.findByIdAndUpdate(req.params.id, {img: url}).then(() => {
            res.status(200).send({url});
        }).catch(error => {
            res.status(500).send(error);
        });
    }
}