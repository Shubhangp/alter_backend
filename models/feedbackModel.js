const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackFormSchema = new mongoose.Schema({
    FeedbackFormLink: String,
    heading: String,
    published: Boolean,
    publishedDate: Date,
    lastDate: Date,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    views: Number,
    formEntries: [
        {
            emoji: Number,
            errorMessage: String,
            label: String,
            options: [String],
            range : Number,
            required: Boolean,
            type: String
        }
    ],
    userFeedbacks: [
        {
            feedbackEntries: [
                {
                    question: String,
                    answer: Schema.Types.Mixed
                }
            ],
            feedbackOn: { type: Date, default: Date.now }
        }
    ]
});

const FeedbackForm = mongoose.model("FeedbackForm", feedbackFormSchema);

module.exports = FeedbackForm;