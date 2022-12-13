const express=require('express');
const router=express.Router();

//post route
router.post=(req,res)=>{
    res.send('post')
}
//get route
router.get=(req,res)=>{
    res.send('get')
}