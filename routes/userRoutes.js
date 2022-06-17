const express = require('express')
const dotenv = require('dotenv');

const router = express.Router();
const { updateMe, updateEmail, updatePassword, VerifyEmail } = require('../controllers/userController')

const { getAllUsers, getUser } = require('../controllers/userController')


const { signup, forgotPassword, login, resetPassword, verifyAccount, logout, test } = require('../controllers/authController')
const { auth } = require('../Middleware/auth')
const { access } = require('../Middleware/access')
const passport = require('passport')
const User = require('./../models/userModel');
dotenv.config({ path: './config.env' })

router.post('/signup', signup)
router.post('/auth', auth, test)
router.get('/test', auth, test)
router.post('/login', login)
router.post('/logout', auth, logout)
router.post('/verifyAccount', access, verifyAccount)
router.patch('/updateMe', auth, updateMe)
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)
router.patch('/updateEmail', auth, updateEmail)
router.patch('/verifyEmail', auth, VerifyEmail)
router.patch('/updatePassword', auth, updatePassword)


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


//for sys admin
router
    .route('/')


.get(auth, getAllUsers)

router
    .route('/:id')
    .get(getUser)


module.exports = router;