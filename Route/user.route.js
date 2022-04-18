const express = require('express');
const router = express.Router();
const controller = require('../Controller/user.controller');

router.post("/getUser",controller.getdata);
router.post("/addUser",controller.addUser);
router.post("/getUserById",controller.getUserByID);
router.post("/updateUserById",controller.updateUserByID);
module.exports = router;