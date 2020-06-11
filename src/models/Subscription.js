import mongoose, { Schema } from 'mongoose';

const subscriptionSchema = new Schema({
    subscriber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }
});


const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;