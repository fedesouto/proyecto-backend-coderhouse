const { ProductModel } = require("../models/Product")

const productsService = {}

productsService.findAll = async () => {
    try {
        const products = await ProductModel.find().exec()
        return products;
    } catch (error) {
        throw error;
    }
}

productsService.create = async (productDto) => {
try {
    const createdProduct = await ProductModel.create(productDto)
    return createdProduct.id
} catch (error) {
    throw error;
}    
}

productsService.findById = async (id) => {
    try {
        const product = await ProductModel.findOne({id: id})
        return product;
    } catch (error) {
        throw error;
    }
}

productsService.updateById = async (id, productDto) => {
    try {
        const updatedProduct = await ProductModel.updateOne({id: id}, productDto)
        return updatedProduct;
    } catch (error) {
        throw error;
    }
}

productsService.deleteById = async (id) => {
    try {
        const deletedProduct = await ProductModel.deleteOne({id: id})
        return deletedProduct;
    } catch (error) {
        throw error;
    }
}

productsService.findMany = async (ids) => {
    try {
        const products = await ProductModel.find({id: {$in: ids}}).exec()
        return products;
    } catch (error) {
        throw error;
    }
}

module.exports = productsService;