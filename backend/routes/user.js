const express = require('express');
const { verifyUser } = require('../authenticate');
const { userSignup, userLogin, getUser, updateUserProfile } = require('../controllers/user');
const userRouter = express.Router();

userRouter
.route('/signup')
.post(userSignup)

userRouter
.route('/login')
.post(userLogin)

userRouter
.route('/profile')
.get(verifyUser, getUser)
.put(verifyUser, updateUserProfile)





module.exports = userRouter 