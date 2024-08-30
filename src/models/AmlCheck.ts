import { Model, DataTypes, Sequelize } from "sequelize";

class AmlCheck extends Model {
  public id!: string;
  public submission_id!: string;
  public passed!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export const initAmlCheckModel = (sequelize: Sequelize) => {
  AmlCheck.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      submission_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      passed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "AmlCheck",
      tableName: "aml_checks",
      timestamps: true,
      underscored: true,
    }
  );

  return AmlCheck;
};

export { AmlCheck };
