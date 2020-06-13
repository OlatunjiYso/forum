import { Question } from "../models";
import Notifier from '../helpers/Notifier';


/**
 * @description class for all question methods.
 */
class QuestionController {

    /**
     * @description a method to post question
     */
    static async askQuestion(req, res) {
        try {
            const { title, body } = req.body;
            const authorId = req.user.id;
            const question = await Question.create({ title, body, author: authorId });
            return res.status(201)
                .json({
                    success: true,
                    msg: 'question successfully created',
                    question
                })

        } catch (err) {
            return res.status(500)
                .json({
                    success: false,
                    msg: 'an internal server error occured while creating question',
                    errMessage: err.message
                })
        }
    }

    /**
     * @description - a method to post answers
     * @param {Object} req request object 
     * @param {Object} res response object
     */
    static async answerQuestion(req, res) {
        try {
            let { body, questionId } = req.body;
            let authorId = req.user.id;
            let question = await Question.findOne({ _id: questionId });
            if(!question) {return res.status(404).json({success: false, msg: 'no question found for specified id'})}
            const updatedDocument = await question.createAnswer(body, authorId);
            await Notifier.notifyQuestionSubscribers(question._id, question.title)
            return res.status(201).json({
                success: true,
                msg: 'question successfully created',
                question: updatedDocument
            })
        } catch (err) {
            return res.status(500)
                .json({
                    success: false,
                    msg: 'an internal server error occured while posting answer',
                    errMessage: err.message
                })
        }
    }

     /**
     * @description - a method to view a single question
     * @param {Object} req request object 
     * @param {Object} res response object
     */
    static async fetchOneQuestion(req, res) {
        const { questionId } = req.params;
        try {
            const question = await Question.findOne({ _id: questionId })
            .populate('author', '-_id -password -created_at -updated_at -__v')
            .populate('answers.author', '-_id -password -created_at -updated_at -__v')
            .select('title body author answers votes');
            if (!question) {
                return res.status(404)
                .json({
                    success: false,
                    msg: 'found no question with specified id'
                })
            }
            return res.status(200)
                .json({
                    success: true,
                    msg: 'question found',
                    question
                })
        } catch (err) {
            return res.status(500)
                .json({
                    success: false,
                    msg: 'an internal server error occured while fetching question',
                    errMessage: err.message
                })
        }
    }


    /**
     * @description - a method to view questions
     * @param {Object} req request object 
     * @param {Object} res response object
     */
    static async fetchQuestions(req, res) {
        try {
            let { limit = 20, page = 1 } = req.query;
            limit = parseInt(limit);
            page = parseInt(page);
            const questions = await Question.find()
            .populate('author', '-_id -password -created_at -updated_at -__v')
            .populate('answers.author', '-_id -password -created_at -updated_at -__v')
            .select('title body author answers votes')
            .skip((page - 1)*limit)
            .limit(limit)
            if(questions.length === 0) {
                return res.status(404).json({ success: true, msg:'no questions yet'})
            }
            return res.status(200)
                .json({
                    success: true,
                    msg: 'questions found',
                    questions
                })
        } catch (err) {
            return res.status(500)
                .json({
                    success: false,
                    msg: 'an internal server error occured while fetching questions',
                    errMessage: err.message
                })
        }
    }

    /**
     * @description searches for questions
     * @param {object} req request object
     * @param {object} res response object 
     */
    static async searchQuestion(req, res) {
        try {
        const keyword = req.query.keyword || '';
        const searchRegex = new RegExp(keyword, 'i')
        let questions = await Question.find({ body: searchRegex});
        if (questions.length === 0) {
            return res.status(404)
            .json({
                success: false,
                msg: 'no questions found for specified keyword'
            })
        }
        return res.status(200)
        .json({
            success: true,
            msg: 'questions found for specified keyword',
            questions
        })
        } catch(err) {
            return res.status(500)
            .json({
                success: false,
                msg: 'an internal server error occured while searching questions',
                errMessage: err.message 
             })
        }
    }


    static async searchAnswers(req, res) {
        try {
            const  keyword = req.query.keyword || '';
            const searchRegex = new RegExp (keyword, 'i')
            let answers = await Question.aggregate([
                { $match: {"answers.body": searchRegex} },
                { $unwind: '$answers' },
                { $project: {
                    questionId: '$_id',
                    questionTitle: '$title',
                    questionBody: '$body',
                    answer: '$answers'
                } }
            ]);
            if (answers.length === 0) {
                return res.status(404)
                .json({
                    success: false,
                    msg: 'no answers found for specified keyword'
                })
            }
            return res.status(200)
            .json({
                success: true,
                msg: 'answers found for specified keyword',
                answers
            })
        } catch(err) {
            return res.status(500)
            .json({
                success: false,
                msg: 'an internal server error occured while searching questions',
                errMessage: err.message 
             })
        }
    }
}

export default QuestionController;