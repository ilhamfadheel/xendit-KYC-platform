import express from "express";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";
import healthRoutes from "./routes/healthRoutes";
import submissionRoutes from "./routes/submissionRoutes";
import { errorHandler } from "./utils/errorHandler";
import { Sequelize } from "sequelize";
import { initModels, Models } from "./models";
import dotenv from "dotenv";
import customerRoutes from "./routes/customerRoutes";
import partnerConfigurationRoutes from "./routes/partnerRoutes";
import { startAmlWorker } from "./workers/amlWorker";
import { startCftWorker } from "./workers/cftWorker";
import {startWebhookWorker} from "./workers/webhookWorker";

dotenv.config();

const app = express();

app.use(express.json());

// Initialize Sequelize ORM
const sequelize = new Sequelize(
  process.env.DB_NAME || "database",
  process.env.DB_USER || "user",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: parseInt(process.env.DB_PORT || "5432"),
    logging: false,
  }
);
let models: Models;

// Initialize database using Sequelize ORM
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    models = initModels(sequelize);
    await sequelize.sync(); // This creates the tables if they don't exist

    console.log("Database synchronized successfully.");
    startAmlWorker();
    startCftWorker();
    startWebhookWorker();
    console.log("AML, CFT, and Webhook workers started.")
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  }
};

initializeDatabase();

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/partners", partnerConfigurationRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/customers", customerRoutes);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
console.log(
  `Swagger documentation available at http://localhost:${process.env.PORT}/api-docs/`
);

// Error handling middleware
app.use(errorHandler);

export default app;
export { sequelize };
