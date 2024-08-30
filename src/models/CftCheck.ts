import { Model, DataTypes, Sequelize } from "sequelize";

class CftCheck extends Model {
  public id!: string;
  public submission_id!: string;
  public passed!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export const initCftCheckModel = (sequelize: Sequelize) => {
  CftCheck.init(
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
      modelName: "CftCheck",
      tableName: "cft_checks",
      timestamps: true,
      underscored: true,
    }
  );

  return CftCheck;
};

export { CftCheck };
