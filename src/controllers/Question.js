import { Question } from "../models";


/**
 * @description 
 */
class QuestionController {

    /**
     * @description a method to post question
     */
    static async askQuestion(req, res) {
        try {
            const { title, body } = req.body;
            const authorId = 1 || req.user.id;
            const question = await Question.create({ title, body, authorId });
            return res.status(201)
                .json({
                    msg: 'question successfully created',
                    question
                })

        } catch (err) {
            return res.status(500)
                .json({
                    msg: 'an internal server error occured while creating question',
                    errMessage: err.message
                })
        }
    }

    /**
     * @description - a method topost answers
     * @param {object} req requset object 
     * @param {object} res response object
     */
    static async answerQuestion(req, res) {
        try {
            let { body, questionId } = req.body;
            let authorId = '5ee0c927ea43641981f842dc' || req.user.id;
            let question = await Question.findOne({ _id: questionId });
            const updatedDocument = await question.createAnswer(body, authorId);
            return res.status(201).json({
                msg: 'question successfully created',
                updatedDocument
            })
        } catch (err) {
            return res.status(500)
                .json({
                    msg: 'an internal server error occured while posting answer',
                    errMessage: err.message
                })
        }
    }

    /**
     * @description - a method topost answers
     * @param {object} req requset object 
     * @param {object} res response object
     */
    static async viewQuestions(req, res) {
        try {
            const { limit = 20, page = 1 } = req.query;
            limit = parseInt(limit);
            page = parseInt(page);
            const questions = await Question.find()
            .populate('author')
            .select('title body author answers')
            .skip((page - 1)*limit)
            .limit(limit)
            return res.status(200)
                .json({
                    msg: 'questions found',
                    questions
                })
        } catch (err) {
            return res.status(500)
                .json({
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
        const { keyword } = req.query || '';
        const searchRegex = new RegExp(keyword, 'i')
        let questions = await Question.find({ body: searchRegex});
        return res.status(200)
        .json({
            msg: `Question search results for ${keyword}`,
            questions
        })
        } catch(err) {
            return res.status(500)
            .json({
                msg: 'an internal server error occured while searching questions',
                errMessage: err.message 
             })
        }
    }


    static async searchAnswers(req, res) {
        try {
            const { keyword } = req.query || '';
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
            return res.status(200)
            .json({
                msg:`Answees search result for ${keyword}`,
                answers
            })
        } catch(err) {
            return res.status(500)
            .json({
                msg: 'an internal server error occured while searching questions',
                errMessage: err.message 
             })
        }
    }
}

export default QuestionController;