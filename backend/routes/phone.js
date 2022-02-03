const express = require('express')
const { verifyUser } = require('../authenticate')
const { 
    getPhones, 
    createPhones, 
    getPhone,  
    updatePhone, 
    deletePhone 
} = require('../controllers/phone')

const ephonesRouter = express.Router()

ephonesRouter
    .route('/')
    .get(getPhones)
    .post(verifyUser, createPhones)

ephonesRouter
    .route('/:id')
    .get(getPhone)
    .put(verifyUser, updatePhone)
    .delete(verifyUser, deletePhone)

module.exports = ephonesRouter