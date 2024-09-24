//Require Statement
const express = require('express')
const {registerController,loginController} = require('../controllers/authController')

//Router Object
const router = express.Router();


//Register Route Method:POST
router.post('/register',registerController);


//Log IN Route Method:POST
router.post('/login',loginController)


//Export Statement
module.exports = router;