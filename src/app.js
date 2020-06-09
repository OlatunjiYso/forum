import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import "regenerator-runtime/runtime";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



export default app;