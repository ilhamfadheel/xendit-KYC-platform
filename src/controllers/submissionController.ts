import { Request, Response } from "express";
import { Submission } from "../models/Submission";
import { amlQueue, cftQueue } from "../utils/queue";

export const getSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await Submission.findAll();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve submissions" });
  }
};

export const getSubmissionByCustomerId = async (
  req: Request,
  res: Response
) => {
  const { customerId } = req.params;

  try {
    const submissions = await Submission.findAll({
      where: { customer_id: customerId },
    });

    if (submissions.length === 0) {
      res
        .status(404)
        .json({ error: "Submissions not found for this customer" });
    } else {
      res.status(200).json(submissions);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve submissions" });
  }
};

export const createSubmission = async (req: Request, res: Response) => {
  const { customer_id, partner_id, customerData } = req.body;

  try {
    // Create a new submission with 'PENDING' status
    const newSubmission = await Submission.create({
      customer_id,
      status: "PENDING",
    });

    // Enqueue AML and CFT checks
    amlQueue.enqueue({
      submissionId: newSubmission.id,
      customerData,
      partnerId: partner_id,
    });
    cftQueue.enqueue({
      submissionId: newSubmission.id,
      customerData,
      partnerId: partner_id,
    });

    res.status(201).json({
      ...newSubmission.toJSON(),
      message: "Submission created and checks enqueued",
    });
  } catch (error) {
    console.error("Error creating submission:", error);
    res.status(500).json({ error: "Failed to create submission" });
  }
};
