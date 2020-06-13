import { Vote, Question } from '../models';

/**
 * @description class to house all votes methods
 */
class VotesController {

    /**
     * @description a method to make a vote
     * @param {object} req request object
     * @param {object} res response object
     */
    static async vote(req, res) {
        try {
            const { type, questionId } = req.body;
            const userId = req.user.id;
            let question = await Question.findOne({ _id: questionId });
            if(!question) return res.status(404).json({success: false, msg: 'found no question with specified id'});
            const votesCount = question.votes;
            const previousVote = await Vote.findOne({ question: questionId, voter: userId });
            if (previousVote) {
                if (previousVote.type === type) {
                    return res.status(403)
                        .json({ success: false, msg: `You have already ${type}d this question`, question})
                };
                await previousVote.updateOne({ type });
                previousVote.save();
                const voteValue = (type === 'upvote') ? 2 : -2;
                question.votes = votesCount + voteValue;
                question.save();
                return res.status(200)
                    .json({ success: true, msg: 'your vote has been updated', question })
            }
            await Vote.create({ question: questionId, voter: userId, type });
            const voteValue = (type === 'upvote') ? 1 : -1;
            question.votes = votesCount + voteValue;
            question.save();
            return res.status(200)
                .json({ success: true, msg: 'your vote has been added', question })
        } catch (err) {
            return res.status(500)
                .json({
                    success: false,
                    msg: 'an internal server error occured while voting',
                    errMessage: err.message
                })
        }
    }
}


export default VotesController;