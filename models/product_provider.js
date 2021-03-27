const Product = require("./../db_connection/sequelize.config").Product;
const Provider = require("./../db_connection/sequelize.config").Provider;
module.exports = (sequelize, DataTypes) => {
  const { DATE, DECIMAL, BOOLEAN } = DataTypes;

  const Product_Providers = sequelize.define(
    "product_providers",
    {
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // references: {
        //   model: Product, // 'Products' would also work
        //   key: "id",
        // },
      },
      providerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // references: {
        //   model: Provider, // 'Providers' would also work
        //   key: "id",
        // },
      },
      price: {
        type: DECIMAL,
        allowNull: false,
      },
      available: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date(),
        field: "created_at",
      },
      updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date(),
        field: "updated_at",
      },
    },
    {
      timestamps: false,
      tableName: "product_providers",
    }
  );

  // set the Product_Providers relations (1:m)
  Product_Providers.associate = (models) => {
    Product_Providers.belongsTo(models.Product, {
      foreignKey: "productId",
      sourceKey: models.Product.id,
    });

    Product_Providers.belongsTo(models.Provider, {
      foreignKey: "providerId",
      sourceKey: models.Provider.id,
    });
  };

  Product_Providers.beforeBulkUpdate((product_providers) => {
    product_providers.attributes.updateTime = new Date();
    return product_providers;
  });

  return Product_Providers;
};
