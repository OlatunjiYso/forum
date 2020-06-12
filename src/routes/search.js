import express from 'express';
import questionController from '../controllers/Question';
import userController from '../controllers/Users';

const searchHandler = express.Router();

searchHandler.get('/questions/', questionController.searchQuestion);
searchHandler.get('/answers/', questionController.searchAnswers);
searchHandler.get('/users/', userController.searchUser);


export default searchHandler;




