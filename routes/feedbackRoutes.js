const express = require('express');
const feedbackController = require('../controllers/feedbackController');

const router = express.Router();

router.route('/').get(feedbackController.getAllForms).post(feedbackController.createForm);
router.route('/:id').get(feedbackController.getForm).patch(feedbackController.updateForm).delete(feedbackController.deleteForm);
router.route('/newFeedack/:id').patch(feedbackController.pushNewFeedback);

module.exports = router;