const express=require('express');

const router=express.Router();
const passport=require('passport');

const usersController=require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/sign-in',usersController.signIn); 

router.get('/sign-up',usersController.signUp); 

 router.post('/create',usersController.create);

// use passport as a middleware to authenticate

router.post('/create-session',passport.authenticate(  
    'local',
    {failureRedirect:'/users/sign-in'},
),usersController.create_session);

router.get('/sign-out',usersController.destroySession);
//router.post('/post',usersController.post);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.create_session);

router.get('/forgot-password',usersController.forgotPassword);
router.post('/reset_password',usersController.resetPassword);
// router.use('/profile/friends',require('./friends'));


module.exports=router;
