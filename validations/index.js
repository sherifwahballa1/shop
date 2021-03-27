const joi = require("@hapi/joi");

const productSchema = {
  productId: joi
    .number()
    .required()
    .min(1)
    .message("ProudctID must be numebr and unsigned"),
};

module.exports = {
  product: joi.object(productSchema),
};
