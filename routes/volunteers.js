const express = require('express');
const router = express.Router();

const volunteersController = require('../controllers/volunteers');
const validate = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');


router.get('/', volunteersController.getAllVolunteers);

router.get('/:id', volunteersController.getVolunteerById);

router.post('/', isAuthenticated, validate.volunteers, volunteersController.createVolunteer);

router.put('/:id', isAuthenticated, validate.volunteers, volunteersController.updateVolunteer);

router.delete('/:id', isAuthenticated, volunteersController.deleteVolunteer);

module.exports = router;