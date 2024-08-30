import { Request, Response } from "express";
import { Customer } from "../models/Customer";
import { createSubmission } from "./submissionController";

export const submitCustomer = async (req: Request, res: Response) => {
  try {
    const customerData = req.body;
    // @ts-ignore
    const partnerId = req.partnerId; // Assuming this is set by your authentication middleware

    const customer = await Customer.create(customerData);

    // Call createSubmission to create a submission and enqueue checks
    await createSubmission(
      {
        body: {
          customer_id: customer.id,
          partner_id: partnerId,
          customerData: customerData,
        },
      } as Request,
      res
    );
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Failed to create customer" });
  }
};

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error("Error retrieving customer:", error);
    res.status(500).json({ error: "Failed to retrieve customer" });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const [updatedRows] = await Customer.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (updatedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    const updatedCustomer = await Customer.findByPk(req.params.id);
    res.json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Failed to update customer" });
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    console.error("Error retrieving customers:", error);
    res.status(500).json({ error: "Failed to retrieve customers" });
  }
};
