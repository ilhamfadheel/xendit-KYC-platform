import { processCftQueue } from "../controllers/cftController";

export function startCftWorker() {
  setInterval(() => {
    processCftQueue();
  }, 10 * 1000); // Process queue every 10 seconds
}
