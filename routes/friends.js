const express=require('express');

const router=express.Router();
const friendsController=require('../controllers/friends_controller');

router.get('/toggle',friendsController.toggleFriend);
module.exports=router;