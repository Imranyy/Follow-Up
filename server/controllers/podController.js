const User=require('../models/userModel');
const Audio=require('../models/audioModel');
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
require('dotenv').config()

//register user
const registerUser=async(req,res)=>{
        const {pic, username, email, password}=req.body;
        //check if user exist in the db
        const userExit=await User.findOne({email});
        if(userExit){
            res.send('User already exists');
        }
        //hashing the password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        //creating user account in db
        const newUser=await User.create({
            pic,
            username,
            email,
            hashedPassword
        })
        if(newUser){
            res.status(200).send({
                _id:newUser.id,
                pic:newUser.pic,
                username:newUser.username,
                email:newUser.email,
                token:generateToken(newUser.id)
            })
        }else{
            res.status(201).send('Invalid User Data!')
        }
};

//login User
const loginUser=async(req,res)=>{

}

//getUserInfo
const getUserInfo=async(req,res)=>{
    try {
        const {id}=req.params;

    } catch (error) {
        res.status(400).send("User doesn't exist!")
    }
}

//delete a user
const deleteUser=async(req,res)=>{
    try {
        const {id}=req.params;
    } catch (error) {
        res.send(error.message);
    }
}

//get all  data
const getData=async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(400).send(error.message)
    }
}

//delete a data
const deleteData=async(req,res)=>{
    try {
        const {id}=req.params;
    } catch (error) {
        res.status(400).send(error.message) 
    }
}
const uploadAudio=async(req,res)=>{
    const {title,audio}=req.body;
    if(audio==null){
        res.status(400).send({msg:'No file was uploaded'});
    }
    res.send({
        msg:'Audio sent successful',
        results:{
        title,
        audio
        }
    })
}

module.exports={
    registerUser,
    loginUser,
    getUserInfo,
    deleteUser,
    getData,
    deleteData,
    uploadAudio,
}