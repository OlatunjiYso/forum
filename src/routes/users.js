import express from 'express';

import { validateLogin, validateSignup } from '../middlewares/Validations';
import userController from '../controllers/Users';

const userHandler = express.Router();

userHandler.post('/signup', validateSignup, userController.signup);
userHandler.post('/login', validateLogin, userController.login);


export default userHandler;