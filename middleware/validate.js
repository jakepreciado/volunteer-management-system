const validator = require('../helpers/validate');

const volunteers = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        eventId: 'required|integer',
        registrationDate: 'required|date',
        status: 'required|in:active,inactive',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
}

const users = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        role: 'required|in:admin,volunteer default:volunteer',
        passwordHash: 'required|string',
        location: 'required|string',
        phone: 'required|string',
        availability: 'required|array',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
}

const events = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        date: 'required|date',
        location: 'required|string',
        description: 'required|string',
        capacity: 'required|integer',
        organizerID: 'required|regex:/^[a-fA-F0-9]{24}$/',
        tags: 'string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
}

const feedback = (req, res, next) => {
    const validationRule = {
        eventId: 'required|string',
        userId: 'required|string',
        rating: 'required|integer',
        comment: 'required|string',
        date: 'required|date',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
}

module.exports = {
    volunteers,
    users,
    events,
    feedback
};
