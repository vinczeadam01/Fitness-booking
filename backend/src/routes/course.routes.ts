import express from 'express';
import CourseController from "../controllers/course.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

const courseController = new CourseController()

/* COURSE CRUD */
router.get('/course', courseController.getAllCourses);  // GET /course Get all courses
router.get('/course/:id', courseController.getCourse);  // GET /course/:id Get a course
router.post('/course', AuthMiddleware.isTrainerOrAdmin, courseController.createCourse); // POST /course Create a course
router.put('/course/:id', AuthMiddleware.isTrainerOrAdmin, courseController.updateCourse);  // PUT /course/:id Update a course
router.delete('/course/:id', AuthMiddleware.isTrainerOrAdmin, courseController.deleteCourse);   // DELETE /course/:id Delete a course

/* APPOINTMENTS */
router.post('/course/:id/appointment', AuthMiddleware.isTrainerOrAdmin, courseController.addAppointment);


export default router;