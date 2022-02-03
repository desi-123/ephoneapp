const { 
 addOrderItems, 
 getOrders, 
 getMyOrders,
 getOrderById,
 updateOrderToPaid
} = require('../controllers/order')

const express = require('express')
const { verifyUser } = require('../authenticate')
const orderRouter = express.Router()


orderRouter.route('/').post(addOrderItems).get(getOrders)
orderRouter.route('/myorders').get(getMyOrders)
orderRouter.route('/:id').get(verifyUser, getOrderById)
orderRouter.route('/:id/pay').put(updateOrderToPaid)


module.exports = orderRouter
