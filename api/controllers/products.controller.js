const productsService = require("../../services/products.service");

const productsController = {};

productsController.getAll = async(req, res, next) => {
    try {
        const products = await productsService.findAll();
        res.json(products);
    } catch (error) {
        next(error);
    }
};
productsController.addNew = async(req, res, next) => {
    const data = req.body;
    try {
        res.json(await productsService.create(data));
    } catch (error) {
        next(error);
    }
};
productsController.getById = async(req, res, next) => {
    const id = req.params.id;
    try {
        const data = await productsService.findById(id);
        res.json(data);
    } catch (error) {
        next(error);
    }
};
productsController.deleteById = async(req, res, next) => {
    const id = req.params.id;
    try {
        res.json(await productsService.deleteById(id));
    } catch (error) {
        next(error);
    }
};
productsController.updateById = async(req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    try {
        res.json(await productsService.updateById(id, data));
    } catch (error) {
        next(error);
    }
};
productsController.getByQuery = async(req, res, next) => {
    const queryKey = Object.keys(req.query)[0];
    const queryValue = req.query[queryKey];
    try {
        const products = await productsService.findByKey(queryKey, queryValue);
        res.json(products);
    } catch (error) {
        next(error);
    }
};

productsController.getByCategory = async(req, res, next) => {
    const category = req.params.category;
    try {
        const products = await productsService.findByKey("category", category);
        res.json(products);
    } catch (error) {
        next(error);
    }
};

module.exports = productsController;