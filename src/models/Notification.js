import mongoose, { Schema } from 'mongoose';

const notificationSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }

});


const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;