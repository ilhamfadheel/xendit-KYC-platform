import { Request, Response } from "express";
import { Partner } from "../models/Partner";
import sequelize from "../config/database";

export const createPartner = async (req: Request, res: Response) => {
  const t = await sequelize.transaction();

  try {
    console.log("Attempting to create partner with data:", req.body);

    // Create Partner record
    const partner = await Partner.create(req.body, { transaction: t });

    console.log("Partner created successfully:", partner.toJSON());

    await t.commit();

    res.status(201).json(partner.toJSON());
  } catch (error) {
    await t.rollback();
    console.error("Error creating partner:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    res.status(500).json({
      error: "Failed to create Partner",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getAllPartners = async (req: Request, res: Response) => {
  try {
    const partners = await Partner.findAll();
    res.status(200).json(partners);
  } catch (error) {
    console.error("Error fetching all partners:", error);
    res.status(500).json({ error: "Failed to retrieve Partners" });
  }
};

export const getPartner = async (req: Request, res: Response) => {
  try {
    const partner = await Partner.findByPk(req.params.id);
    if (!partner) {
      return res.status(404).json({ error: "Partner not found" });
    }
    res.json(partner);
  } catch (error) {
    console.error("Error retrieving partner:", error);
    res.status(500).json({ error: "Failed to retrieve partner" });
  }
};

export const updatePartner = async (req: Request, res: Response) => {
  const t = await sequelize.transaction();

  try {
    const [updatedRows] = await Partner.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      transaction: t,
    });

    if (updatedRows === 0) {
      await t.rollback();
      return res.status(404).json({ error: "Partner not found" });
    }

    await t.commit();

    const updatedPartner = await Partner.findByPk(req.params.id);
    res.json(updatedPartner);
  } catch (error) {
    await t.rollback();
    console.error("Error updating partner:", error);
    res.status(500).json({ error: "Failed to update partner" });
  }
};
