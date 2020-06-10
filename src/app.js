import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import "regenerator-runtime/runtime";
import dotenv from 'dotenv';

import userController from './controllers/Users';
import questionController from './controllers/Question';

dotenv.config();
const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.get('/users/search', userController.searchUser);
app.post('/question', questionController.askQuestion);
app.post('/answer', questionController.answerQuestion);
app.get('/answer/search', questionController.searchAnswers);
app.get('/questions', questionController.viewQuestions);
app.get('/questions/search', questionController.searchQuestion);


export default app;