//Require Statements
const userModel = require('../database/models/userModel');
const { hashPassword, comparePassword } = require('../helpers/authHelper');
const JWT = require('jsonwebtoken');

//User Registration Function
const registerController = async (req, res) => {
  try {
    //Requesting Field Values From Client Side
    const { name, email, password, contact } = req.body;

    //Checking Existing User
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(200).send({ success: false, message: "Already Registered, Please Login" });
    }

    //Passing User's Password To Bcrypt For Hashing Password
    const hashedPassword = await hashPassword(password);

    //Registering New User To Database
    const user = await new userModel({ name, email, password: hashedPassword, contact }).save();
    
    //Return success response
    return res.status(201).send({ success: true, message: 'User Registered Successfully', user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "Error In Registration", error });
  }
};

//User LogIn Function
const loginController = async (req, res) => {
  try {
    //Requesting Field Values From Client Side
    const { email, password } = req.body;

    //Finding Existing User From Database
    const user = await userModel.findOne({ email });

    //If User Not Found In Database
    if (!user) {
      return res.status(404).send({ success: false, message: "User Not Found, Please Sign Up First" });
    }

    //Comparing Entered Password To Previously Hashed User Password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({ success: false, message: "Invalid Password" });
    }

    //Generating JWT Token For User
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

    //Sending OK Response If Everything Above Goes Well
    return res.status(200).send({
      success: true,
      message: "LogIn Successful",
      user: { id: user._id, name: user.name, email: user.email, contact: user.contact },
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "Error In LogIn", error });
  }
};

//Export Statements
module.exports = { registerController, loginController };
