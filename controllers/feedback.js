const mongodb = require('../database/connection');
const ObjectId = require('mongodb').ObjectId;

const getAllFeedback = async (req, res) => {
    //#swagger.tags = ['FEEDBACK']
    try {
        const feedback = await mongodb
            .getDb()
            .db()
            .collection('feedback')
            .find()
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(feedback);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getFeedbackById = async (req, res) => {
    //#swagger.tags = ['FEEDBACK']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to find feedback');
    }
    const feedbackId = new ObjectId(req.params.id);
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('feedback')
            .findOne({ _id: feedbackId });
        if (!result) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createFeedback = async (req, res) => {
    //#swagger.tags = ['FEEDBACK']
    const newFeedback = {
        eventId: req.body.eventId,
        userId: req.body.userId,
        rating: req.body.rating,
        comment: req.body.comment,
        date: req.body.date,
    }
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('feedback')
            .insertOne(newFeedback);
        if (result.acknowledged) {
            res.status(201).send('Feedback created successfully!');
        } else {
            res.status(500).json(result.error || 'Error creating feedback');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateFeedback = async (req, res) => {
    //#swagger.tags = ['FEEDBACK']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use valid ID to update feedback');
    }
    const feedbackId = new ObjectId(req.params.id);
    const updatedFeedback = {
        userId: req.body.userId,
        eventId: req.body.eventId,
        rating: req.body.rating,
        comment: req.body.comment,
        date: req.body.date,
    }
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('feedback')
            .replaceOne({ _id: feedbackId }, updatedFeedback);
        console.log(result);
        if (result.acknowledged) {
            res.status(200).send('Feedback updated successfully!');
        } else {
            res.status(500).json(result.error || 'Error updating feedback');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteFeedback = async (req, res) => {
    //#swagger.tags = ['FEEDBACK']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use valid ID to delete feedback');
    }
    const feedbackId = new ObjectId(req.params.id);
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('feedback')
            .deleteOne({ _id: feedbackId });
        console.log(result);
        if (result.deletedCount > 0) {
            res.status(200).send('Feedback successfully deleted!');
        } else {
            res.status(500).json(result.error || 'Error deleting feedback');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllFeedback,
    getFeedbackById,
    createFeedback,
    updateFeedback,
    deleteFeedback
}