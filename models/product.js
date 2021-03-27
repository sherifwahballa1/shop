module.exports = (sequelize, DataTypes) => {
  const { INTEGER, STRING, DATE, TEXT, BOOLEAN } = DataTypes;

  const Product = sequelize.define(
    "products",
    {
      name: {
        type: STRING(45),
        allowNull: false,
      },
      image_url: {
        type: TEXT,
      },
      isFeatured: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      categoryId: {
        type: INTEGER(11),
        allowNull: false,
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
      tableName: "products",
    }
  );

  // set the Product relations (1:m), (n:m)
  Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: "categoryId" });

    Product.belongsToMany(models.Provider, {
      through: "product_providers",
      foreignKey: "productId",
    });
  };

  Product.beforeBulkUpdate((product) => {
    product.attributes.updateTime = new Date();
    return product;
  });

  return Product;
};
