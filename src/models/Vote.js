import mongoose, { Schema } from 'mongoose';

const voteSchema = new Schema({
    type: {
        type: String,
        required: true,
        trim: true
    },
    voter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }
});

const Vote = mongoose.model('Vote', voteSchema);

export default Vote;