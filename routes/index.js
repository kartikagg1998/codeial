const express=require('express');

const router=express.Router();
const homeController=require('../controllers/home_controller');
//const profileController=require('../controllers/home_controller');

router.get('/',homeController.home);  //home is a function which is in contollers(module.export.home.............)
//router.get('/profile',profileController.profile); 
console.log("router loaded");

module.exports=router;//use export router so that it is available to main index.js file
