import express from 'express';
import TrainerController from "../controllers/trainer.controller";
import multipartMiddleware from "../middlewares/multipart.middleware";
const router = express.Router();

const trainerController = new TrainerController()

router.get('/trainer', trainerController.getAllTrainers);
router.get('/trainer/:id', trainerController.getTrainer);
router.post('/trainer', trainerController.createTrainer);
router.put('/trainer/:id', trainerController.updateTrainer);
router.delete('/trainer/:id', trainerController.deleteTrainer);
router.get('/trainer/:id/courses', trainerController.getTrainerCourses);
router.post('/trainer/:id/upload', multipartMiddleware, trainerController.uploadImage);


export default router;