const express=require('express');
const router=express.Router();
const {
    registerUser,
    loginUser,
    getUserInfo,
    deleteUser,
    getData,
    deleteData,
    uploadAudio
}=require('../controllers/podController');

//sign up new user
router.post('/register',registerUser);

//login user
router.post('/login',loginUser);

//getting user info
router.get('/users/:id',getUserInfo);

//deleting user
router.delete('/users/:id',deleteUser);

//upload route
router.post('/upload',uploadAudio);

//getting all audio
router.get('/data',getData);
//deleting audio
router.delete('/data/:id',deleteData);
module.exports=router;