import { Model, DataTypes, Sequelize } from "sequelize";

class Submission extends Model {
  public id!: string;
  public customer_id!: string;
  public status!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export const initSubmissionModel = (sequelize: Sequelize) => {
  Submission.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      customer_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("APPROVED", "REJECTED", "INCOMPLETE", "PENDING"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Submission",
      tableName: "submissions",
      timestamps: true,
      underscored: true,
    }
  );

  return Submission;
};

export { Submission };
