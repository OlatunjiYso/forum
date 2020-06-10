import mongoose, { Schema } from 'mongoose';

const answerSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: {  createdAt: 'created_at', updatedAt: 'updated_at' }
});

const commentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: {  createdAt: 'created_at', updatedAt: 'updated_at' }
});


const questionSchema = new Schema({
    body: {
        type: String,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    answers: [ answerSchema ],
    comments: [ commentSchema ]
},
{
    timestamps: {  createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Question = mongoose.model('Question', questionSchema);

export default Question;