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