import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import "regenerator-runtime/runtime";
import dotenv from 'dotenv';

import userHandler from './routes/users';
import questionHandler from './routes/questions';

dotenv.config();
const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userHandler);
app.use('/questions', questionHandler);


export default app;