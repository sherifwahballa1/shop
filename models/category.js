module.exports = (sequelize, DataTypes) => {
  const { INTEGER, STRING, DATE } = DataTypes;

  const Category = sequelize.define(
    "categories",
    {
      name: {
        type: STRING(45),
        allowNull: false,
      },
      parent_id: {
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
      tableName: "categories",
    }
  );

  // set the Category relations (1:m)
  Category.associate = (models) => {
    Category.hasMany(models.Product);
    Category.hasMany(models.Category, { foreignKey: "parent_id" });
  };

  // before updating any record
  Category.beforeBulkUpdate((category) => {
    category.attributes.updateTime = new Date();
    return category;
  });

  return Category;
};
