const Sequelize = require("sequelize");
const DB_Config = require("./db.config");

const dialect = process.env.DB_DIALECT || DB_Config.dialect; // 'mysql' || 'sqlite' || 'mariadb' || 'postgres'
const database = process.env.DB_NAME || DB_Config.DB;
const username = process.env.DB_USER || DB_Config.USER_NAME;
const password = process.env.DB_PASS || DB_Config.PASSWORD;

// set configurations for connect to DB
const connectionObject = {
  host: process.env.DB_HOST || DB_Config.HOST,
  dialect: dialect,
  operatorsAliases: false,
  port: process.env.DB_PORT || 3308,
  logging: false, // prevent sequelize from printing sql query to the console
  pool: {
    max: process.env.DB_POOL_MAX | 5,
    min: process.env.DB_POOL_MIN | 1,
    acquire: process.env.DB_POOL_ACQUIRE | 30000,
    idle: process.env.DB_POOL_IDLE | 10000,
  },
};

const sequelize = new Sequelize(database, username, password, connectionObject);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Category = require("../models/category")(sequelize, Sequelize);
db.Product = require("../models/product")(sequelize, Sequelize);
db.Provider = require("../models/provider")(sequelize, Sequelize);
db.Product_Providers = require("../models/product_provider")(
  sequelize,
  Sequelize
);

db.Category.associate(db);
db.Product.associate(db);
db.Provider.associate(db);
// db.Product_Providers.associate(db);

module.exports = db;
