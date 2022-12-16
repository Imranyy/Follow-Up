const express=require('express');
const router=express.Router();
const {
    registerUser,
    loginUser,
    getUserInfo,
    deleteUser,
    getData,
    deleteData,
    protect,
    verify,
    getUsers,
    uploadAudio
}=require('../controllers/podController');

//get verified
router.get('/verify',protect,verify);

//sign up new user
router.post('/register',registerUser);

//login user
router.post('/login',loginUser);

//get all users
router.get('/users',protect,getUsers)
//getting user info
router.post('/users/:id',protect,getUserInfo);

//deleting user
router.delete('/users/:id',protect,deleteUser);

//upload route
router.post('/upload',uploadAudio);

//getting all audio
router.get('/data',getData);

//deleting audio
router.delete('/data/:id',protect,deleteData);

module.exports=router;