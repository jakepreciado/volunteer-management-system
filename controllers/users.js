const mongodb = require('../database/connection');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
    //#swagger.tags = ['USERS']
    try {
        const users = await mongodb
            .getDb()
            .db()
            .collection('users')
            .find()
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getUserById = async (req, res) => {
    //#swagger.tags = ['USERS']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to find a user');
    }
    const userId = new ObjectId(req.params.id);
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('users')
            .findOne({ _id: userId });
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createUser = async (req, res) => {
    //#swagger.tags = ['USERS']
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        passwordHash: req.body.passwordHash,
        location: req.body.location,
        phone: req.body.phone,
        availability: req.body.availability,
    }
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('users')
            .insertOne(newUser);
        if (result.acknowledged) {
            res.status(201).send('User created successfully!');
        } else {
            res.status(500).json(result.error || 'Error creating user');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateUser = async (req, res) => {
    //#swagger.tags = ['USERS']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use valid ID to update a user');
    }
    const userId = new ObjectId(req.params.id);
    const updatedUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        passwordHash: req.body.passwordHash,
        location: req.body.location,
        phone: req.body.phone,
        availability: req.body.availability,
    }
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('users')
            .replaceOne({ _id: userId }, updatedUser);
        console.log(result);
        if (result.acknowledged) {
            res.status(200).send('User updated successfully!');
        } else {
            res.status(500).json(result.error || 'Error updating user');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteUser = async (req, res) => {
    //#swagger.tags = ['USERS']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use valid ID to delete a user');
    }
    const userId = new ObjectId(req.params.id);
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('users')
            .deleteOne({ _id: userId });
        console.log(result);
        if (result.deletedCount > 0) {
            res.status(200).send('User successfully deleted!');
        } else {
            res.status(500).json(result.error || 'Error deleting user');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}