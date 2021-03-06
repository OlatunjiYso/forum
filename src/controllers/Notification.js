import { Notification } from '../models';

/**
 * @description a class for Notification methods
 */
class NotificationController {

    /**
     * @description a method to create notifications for many users
     * @param {String} title notification title 
     * @param {String} body notification body
     * @param {Array} users array of user ids who are to receive the notifications
     */
    static async createBulkNotifications(title, body, users) {
        try {
        let notifications = [];
        users.map((user) => notifications.push({ user, title, body }));
        await Notification.create(notifications)
        } catch(err) {
            throw err;
        }
    }

    /**
     * @description a method to fetch unread notifications
     * @param {Object} req request object
     * @param {Object} res response object
     */
    static async fetchUnreadNofitications(req, res) {
        try {
            const userId = req.user.id;
            const notifications = await Notification.find({ user: userId, read: false });
            if (notifications.length === 0) {
                return res.status(404).json({ success: false, msg: 'found no unread notifications'})
            } 
            return res.status(200)
                .json({
                    success: true,
                    msg: 'unread notifications',
                    notifications
                })
        } catch (err) {
            return res.status(500)
                .json({
                    msg: 'an internal server error occured while fetching unread notifications',
                    errMessage: err.message
                })
        }
    }

       /**
     * @description a method to mark notifications as read
     * @param {Object} req request object
     * @param {Object} res response object
     */
    static async markAllNotificationsAsRead(req, res) {
        try {
            const userId = req.user.id;
            await Notification.updateMany({ user: userId }, { read: true });
            return res.status(200)
            .json({
                success: true,
                msg: 'all notifications are marked read'
            })
        } catch (err) {
            return res.status(500)
                .json({
                    msg: 'an internal server error occured while marking notifications as read',
                    errMessage: err.message
                })
        }
    }
}

export default NotificationController;