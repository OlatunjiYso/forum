import express from 'express';
import { authenticate } from '../middlewares/authentication';
import notificationController from '../controllers/Notification';

const notificationHandler = express.Router();

notificationHandler.get(
    '/',
    authenticate,
     notificationController.fetchUnreadNofitications
     );

notificationHandler.patch(
    '/',
    authenticate,
     notificationController.markAllNotificationsAsRead
     );

     export default notificationHandler;