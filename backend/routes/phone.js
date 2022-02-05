const express = require('express')
const { verifyUser } = require('../authenticate')
const { 
    getPhones, 
    createPhones, 
    getPhone,  
    updatePhone, 
    deletePhone, 
    createPhoneReview
} = require('../controllers/phone')

const ephonesRouter = express.Router()

ephonesRouter
    .route('/')
    .get(getPhones)
    .post(verifyUser, createPhones)

ephonesRouter
.route('/:id/reviews')
.post(verifyUser, createPhoneReview)

ephonesRouter
    .route('/:id')
    .get(getPhone)
    .put(verifyUser, updatePhone)
    .delete(verifyUser, deletePhone)

module.exports = ephonesRouter