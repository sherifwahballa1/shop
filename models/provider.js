module.exports = (sequelize, DataTypes) => {
  const {
    INTEGER,
    STRING,
    DATE,
    TEXT,
    DECIMAL,
    UUID,
    UUIDV4,
    BOOLEAN,
  } = DataTypes;

  const Provider = sequelize.define(
    "providers",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: STRING(45),
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
      tableName: "providers",
    }
  );

  // set the Provider relations (n:m)
  Provider.associate = (models) => {
    Provider.belongsToMany(models.Product, {
      through: "product_providers",
      foreignKey: "providerId",
    });
  };

  Provider.beforeBulkUpdate((product) => {
    provider.attributes.updateTime = new Date();
    return provider;
  });

  return Provider;
};
