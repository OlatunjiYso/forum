import validator from 'validator';
import mongoose from 'mongoose';
/**
 * @description - checks if email is valid or not.
 */
const validateEmail = (errors, email) => {
    if (!email) {
        errors.push("email is required");
    }
    if (email && !validator.isEmail(email)) {
        errors.push("email is invalid");
    }
};

/**
 * @description - checks if password is valid or not
 */
const validatePassword = (errors, password) => {
    if (!password) {
        errors.push("Password is required");
    }
    if (password && password.length < 6) {
        errors.push("Password must be a minimum of 6 characters");
    }
};

/**
 * 
 * @param {String} string string to be checked
 */
const validString = (string) => {
    let valid = true;
    if (!string || typeof string == null) valid = false;
    if (string && validator.isEmpty(string, { ignore_whitespace: true })) valid = false;
    return valid;
};

/**
* @description - validates user login.
*/
export const validateLogin = (req, res, next) => {
    let { email, password } = req.body;
    let errors = [];
    validateEmail(errors, email);
    if (!password) errors.push('password is required');
    if (errors.length > 0) {
        return res.status(400)
            .json({
                success: false,
                errors
            })
    }
    next();
};

/**
 * @description - validates user signup.
 */
export const validateSignup = (req, res, next) => {
    let { email, password, name } = req.body;
    let errors = [];
    validateEmail(errors, email);
    validatePassword(errors, password);
    if (!validString(name)) errors.push('Invalid name');
    if (errors.length > 0) {
        return res.status(400)
            .json({
                success: false,
                errors
            })
    }
    next();
};

/**
* @description - validates vote.
*/
export const validateVote = (req, res, next) => {
    let { type, questionId } = req.body;
    let errors = [];
    const types = ['upvote', 'downvote']
    if ( !type || !types.includes(type)) errors.push('invalid type');
    if (!questionId) errors.push('questionId cannot be empty');
    if (!validId()) errors.push('invalid questionId')
    if (errors.length > 0) {
        return res.status(400)
            .json({
                success: false,
                errors
            })
    }
    next();
};

/**
* @description - validates Question.
*/
export const validateQuestion = (req, res, next) => {
    let { title, body } = req.body;
    let errors = [];
    if ( !title ) errors.push('title cannot be empty');
    if (!body) errors.push('body cannot be empty');
    if (errors.length > 0) {
        return res.status(400)
            .json({
                success: false,
                errors
            })
    }
    next();
};


/**
* @description - validates answers.
*/
export const validateAnswer = (req, res, next) => {
    let { body, questionId } = req.body;
    let errors = [];
    if (!body) errors.push('body cannot be empty');
    if (!questionId) errors.push('questionId cannot be empty');
    if (!validId()) errors.push('invalid questionId')
    if (errors.length > 0) {
        return res.status(400)
            .json({
                success: false,
                errors
            })
    }
    next();
};

/**
* @description - validates subscription.
*/
export const validateSubscription = (req, res, next) => {
    let { questionId } = req.body;
    let errors = [];
    if (!questionId) errors.push('questionId cannot be empty');
    if (!validId()) errors.push('invalid questionId')
    if (errors.length > 0) {
        return res.status(400)
            .json({
                success: false,
                errors
            })
    }
    next();
};


/**
* @description - validates question fetch.
*/
export const validateQuestionFetch = (req, res, next) => {
    let { questionId } = req.params;
    let errors = [];
    if (!validId(questionId)) errors.push('invalid questionId');
    if (errors.length > 0) {
        return res.status(400)
            .json({
                success: false,
                errors
            })
    }
    next();
};


/**
 * 
 * @param {string} id  id to be checked
 */
const validId = (id) => mongoose.Types.ObjectId.isValid(id);