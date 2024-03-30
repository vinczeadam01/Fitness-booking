import {NextFunction, RequestHandler, Request, Response} from 'express';
import {Course} from "../models/Course";

export default class CourseController {
    public getCourse: RequestHandler = (req, res, next) => {
        Course.findById(req.params.id).then(course => {
            res.status(200).send(course);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public getAllCourses: RequestHandler = (req, res, next) => {
        Course.find().then(courses => {
            res.status(200).send(courses);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public createCourse: RequestHandler = (req, res, next) => {
        const course = new Course(req.body);
        course.save().then(course => {
            res.status(201).send(course);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public updateCourse: RequestHandler = (req, res, next) => {
        Course.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(course => {
            res.status(200).send(course);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public deleteCourse: RequestHandler = (req, res, next) => {
        Course.findByIdAndDelete(req.params.id).then(course => {
            res.status(200).send(course);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public addAppointment: RequestHandler = (req, res, next) => {
        Course.findById(req.params.id).then((course: Course) => {
            course.addAppointment(req.body.date);
            course.save().then(course => {
                res.status(200).send(course);
            }).catch(error => {
                res.status(500).send(error);
            });
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public addUserToAppointment: RequestHandler = (req, res, next) => {
        Course.findById(req.params.id).then((course: Course) => {
            course.addUserToAppointment(req.params.appointmentId, req.body.user);
            course.save().then(course => {
                res.status(200).send(course);
            }).catch(error => {
                res.status(500).send(error);
            });
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public listAppointments: RequestHandler = (req, res, next) => {
        Course.findById(req.params.id).then((course: Course) => {
            res.status(200).send(course.listAppointments());
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public listUsersForAppointment: RequestHandler = (req, res, next) => {
        Course.findById(req.params.id).then((course: Course) => {
            res.status(200).send(course.listUsersForAppointment(req.params.appointmentId));
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public updateAppointment: RequestHandler = (req, res, next) => {
        Course.findById(req.params.id).then((course: Course) => {
            course.updateAppointment(req.params.appointmentId, req.body.date);
            course.save().then(course => {
                res.status(200).send(course);
            }).catch(error => {
                res.status(500).send(error);
            });
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public removeUserFromAppointment: RequestHandler = (req, res, next) => {
        Course.findById(req.params.id).then((course: Course) => {
            course.removeUserFromAppointment(req.params.appointmentId, req.params.userId);
            course.save().then(course => {
                res.status(200).send(course);
            }).catch(error => {
                res.status(500).send(error);
            });
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public removeAppointment: RequestHandler = (req, res, next) => {
        Course.findById(req.params.id).then((course: Course) => {
            course.removeAppointment(req.params.appointmentId);
            course.save().then(course => {
                res.status(200).send(course);
            }).catch(error => {
                res.status(500).send(error);
            });
        }).catch(error => {
            res.status(500).send(error);
        });
    }

}