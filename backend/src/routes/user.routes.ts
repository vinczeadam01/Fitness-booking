import express from 'express';
import UserController from "../controllers/user.controller";
const router = express.Router();

const userController = new UserController()

router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUser)
router.put('/user/:id', userController.updateUser)

router.get('/user/:id/registrations', userController.getUserRegistrations)
router.get('/user/:id/favoriteCourses', userController.getUserFavoriteCourses)

export default router;