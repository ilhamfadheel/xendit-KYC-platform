import { Model, DataTypes, Sequelize } from "sequelize";

class LivenessCheck extends Model {
  public id!: string;
  public submission_id!: string;
  public self_picture!: string;
  public score!: string;
  public passed!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export const initLivenessCheckModel = (sequelize: Sequelize) => {
  LivenessCheck.init(
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
      self_picture: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      score: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "LivenessCheck",
      tableName: "liveness_checks",
      timestamps: true,
      underscored: true,
    }
  );

  return LivenessCheck;
};

export { LivenessCheck };
