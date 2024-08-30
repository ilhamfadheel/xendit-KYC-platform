import { Partner } from "../models/Partner";
import { AmlCheck } from "../models/AmlCheck";
import { Submission } from "../models/Submission";
import fs from "fs/promises";
import path from "path";
import { amlQueue } from "../utils/queue";
import { CftCheck } from "../models/CftCheck";

export function processAmlQueue() {
    if (amlQueue.isEmpty()) {
        return;
    }

    console.log("Processing AML queue");

    const item = amlQueue.dequeue();
    if (!item) return;

    Partner.findByPk(item.partnerId)
        .then((partner) => {
            if (!partner || !partner.aml_state) {
                amlQueue.complete(item);
                return { passed: true };
            }

            return fs
                .readFile(path.join(__dirname, "../thirdParty/AML.json"), "utf-8")
                .then(JSON.parse)
                .then((amlList) => {
                    const isInAMLList = amlList.some((amlItem: any) =>
                        Object.keys(amlItem).some(
                            (key) => amlItem[key] === item.customerData[key]
                        )
                    );
                    const passed = !isInAMLList;

                    return AmlCheck.create({ submissionId: item.submissionId, passed })
                        .then(() => updateSubmissionStatus(item.submissionId, passed))
                        .then(() => {
                            amlQueue.complete(item);
                            return { passed };
                        });
                });
        })
        .catch((error) => {
            console.error("Error processing AML check:", error);
            amlQueue.requeue(item);
            setTimeout(processAmlQueue, 60000); // Retry after 1 minute
        });
}

async function updateSubmissionStatus(submissionId: string, amlPassed: boolean) {
    try {
        const submission = await Submission.findByPk(submissionId);
        if (!submission) {
            console.error(`Submission not found: ${submissionId}`);
            return;
        }

        const cftCheck = await CftCheck.findOne({ where: { submissionId } });

        let newStatus: 'APPROVED' | 'REJECTED' | 'PENDING';

        if (!amlPassed) {
            newStatus = 'REJECTED';
        } else if (cftCheck && cftCheck.passed) {
            newStatus = 'APPROVED';
        } else {
            newStatus = 'PENDING';
        }

        if (submission.status !== newStatus) {
            submission.status = newStatus;
            await submission.save();
            console.log(`Updated submission ${submissionId} status to ${newStatus}`);
        }
    } catch (error) {
        console.error(`Error updating submission status: ${error}`);
    }
}