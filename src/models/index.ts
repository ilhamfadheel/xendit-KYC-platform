import { Sequelize, Model } from "sequelize";
import { initSubmissionModel, Submission } from "./Submission";
import { initAmlCheckModel, AmlCheck } from "./AmlCheck";
import { initCftCheckModel, CftCheck } from "./CftCheck";
import { initCustomerModel, Customer } from "./Customer";
import { initLivenessCheckModel, LivenessCheck } from "./LivenessCheck";
import { initPartnerModel, Partner } from "./Partner";

export interface Models {
  AmlCheck: typeof AmlCheck;
  CftCheck: typeof CftCheck;
  Customer: typeof Customer;
  LivenessCheck: typeof LivenessCheck;
  Partner: typeof Partner;
  Submission: typeof Submission;
}

export const initModels = (sequelize: Sequelize): Models => {
  console.log("Initializing models");

  if (!sequelize) {
    throw new Error("Sequelize instance is undefined in initModels");
  }

  const models: Models = {
    AmlCheck: initAmlCheckModel(sequelize),
    CftCheck: initCftCheckModel(sequelize),
    Customer: initCustomerModel(sequelize),
    LivenessCheck: initLivenessCheckModel(sequelize),
    Partner: initPartnerModel(sequelize),
    Submission: initSubmissionModel(sequelize),
  };

  Object.values(models).forEach((model: any) => {
    if (typeof model.associate === "function") {
      model.associate(models);
    }
  });

  console.log("Models initialized successfully");
  return models;
};

export { Sequelize, Model };
