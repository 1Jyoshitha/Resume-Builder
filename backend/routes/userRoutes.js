//Require Statement
const express = require('express')
const {updateUserController,userController, getUserInfo} = require("../controllers/userController")
//Router Object
const router = express.Router();


//Get User Info Route Method:Get
router.get("/get-user/:id",userController);

//Update User Info Route Method:Update
router.put("/update-user/:id",updateUserController)



//Export Statements
module.exports = router;