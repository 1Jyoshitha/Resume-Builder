//Require Statement
const userModel = require("../database/models/userModel");

const userController = async (req, res) => {
  try {
    const user = await userModel.findOne({_id:req.params.id})
    res.status(200).send({name:user.name,contact:user.contact,id:user.id,email:user.email});
  } catch (error) {
    console.log(error);
  }
};




const updateUserController = async(req,res)=>{
    try{
        let update = await userModel.updateOne({_id:req.params.id},{$set:req.body})
        res.status(200).send({success:true,message:"User Updated Successfully",update})
    

    }
    catch(error){
        console.log(error);
    }

}

//Export Statement
module.exports = {userController,updateUserController};
