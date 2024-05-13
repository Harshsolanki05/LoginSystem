var express = require('express');
var router = express.Router();

const user = require('../controller/Usercontroller')

// ---- User Register ---- //
router.post('/insert',user.insert)

// ---- User Data View ---- //
router.get('/data',user.getdata)

// ---- User Login ---- //
router.post('/login',user.login)

// ---- User Logout ---- //
router.get('/logout',user.logout)


module.exports = router;
