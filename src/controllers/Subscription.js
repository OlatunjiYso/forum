import { Subscription } from '../models';

/**
 * @description a class for all subscription methods
 */
class SubscriptionController {
    /**
     * @description subcribes a user to a question. 
     * @param {Object} req request object
     * @param {Object} res response object
     */
    static async subscribeToQuestion(req, res) {
        try {
        const userId = req.user.id;
        const questionId = req.body.questionId;
        const previousSubscription = await Subscription.findOne({ subscriber: userId, question: questionId });
        if( previousSubscription) {
            return res.status(200)
            .json({
                success: true,
                msg: 'you are already subcribed to this question'
            })
        }
        await Subscription.create({  subscriber: userId, question: questionId });
        return res.status(201)
        .json({
            success: true,
            msg: 'you have successfully subcribed to this question'
        })
        } catch(err) {
            return res.status(500)
            .json({
                success: false,
                msg: 'an internal server error occured while creating subscription',
                errMessage: err.message
            })
        }
    }


    /**
     * @description 
     * @param {Object} req request object
     * @param {Object} res response object 
     */
    static async cancelQuestionSubscription(req, res) {
        try {
        const userId = req.user.id;
        const questionId = req.params.questionId;
        const previousSubscription = await Subscription.findOne({ subscriber: userId, question: questionId });
        if( !previousSubscription) {
            return res.status(404)
            .json({
                success: false,
                msg: 'you have not subscribed to this question'
            })
        }
        await Subscription.deleteOne ({ subscriber: userId, question: questionId });
        return res.status(200)
        .json({
            success: true,
            msg: 'you have successfully unsubcribed to this question'
        })
        } catch(err) {
            return res.status(500)
            .json({
                success: false,
                msg: 'an internal server error occured while cancelling subscription',
                errMessage: err.message
            })
        }
    }
}


export default SubscriptionController;