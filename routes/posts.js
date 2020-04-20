const express=require('express');
const router=express.Router();
const passport=require('passport');
const postController=require('../controllers/post_controller');

router.post('/create-post',passport.checkAuthentication,postController.create);
//router.post('/create-post',postController.home); i think this is wrong
//yes the error is occuring here

module.exports=router;
