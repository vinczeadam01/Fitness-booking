import express from 'express';
import UserController from "../controllers/user.controller";
const router = express.Router();

const userController = new UserController()

router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUser)

export default router;