const OrderModel = require('@models/Order')

const createOrder = async (newOrder)=>{
    return OrderModel.create(newOrder)
}

module.exports = {
    createOrder
}