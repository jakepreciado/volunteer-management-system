const mongodb = require('../database/connection');
const ObjectId = require('mongodb').ObjectId;

const getAllEvents = async (req, res) => {
    //#swagger.tags = ['EVENTS']
    try {
        const events = await mongodb
            .getDb()
            .db()
            .collection('events')
            .find()
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(events);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getEventById = async (req, res) => {
    //#swagger.tags = ['EVENTS']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to find an event');
    }
    const eventId = new ObjectId(req.params.id);
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('events')
            .findOne({ _id: eventId });
        if (!result) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createEvent = async (req, res) => {
    //#swagger.tags = ['EVENTS']
    const newEvent = {
        title: req.body.title,
        date: req.body.date,
        location: req.body.location,
        description: req.body.description,
        capacity: req.body.capacity,
        organizerID: req.body.organizerID,
        tags: req.body.tags,
    }
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('events')
            .insertOne(newEvent);
        if (result.acknowledged) {
            res.status(201).send('Event created successfully!');
        } else {
            res.status(500).json(result.error || 'Error creating event');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateEvent = async (req, res) => {
    //#swagger.tags = ['EVENTS']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use valid ID to update an event');
    }
    const eventId = new ObjectId(req.params.id);
    const updatedEvent = {
        title: req.body.title,
        date: req.body.date,
        location: req.body.location,
        description: req.body.description,
        capacity: req.body.capacity,
        organizerID: req.body.organizerID,
        tags: req.body.tags,
    }
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('events')
            .replaceOne({ _id: eventId }, updatedEvent);
        console.log(result);
        if (result.acknowledged) {
            res.status(200).send('Event updated successfully!');
        } else {
            res.status(500).json(result.error || 'Error updating event');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteEvent = async (req, res) => {
    //#swagger.tags = ['EVENTS']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use valid ID to delete an event');
    }
    const eventId = new ObjectId(req.params.id);
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('events')
            .deleteOne({ _id: eventId });
        console.log(result);
        if (result.deletedCount > 0) {
            res.status(200).send('Event successfully deleted!');
        } else {
            res.status(500).json(result.error || 'Error deleting event');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}