const express=require('express');

const router=express.Router();
const homeController=require('../controllers/home_controller');


router.get('/',homeController.home);  //home is a function which is in contollers(module.export.home.............)
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));


//for any further routes access from here
//router.use('/routermame',require('./routerfile));

module.exports=router;//use export router so that it is available to main index.js file
