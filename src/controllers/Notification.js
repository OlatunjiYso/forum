import { Notification } from '../models';

/**
 * @description a class for Notification methods
 */
class Notification {

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
            const notifications = Notification.find({ user: userId, read: false });
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

    static markAllNotificationsAsRead(req, res) {
        try {
            const userId = req.user.id;
            await Notification.update({ user: userId }, { read: true });
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

export default Notification;