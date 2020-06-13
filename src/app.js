import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import "regenerator-runtime/runtime";
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import userHandler from './routes/users';
import questionHandler from './routes/questions';
import searchHandler from './routes/search';
import subscriptionHandler from './routes/subscription';
import notificationHandler from './routes/notification';
import { swaggerDocument }from './swagger.js';

dotenv.config();
const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/forum/apis/v1/users', userHandler);
app.use('/forum/apis/v1/questions', questionHandler);
app.use('/forum/apis/v1/search', searchHandler);
app.use('/forum/apis/v1/subscriptions', subscriptionHandler);
app.use('/forum/apis/v1/notifications', notificationHandler);
app.use('/forum/apis/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('*', (req,res)=>res.status(404).json({msg:'route not defined'}));


export default app;