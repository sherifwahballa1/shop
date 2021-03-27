const Provider = require("../db_connection/sequelize.config").Provider;

const getAllProviders = async (req, res, next) => {
  try {
    let providers = await Provider.findAll({
      offset: req.paginate.offset,
      limit: req.paginate.limit,
    });
    return res.json({ providers });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};

module.exports = { getAllProviders };
