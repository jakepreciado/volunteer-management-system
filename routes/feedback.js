const express = require("express");
const router = express.Router();

const feedbackController = require("../controllers/feedback");
const validate = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get("/", feedbackController.getAllFeedback);

router.get("/:id", feedbackController.getFeedbackById);

router.post("/", isAuthenticated, validate.feedback, feedbackController.createFeedback);

router.put("/:id", isAuthenticated, validate.feedback, feedbackController.updateFeedback);

router.delete("/:id", isAuthenticated, feedbackController.deleteFeedback);

module.exports = router;