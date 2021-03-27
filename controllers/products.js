const sequelize = require("../db_connection/sequelize.config").sequelize;
const Product = require("../db_connection/sequelize.config").Product;
const { product: productValidationSchema } = require("./../validations/index");

// return all proudcts in a given category
// (lowest available among its possible providers)
const getAllProductByCategory = async (req, res, next) => {
  try {
    let AllProducts = await sequelize.query(`select products.id, products.name, min(product_providers.price) from products, categories, product_providers, providers
      where products.categoryId = categories.id and products.id = product_providers.productId and
      providers.id = product_providers.providerId and product_providers.available = true and categories.id = ${req.params.catId}
      group by products.id limit ${req.paginate.limit} offset ${req.paginate.offset}`);

    return res.json({ results: AllProducts[0] });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};

// toggle (set/unset) a product as featured inside its category
const setProdctAsFeatured = async (req, res, next) => {
  try {
    // validate req.params
    const { error, value } = productValidationSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.message.replace(/"/g, "") });
    }

    // check if product exists?
    let product = await Product.findByPk(value.productId);
    if (!product) {
      return res
        .status(400)
        .json({ message: "there not exists product with this ID" });
    }
    let isFeatured = product.isFeatured;
    // update product
    let set = await Product.update(
      { isFeatured: !isFeatured },
      { where: { id: value.productId } }
    );
    if (!isFeatured) {
      return res.status(200).json({
        message: `Prouduct ${product.name} is set Featured successfully`,
      });
    } else {
      return res.status(200).json({
        message:
          `Prouduct ${product.name}` + "is unset from be Featured successfully",
      });
    }
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllProductByCategory,
  setProdctAsFeatured,
};
