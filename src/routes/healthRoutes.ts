import express from "express";
import { getHealth } from "../controllers/healthControllers";

const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check the health of the service
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *       500:
 *         description: Service is unhealthy
 */
router.get("/", getHealth);

export default router;
