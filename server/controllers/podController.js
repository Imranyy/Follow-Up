const User=require('../models/userModel');
const Audio=require('../models/audioModel');
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
require('dotenv').config()

//register user
const registerUser=async(req,res)=>{
        try {
            const {pic, username, email, password}=req.body;
            if(pic&&username&&email&&password){
                //check if user exist in the db
                const userExit=await User.findOne({email});
                if(userExit){
                    res.send({msg:'User already exists'});
                }
                //hashing the password
                const salt=await bcrypt.genSalt(10);
                const hashedPassword=await bcrypt.hash(password,salt);
                //creating user account in db
                const newUser=await User.create({
                    pic,
                    username,
                    email,
                    password:hashedPassword
                });
                if(newUser){
                    res.status(200).send({
                        _id:newUser.id,
                        pic:newUser.pic,
                        username:newUser.username,
                        email:newUser.email,
                        token:generateUserToken(newUser.id)
                    })
                }else{
                    res.status(201).send({msg:'Invalid User Data!'})
                }
            }else{
                res.send({msg:'Enter all fields'});
            }
        } catch (error) {
            res.status(500).send(error.message)
        }
};

//login User
const loginUser=async(req,res)=>{
    try{
        const {email,password} =req.body;
        const user=await User.findOne({email});
        if(user&&(await bcrypt.compare(password,user.password))){
            res.status(200).send({
                _id:user.id,
                pic:user.pic,
                username:user.username,
                email:user.email, 
                token:generateUserToken(user.id)
            })
        }else{
            res.status(400).send({msg:'Invalid Credentials'})
        }
    }catch(err){
        res.status(500).send(err.message)
    }
}

//auth Middlerware
const protect=async(req,res,next)=>{
    let token
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from headers
            token=req.headers.authorization.split(' ')[1]
            //verify token
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            //get user from the token
            req.user=await User.findById(decoded.id).select('password')
            next()
  
        }catch (error){
            res.status(401).send({msg:'Not Authorised☠'})
        }
    }
    if(!token){
      res.status(401).send({msg:'No Token Available☠'})
    }
  };
  
  //generate token
  const generateUserToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'309d'
    })
  };

  //get verify
  const verify=async(req,res)=>{
    try {
      res.status(200).send(true)
    } catch (error) {
      console.log(error.message)
      res.status(401).send({msg:'Not Authorised☠'})
    }
  }

//get all users
const getUsers=async(req,res)=>{
    try {
        const users=await User.find({});
        res.status(200).send(users) 
    } catch (error) {
        res.status(500).send(error.message)
    }
}

//getUserInfo
const getUserInfo=async(req,res)=>{
    try {
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({msg:'No such User'})
          } 
          const info=await User.findById({_id:id});
          res.status(200).send(info);
          if(!info){
            res.status(400).send({msg:'No such User!'})
          }
    } catch (error) {
        res.status(400).send({msg:"User doesn't exist!"})
    }
}

//delete a user
const deleteUser=async(req,res)=>{
    try {
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({msg:'No such User'})
          } 
          const user=await User.findByIdAndDelete({_id:id});
          res.send({msg:'User Deleted'});
          if(!user){
            res.status(404).send({msg:'No such user!'});
          }
    } catch (error) {
        res.send(error.message);
    }
}

//get all  data
const getData=async(req,res)=>{
    try {
        const data=await Audio.find({});
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

//delete a data
const deleteData=async(req,res)=>{
    try {
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({msg:'No such Data'})
          } 
          const deleteData=await Audio.findByIdAndDelete({_id:id});
          res.send({msg:"Audio was deleted successfully"});
          if(!deleteData){
            res.status(400).send({msg:'No such Data!'})
          }

    } catch (error) {
        res.status(400).send(error.message) 
    }
}

//upload an audio
const uploadAudio=async(req,res)=>{
   try {
    const {pic,username,email,audioURL}=req.body;
    const audio= await Audio.create({
        pic,username,email,audioURL
    })
    res.status(200).send({msg:'Audio sent successful',audio})
   } catch (error) {
    res.status(500).send({msg:"Failed to send!"});
   }
}

module.exports={
    protect,
    verify,
    registerUser,
    loginUser,
    getUserInfo,
    deleteUser,
    getData,
    deleteData,
    uploadAudio,
    getUsers
}