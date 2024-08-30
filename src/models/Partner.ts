import { Model, DataTypes, Sequelize } from "sequelize";

class Partner extends Model {
  public id!: string;
  public name!: string;
  public webhook_url!: string;
  public prediction_high_threshold!: number;
  public prediction_low_threshold!: number;
  public aml_state!: boolean;
  public cft_state!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Add the static associate method
  public static associate(models: any) {
    Partner.hasMany(models.Customer, {
      foreignKey: "partner_id",
      as: "customers",
    });
  }
}

export const initPartnerModel = (sequelize: Sequelize) => {
  Partner.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      webhook_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prediction_high_threshold: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      prediction_low_threshold: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      aml_state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      cft_state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Partner",
      tableName: "partners",
      timestamps: true,
      underscored: true,
    }
  );

  return Partner;
};

export { Partner };
