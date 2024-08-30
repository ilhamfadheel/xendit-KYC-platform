import { processAmlQueue } from "../controllers/amlController";

export function startAmlWorker() {
  setInterval(() => {
    processAmlQueue();
  }, 10 * 1000); // Process queue every 10 second
}
