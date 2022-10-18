const { ProductModel } = require("../models/Product");

const productsService = {};

productsService.findAll = async() => {
    try {
        const products = await ProductModel.find().exec();
        return products;
    } catch (error) {
        throw error;
    }
};

productsService.create = async(productDto) => {
    try {
        const createdProduct = await ProductModel.create(productDto);
        return createdProduct.id;
    } catch (error) {
        throw error;
    }
};

productsService.findById = async(id) => {
    try {
        const product = await ProductModel.findOne({ _id: id });
        return product;
    } catch (error) {
        throw error;
    }
};

productsService.updateById = async(id, productDto) => {
    try {
        const updatedProduct = await ProductModel.updateOne({ _id: id },
            productDto
        );
        return updatedProduct;
    } catch (error) {
        throw error;
    }
};

productsService.deleteById = async(id) => {
    try {
        const deletedProduct = await ProductModel.deleteOne({ _id: id });
        return deletedProduct;
    } catch (error) {
        throw error;
    }
};

productsService.findByKey = async(key, value) => {
    try {
        const products = await ProductModel.find({
            [key]: value,
        }).exec();
        return products;
    } catch (error) {
        throw error;
    }
};
module.exports = productsService;