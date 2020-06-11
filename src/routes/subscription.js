import express from 'express';
import { authenticate } from '../middlewares/authentication';
import { validateSubscription } from '../middlewares/Validations';
import subscriptionController from '../controllers/Subscription';

const subscriptionHandler = express.Router();

subscriptionHandler.post(
    '/questions',
    authenticate,
    validateSubscription,
    subscriptionController.subscribeToQuestion
);
subscriptionHandler.delete(
    '/questions',
    authenticate,
    validateSubscription,
    subscriptionController.cancelQuestionSubscription
);


export default subscriptionHandler;