var express = require('express');
var router = express.Router();
const studentController = require('../controllers/user.controller');
/* GET home page. */
router.post('/register',studentController.createUser )
 router.post('/login', studentController.loginUser);

module.exports = router;