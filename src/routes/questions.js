import express from 'express';

import { validateQuestion, validateAnswer, validateVote } from '../middlewares/Validations';
import { authenticate } from '../middlewares/authentication';
import questionController from '../controllers/Question';
import voteController from '../controllers/Votes';

const questionHandler = express.Router();

questionHandler.post(
    '/',
    authenticate,
    validateQuestion,
    questionController.askQuestion
);

questionHandler.post(
    '/answers',
    authenticate,
    validateAnswer,
    questionController.answerQuestion
);

questionHandler.post(
    '/votes',
    authenticate,
    validateVote,
    voteController.vote
);

questionHandler.get('/', questionController.viewQuestions);
questionHandler.get('/search/questions', questionController.searchQuestion);
questionHandler.get('/search/answers', questionController.searchAnswers);


export default questionHandler;




