import roles from "../configs/roles.config";
import {Request, Response, NextFunction} from "express";
import {User} from "../models/User";

export default class AuthMiddleware {
    public static isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).send({message: 'Not authenticated'});
    }

    public static isUser(req, res, next) {
        if(!req.isAuthenticated()) {
            return res.status(401).send({message: 'Not authenticated'});
        }

        if (req.user.role !== roles.USER) {
            return res.status(403).send({message: 'Not authorized'});
        }

        return next();
    }

    public static isTrainerOrAdmin(req, res, next) {
        if(!req.isAuthenticated()) {
            return res.status(401).send({message: 'Not authenticated'});
        }

        if (!(req.user.role === roles.TRAINER || req.user.role === roles.ADMIN)) {
            return res.status(403).send({message: 'Not authorized'});
        }

        return next();
    }

    public static isAdmin(req, res, next) {
        if(!req.isAuthenticated()) {
            return res.status(401).send({message: 'Not authenticated'});
        }

        if (req.user.role !== roles.ADMIN) {
            return res.status(403).send({message: 'Not authorized'});
        }

        return next();
    }

    public static isTrainer(req, res, next) {
        if(!req.isAuthenticated()) {
            return res.status(401).send({message: 'Not authenticated'});
        }

        if (req.user.role !== roles.TRAINER) {
            return res.status(403).send({message: 'Not authorized'});
        }

        return next();
    }
}