const mongodb = require('../database/connection');
const ObjectId = require('mongodb').ObjectId;

const getAllVolunteers = async (req, res) => {
    //#swagger.tags = ['VOLUNTEERS']
    try {
        const volunteers = await mongodb
            .getDb()
            .db()
            .collection('volunteers')
            .find()
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(volunteers);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getVolunteerById = async (req, res) => {
    //#swagger.tags = ['VOLUNTEERS']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to find a volunteer');
    }
    const volunteerId = new ObjectId(req.params.id);
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('volunteers')
            .findOne({ _id: volunteerId });
        if (!result) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createVolunteer = async (req, res) => {
    //#swagger.tags = ['VOLUNTEERS']
    const newVolunteer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        eventId: req.body.eventId,
        registrationDate: req.body.registrationDate,
        status: req.body.status,
    }
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('volunteers')
            .insertOne(newVolunteer);
        if (result.acknowledged) {
            res.status(201).send('Volunteer created successfully!');
        } else {
            res.status(500).json(result.error || 'Error creating volunteer');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateVolunteer = async (req, res) => {
    //#swagger.tags = ['VOLUNTEERS']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use valid ID to update a volunteer');
    }
    const volunteerId = new ObjectId(req.params.id);
    const updatedVolunteer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        eventId: req.body.eventId,
        registrationDate: req.body.registrationDate,
        status: req.body.status,
    }
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('volunteers')
            .replaceOne({ _id: volunteerId }, updatedVolunteer);
        console.log(result);
        if (result.acknowledged) {
            res.status(200).send('Volunteer updated successfully!');
        } else {
            res.status(500).json(result.error || 'Error updating volunteer');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteVolunteer = async (req, res) => {
    //#swagger.tags = ['VOLUNTEERS']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use valid ID to delete a volunteer');
    }
    const volunteerId = new ObjectId(req.params.id);
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('volunteers')
            .deleteOne({ _id: volunteerId });
        console.log(result);
        if (result.deletedCount > 0) {
            res.status(200).send('Volunteer successfully deleted!');
        } else {
            res.status(500).json(result.error || 'Error deleting volunteer');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllVolunteers,
    getVolunteerById,
    createVolunteer,
    updateVolunteer,
    deleteVolunteer
}