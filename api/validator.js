const joi = require("joi");

module.exports.createDocument = async (req, res, next) => {
    const schema = joi.object({
        collectionName: joi.string().regex(new RegExp(/^[a-zA-Z]+$/)).required(),
        document: joi.object().required()
    });

    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        return res.json({
            error: "validation error",
            stackTrace: error,
            success: false
        })
    }

    next();
}

module.exports.getDocumentById = async (req, res, next) => {
    const schema = joi.object({
        collectionName: joi.string().regex(new RegExp(/^[a-zA-Z]+$/)).required(),
        id: joi.string().regex(new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/)).required()
    });

    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        return res.json({
            error: "validation error",
            stackTrace: error,
            success: false
        })
    }

    next();
};

module.exports.editDocument = async (req, res, next) => {
    const schema = joi.object({
        collectionName: joi.string().regex(new RegExp(/^[a-zA-Z]+$/)).required(),
        id: joi.string().regex(new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/)).required(),
        modifiedData: joi.object().required()
    });

    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        return res.json({
            error: "validation error",
            stackTrace: error,
            success: false
        })
    }

    next();
};