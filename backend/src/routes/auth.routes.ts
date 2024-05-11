import express from 'express';
import AuthController from "../controllers/auth.controller";
const router = express.Router();

const authController = new AuthController()

router.post('/auth/login', authController.login);
router.post('/auth/signup', authController.signup)
router.get('/auth/logout', authController.logout);
router.get('/auth/check', authController.check);
router.get('/auth/user', authController.user);

export default router;