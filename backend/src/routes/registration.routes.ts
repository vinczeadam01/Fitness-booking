import express from 'express';
import RegistrationController from "../controllers/registration.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
const router = express.Router();

const registrationController = new RegistrationController()

router.post('/registration', AuthMiddleware.isAuthenticated, registrationController.createRegistration);
router.delete('/registration/:id', AuthMiddleware.isAuthenticated, registrationController.deleteRegistration);
router.post('/registration/cancel', AuthMiddleware.isAuthenticated, registrationController.cancelRegistration);

export default router;