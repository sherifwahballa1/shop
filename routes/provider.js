const { getAllProviders } = require("../controllers/providers");
const { pagination } = require("./../middlewares/paginate");
const router = require("express").Router();

// testing pagintion middleware before the request
router.get("/", pagination(), getAllProviders);

module.exports = router;
