import express from "express";
import {
  submitCustomer,
  getCustomer,
  updateCustomer,
  getAllCustomers,
} from "../controllers/customerController";

const router = express.Router();

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Submit a customer's personal information for KYC verification. also include their self picture if liveness check is wanted.
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerInput'
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Server error
 *
 * components:
 *   schemas:
 *     CustomerInput:
 *       type: object
 *       required:
 *         - email
 *         - full_name
 *         - gender
 *         - address
 *         - phone_number
 *         - identification_number
 *         - identification_picture
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         full_name:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *         address:
 *           type: string
 *         phone_number:
 *           type: string
 *         identification_number:
 *           type: string
 *         identification_picture:
 *           type: string
 *           format: base64
 *         self_picture:
 *           type: string
 *           format: base64
 *           description: Optional. Base64 encoded image for liveness check.
 */
router.post("/", submitCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Customer details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   patch:
 *     summary: Update a customer
 *     tags: [Customers]
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
 *             $ref: '#/components/schemas/CustomerInput'
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.patch("/:id", updateCustomer);

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: List all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: List of all customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Server error
 */
router.get("/", getAllCustomers);

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomerInput:
 *       type: object
 *       required:
 *         - partner_id
 *         - email
 *         - full_name
 *         - gender
 *         - address
 *         - phone_number
 *         - identification_number
 *         - identification_picture
 *       properties:
 *         partner_id:
 *           type: string
 *           format: uuid
 *         email:
 *           type: string
 *         full_name:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *         address:
 *           type: string
 *         phone_number:
 *           type: string
 *         identification_number:
 *           type: string
 *         identification_picture:
 *           type: string
 *     Customer:
 *       allOf:
 *         - $ref: '#/components/schemas/CustomerInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             created_at:
 *               type: string
 *               format: date-time
 *             updated_at:
 *               type: string
 *               format: date-time
 */

export default router;
