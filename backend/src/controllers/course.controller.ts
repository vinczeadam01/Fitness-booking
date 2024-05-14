import {NextFunction, RequestHandler, Request, Response} from 'express';
import {Course} from "../models/Course";

export default class CourseController {
    public getCourse: RequestHandler = (req, res, next) => {
        // the course trainer is id of the trainer
        // join the trainer to get the trainer details
        Course.findById(req.params.id).populate('trainer').populate('appointments.registrations').then(course => {
            res.status(200).send(course);
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public getAllCourses: RequestHandler = (req, res, next) => {
        Course.find().populate('trainer').then(courses => {
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
        Course.findById(req.params.id).then((course: any) => {
            course.addAppointment(req.body.date);
            course.save().then(course => {
                res.status(200).send(course.appointments[course.appointments.length - 1]);
            }).catch(error => {
                res.status(500).send(error);
            });
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public updateAppointment: RequestHandler = (req, res, next) => {
        Course.findById(req.params.courseId).then((course: any) => {
            course.updateAppointment(req.params.id, req.body.date);
            course.save().then(course => {
                const appointment = course.appointments.find((a: any) => a._id == req.params.id);
                res.status(200).send(appointment);
            }).catch(error => {
                res.status(500).send(error);
            });
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public deleteAppointment: RequestHandler = (req, res, next) => {
        Course.findById(req.params.courseId).then((course: any) => {
            course.removeAppointment(req.params.id);
            course.save().then(course => {
                res.status(200).send(course);
            }).catch(error => {
                res.status(500).send(error);
            });
        }).catch(error => {
            res.status(500).send(error);
        });
    }

    public getPopularCourses: RequestHandler = (req, res, next) => {
        Course.aggregate([
            {
                $unwind: "$appointments"
            },
            {
                $lookup: {
                    from: "registrations",
                    localField: "appointments.registrations",
                    foreignField: "_id",
                    as: "registrations"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    category: { $first: "$category" },
                    registrationCount: { $sum: { $size: "$appointments.registrations" } }
                }
            },
            {
                $sort: { registrationCount: -1 }
            },
            {
                $limit: 10
            },
        ]).then(courses => {
            res.status(200).send(courses);
        })
    }

}