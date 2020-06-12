import { Subscription } from '../models';
import Notification from '../controllers/Notification';

class Notifier {
/**
 * @description a method to notify all subscribers to a question
 * @param {string} questionId id of the question subscribed to
 * @param {string} questionTitle  title of the question
 */
    static async notifyQuestionSubscribers(questionId, questionTitle ) {
        try {
        const subscribersRecord = await Subscription.find({ question: questionId })
        .select('subscriber');
        if (subscribersRecord.length === 0) return ;
        let subscribers = [];
        subscribersRecord.map((record)=> subscribers.push(record.subscriber));
        const title = questionTitle;
        let body = `A new answer has been given to question: ${title}`;
        Notification.createBulkNotifications(title, body, subscribers);
        } catch(err) {
            throw err;
        }
    }
}

export default Notifier;