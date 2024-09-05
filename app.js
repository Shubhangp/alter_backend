const express = require('express');
const morgan = require('morgan');
const feedbackRouter = require('./routes/feedbackRoutes');

const app = express();
var cors = require('cors');
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use((req, res, next) => {
    console.log('Hello from the Shubhang Pandey 👋');
    next();
});
app.use('/api/v1/feedback-form', feedbackRouter);

module.exports = app;