const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackFormSchema = new Schema({
    heading: String,
    published: Boolean,
    publishedDate: Date,
    lastDate: String,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    views: Number,
    formEntries: [Schema.Types.Mixed],
    userFeedbacks: [Schema.Types.Mixed]
});

const FeedbackForm = mongoose.model("FeedbackForm", feedbackFormSchema);

module.exports = FeedbackForm;