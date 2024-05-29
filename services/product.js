const ProductModel = require('@models/Product')

function createProduct(newProduct){
    return ProductModel.create(newProduct)
}

function getProduct(page=1, pageSize=10, sort = ""){
    let skip = (page - 1) * pageSize
    return ProductModel.find({}).skip(skip).limit(pageSize).sort(sort)
}

function getTotalProduct(){
    return ProductModel.countDocuments({})
}

function getProductById(id){
    return ProductModel.findOne({
        _id: id
    })
}

function updateProduct(id, objUpdate){
    return ProductModel.updateOne({
        _id: id
    }, objUpdate)
}

module.exports = {
    createProduct,
    getProduct,
    getTotalProduct,
    getProductById,
    updateProduct
}