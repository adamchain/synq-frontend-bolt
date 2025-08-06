import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class OrganizationType extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    product: {
      type: DataTypes.STRING(45),
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'organization_type',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
