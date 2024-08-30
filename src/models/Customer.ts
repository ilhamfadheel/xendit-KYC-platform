import { Model, DataTypes, Sequelize } from "sequelize";

class Customer extends Model {
  public id!: string;
  public partner_id!: string;
  public email!: string;
  public full_name!: string;
  public gender!: string;
  public address!: string;
  public phone_number!: string;
  public identification_number!: string;
  public identification_picture!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export const initCustomerModel = (sequelize: Sequelize) => {
  Customer.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      partner_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(9),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      identification_number: {
        type: DataTypes.CHAR(16),
        allowNull: false,
      },
      identification_picture: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Customer",
      tableName: "customers",
      timestamps: true,
      underscored: true,
    }
  );

  return Customer;
};

export { Customer };
