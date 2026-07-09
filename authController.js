const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./User");

exports.register = async (req,res)=>{

try{

const {fullName,email,password}=req.body;

const existingUser=await User.findOne({email});

if(existingUser){

return res.status(400).json({

message:"User already exists"

});

}

const hashedPassword=await bcrypt.hash(password,10);

const accountNumber=Math.floor(
1000000000+Math.random()*9000000000
).toString();

const user=await User.create({

fullName,

email,

password:hashedPassword,

accountNumber

});

res.status(201).json({

message:"Registration Successful",

user

});

}catch(error){

res.status(500).json({

message:error.message

});

}

};

exports.login = async(req,res)=>{

try{

const {email,password}=req.body;

const user=await User.findOne({email});

if(!user){

return res.status(404).json({

message:"User not found"

});

}

const match=await bcrypt.compare(password,user.password);

if(!match){

return res.status(401).json({

message:"Incorrect Password"

});

}

const token=jwt.sign(

{id:user._id},

process.env.JWT_SECRET,

{

expiresIn:"24h"

}

);

res.json({

token,

user

});

}catch(error){

res.status(500).json({

message:error.message

});

}

};
