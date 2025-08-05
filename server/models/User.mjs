import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class User extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "branch_email_UNIQUE"
    },
    orgId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'org_id'
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "A"
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_time'
    },
    updatedTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_time'
    }
  }, {
    sequelize,
    tableName: 'user',
    hasTrigger: true,
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
      {
        name: "branch_email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  }
}
