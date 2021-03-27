const {
  getAllProductByCategory,
  setProdctAsFeatured,
} = require("../controllers/products");
const { pagination } = require("./../middlewares/paginate");
const router = require("express").Router();

// add pagintion middleware before the request
router.get("/:catId", pagination(), getAllProductByCategory);
router.put("/:productId", setProdctAsFeatured);

module.exports = router;
