const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");
const validate = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.post("/", isAuthenticated, validate.users, userController.createUser);

router.put("/:id", isAuthenticated, validate.users, userController.updateUser);

router.delete("/:id", isAuthenticated, userController.deleteUser);

module.exports = router;