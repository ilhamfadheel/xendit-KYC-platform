import { Submission } from "../models/Submission";
import { Customer } from "../models/Customer";
import { sendWebhook } from "../utils/webhook";
import { Op } from "sequelize";

const WEBHOOK_CHECK_INTERVAL = 30000; // Check every 30 seconds
const RECENT_CHANGE_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds

export function startWebhookWorker() {
  setInterval(checkAndSendWebhooks, WEBHOOK_CHECK_INTERVAL);
}

async function checkAndSendWebhooks() {
  try {
    const recentlyChangedSubmissions = await Submission.findAll({
      where: {
        status: {
          [Op.ne]: 'PENDING'
        },
        updatedAt: {
          [Op.gte]: new Date(Date.now() - RECENT_CHANGE_THRESHOLD)
        }
      }
    });

    for (const submission of recentlyChangedSubmissions) {
      try {
        const customer = await Customer.findByPk(submission.customer_id);
        if (!customer) {
          console.error(`Customer not found for submission ${submission.id}`);
          continue;
        }

        await sendWebhook(submission.id, submission.status);
        console.log(`Webhook sent for submission ${submission.id}`);
      } catch (error) {
        console.error(`Failed to send webhook for submission ${submission.id}:`, error);
        // You might want to implement a retry mechanism here
      }
    }
  } catch (error) {
    console.error("Error in webhook worker:", error);
  }
}