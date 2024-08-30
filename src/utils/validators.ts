import { Request, Response, NextFunction } from "express";

export const validatePartnerInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Invalid partner name" });
  }
  next();
};

export const validateSubmissionInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { customer_id, status } = req.body;
  if (!customer_id || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!["APPROVED", "REJECTED", "INCOMPLETE", "PENDING"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  next();
};
