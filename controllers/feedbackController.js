const FeedbackForm = require('../models/feedbackModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllForms = async (req, res) => {
    try{
        const features = new APIFeatures(FeedbackForm.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
        const formData = await features.query;

        // send response
        res.status(200).json({
            status: 'success',
            results: formData.length,
            data: {
                formData
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};

exports.getForm = async (req, res) => {
    try{
        const formData = await FeedbackForm.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                formData
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};

exports.createForm = async (req, res) => {
    try{
        const newFormData = await FeedbackForm.create(req.body);
        return res.status(201).json({
            status: 'success',
            data: {
                formData: newFormData
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.deleteForm =async (req, res) => {
    try{
        await FeedbackForm.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};

exports.updateForm = async (req, res) => {
    try {
        const formData = await FeedbackForm.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, runValidators: true 
        })

        if (!formData) {
            return res.status(404).json({
                status: 'fail',
                message: 'Emotion not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            data: {
                formData
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.pushNewFeedback = async (req, res) => {
    try {
        const feedback = { 
            formData: req.body.formData, 
            feedbackDate: Date.now() 
        };

        const formData = await FeedbackForm.findByIdAndUpdate(
            req.params.id, 
            { $push: { userFeedbacks: feedback } },
            { new: true, runValidators: true }
        );

        if (!formData) {
            return res.status(404).json({
                status: 'fail',
                message: 'Form not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            data: {
                formData
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};