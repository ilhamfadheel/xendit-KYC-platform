import axios from "axios";
import { Customer } from "../models/Customer";
import { Partner } from "../models/Partner";
import { Submission } from "../models/Submission";
import { AmlCheck } from "../models/AmlCheck";
import { CftCheck } from "../models/CftCheck";

interface WebhookResult {
  success: boolean;
  message: string;
}

export async function sendWebhook(submissionId: string, status: string): Promise<WebhookResult> {
  try {
    const submission = await Submission.findByPk(submissionId);

    if (!submission) {
      return { success: false, message: `Submission not found: ${submissionId}` };
    }

    if (submission.status !== status) {
      return { success: false, message: `Status mismatch (current: ${submission.status}, trying to send: ${status})` };
    }

    const customer = await Customer.findByPk(submission.customer_id);
    if (!customer) {
      return { success: false, message: `Customer not found for submission: ${submissionId}` };
    }

    const partner = await Partner.findByPk(customer.partner_id);
    if (!partner) {
      return { success: false, message: `Partner not found for customer: ${customer.id}` };
    }

    const webhookUrl = partner.webhook_url;
    if (!webhookUrl) {
      return { success: false, message: `Webhook URL not found for partner: ${partner.id}` };
    }

    const amlCheck = await AmlCheck.findOne({ where: { submissionId } });
    const cftCheck = await CftCheck.findOne({ where: { submissionId } });

    const webhookData = {
      submissionId,
      status,
      customer: {
        id: customer.id,
        email: customer.email,
        fullName: customer.full_name,
      },
      checks: {
        aml: amlCheck ? { passed: amlCheck.passed } : null,
        cft: cftCheck ? { passed: cftCheck.passed } : null,
      },
      timestamp: new Date().toISOString()
    };

    console.log("Sending webhook to:", webhookUrl);
    console.log("Webhook data:", webhookData);

    await axios.post(webhookUrl, webhookData);

    console.log("Webhook sent successfully");
    return { success: true, message: "Webhook sent successfully" };
  } catch (error) {
    console.error("Error sending webhook:", error);
    return { success: false, message: `Error sending webhook` };
  }
}