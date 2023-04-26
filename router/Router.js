const express = require('express');
const controller = require('../controller/Controller')

const router = express.Router();

router.post('/adduser', controller.addUser);
router.post('/updateuser/:id', controller.updateUser);
router.get('/fetchalluser', controller.fetchAllUsers);
router.get('/fetchsingleuser/:id', controller.fetchSingleUser);
router.get('/deleteuser/:id', controller.deleteUser);

module.exports = router;