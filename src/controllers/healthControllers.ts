import { Request, Response } from "express";
import { pool } from "../utils/database";

export const getHealth = async (req: Request, res: Response) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "OK", message: "Service is healthy" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", message: "Database connection failed" });
  }
};
