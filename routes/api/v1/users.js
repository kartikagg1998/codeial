const express=require('express');
const router=express.Router();
const userApi=require('../../../controllers/api/v1/users_api');

router.post('/create_session',userApi.create_session);


module.exports=router;