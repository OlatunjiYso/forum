import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

// Answer
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



// Question Model
const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    answers: [ answerSchema ],
    votes: {
        type: Number,
        default: 0
    }
},
{
    timestamps: {  createdAt: 'created_at', updatedAt: 'updated_at' }
});

questionSchema.methods.createAnswer = function(body, authorId) {
    this.answers.push({ body, author: authorId })
    return this.save();
}
questionSchema.plugin(mongoosePaginate);


const Question = mongoose.model('Question', questionSchema);

export default Question;