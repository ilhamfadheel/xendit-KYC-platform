import express from "express";
import {
  getSubmissions,
  getSubmissionByCustomerId,
  createSubmission,
} from "../controllers/submissionController";

const router = express.Router();

/**
 * @swagger
 * /api/submissions:
 *   get:
 *     summary: Get all submissions
 *     tags: [Submissions]
 *     responses:
 *       200:
 *         description: List of all submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Submission'
 *       500:
 *         description: Server error
 */
router.get("/", getSubmissions);

/**
 * @swagger
 * /api/submissions/{customerId}:
 *   get:
 *     summary: Get submissions by customer ID
 *     tags: [Submissions]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Submissions for the specified customer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Submission'
 *       404:
 *         description: No submissions found for the customer
 *       500:
 *         description: Server error
 */
router.get("/:customerId", getSubmissionByCustomerId);

/**
 * @swagger
 * /api/submissions:
 *   post:
 *     summary: Create a new submission
 *     tags: [Submissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - status
 *               - liveness_check
 *               - aml_check
 *               - cft_check
 *             properties:
 *               customer_id:
 *                 type: string
 *                 format: uuid
 *               status:
 *                 type: string
 *                 enum: [APPROVED, REJECTED, INCOMPLETE, PENDING]
 *               liveness_check:
 *                 type: object
 *                 required:
 *                   - self_picture
 *                   - score
 *                 properties:
 *                   self_picture:
 *                     type: string
 *                   score:
 *                     type: string
 *                   passed:
 *                     type: boolean
 *               aml_check:
 *                 type: object
 *                 properties:
 *                   passed:
 *                     type: boolean
 *               cft_check:
 *                 type: object
 *                 properties:
 *                   passed:
 *                     type: boolean
 *     responses:
 *       201:
 *         description: Submission created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Submission'
 *       500:
 *         description: Server error
 */
router.post("/", createSubmission);

/**
 * @swagger
 * components:
 *   schemas:
 *     Submission:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         customer_id:
 *           type: string
 *           format: uuid
 *         status:
 *           type: string
 *           enum: [APPROVED, REJECTED, INCOMPLETE, PENDING]
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         liveness_check:
 *           $ref: '#/components/schemas/LivenessCheck'
 *         aml_check:
 *           $ref: '#/components/schemas/AMLCheck'
 *         cft_check:
 *           $ref: '#/components/schemas/CFTCheck'
 *     LivenessCheck:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         submission_id:
 *           type: string
 *           format: uuid
 *         self_picture:
 *           type: string
 *         score:
 *           type: string
 *         passed:
 *           type: boolean
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     AMLCheck:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         submission_id:
 *           type: string
 *           format: uuid
 *         passed:
 *           type: boolean
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     CFTCheck:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         submission_id:
 *           type: string
 *           format: uuid
 *         passed:
 *           type: boolean
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

export default router;
