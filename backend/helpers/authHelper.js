//Require Statement
const bcrypt = require("bcrypt");

//Hash Password Function
const hashPassword = async (password) => {
  try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

//Compare Hashed Password Function
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

//Export Statement
module.exports = { hashPassword, comparePassword };
