import express from "express";
import {
  createPartner,
  getAllPartners,
  getPartner,
  updatePartner,
} from "../controllers/partnerController";

const router = express.Router();

/**
 * @swagger
 * /api/partners:
 *   post:
 *     summary: Create a new partner with configuration
 *     tags: [Partners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - webhook_url
 *               - prediction_high_threshold
 *               - prediction_low_threshold
 *               - aml_state
 *               - cft_state
 *             properties:
 *               name:
 *                 type: string
 *               webhook_url:
 *                 type: string
 *               prediction_high_threshold:
 *                 type: number
 *                 format: float
 *               prediction_low_threshold:
 *                 type: number
 *                 format: float
 *               aml_state:
 *                 type: boolean
 *               cft_state:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Partner created successfully
 *       500:
 *         description: Server error
 */
router.post("/", createPartner);

/**
 * @swagger
 * /api/partners:
 *   get:
 *     summary: List all partners
 *     tags: [Partners]
 *     responses:
 *       200:
 *         description: List of all partners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Partner'
 *       500:
 *         description: Server error
 */
router.get("/", getAllPartners);

/**
 * @swagger
 * /api/partners/{id}:
 *   get:
 *     summary: Get the details of a partner
 *     tags: [Partners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Partner details retrieved successfully
 *       404:
 *         description: Partner not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getPartner);

/**
 * @swagger
 * /api/partners/{id}:
 *   patch:
 *     summary: Update the partner
 *     tags: [Partners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               webhook_url:
 *                 type: string
 *               prediction_high_threshold:
 *                 type: number
 *                 format: float
 *               prediction_low_threshold:
 *                 type: number
 *                 format: float
 *               aml_state:
 *                 type: boolean
 *               cft_state:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Partner updated successfully
 *       404:
 *         description: Partner not found
 *       500:
 *         description: Server error
 */
router.patch("/:id", updatePartner);

export default router;
