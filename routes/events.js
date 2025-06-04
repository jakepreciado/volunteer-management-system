const express = require("express");
const router = express.Router();

const eventsController = require("../controllers/events");
const validate = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get("/", eventsController.getAllEvents);

router.get("/:id", eventsController.getEventById);

router.post("/", isAuthenticated, validate.events, eventsController.createEvent);

router.put("/:id", isAuthenticated, validate.events, eventsController.updateEvent);

router.delete("/:id", isAuthenticated, eventsController.deleteEvent);

module.exports = router;