import { Partner } from "../models/Partner";
import { CftCheck } from "../models/CftCheck";
import { Submission } from "../models/Submission";
import fs from "fs/promises";
import path from "path";
import { cftQueue } from "../utils/queue";
import { AmlCheck } from "../models/AmlCheck";

export function processCftQueue() {
    if (cftQueue.isEmpty()) {
        return;
    }

    console.log("Processing CTF queue");


    const item = cftQueue.dequeue();
    if (!item) return;

    Partner.findByPk(item.partnerId)
        .then((partner) => {
            if (!partner || !partner.cft_state) {
                cftQueue.complete(item);
                return { passed: true };
            }

            return fs
                .readFile(path.join(__dirname, "../thirdParty/CFT.json"), "utf-8")
                .then(JSON.parse)
                .then((cftList) => {
                    const isInCFTList = cftList.some((cftItem: any) =>
                        Object.keys(cftItem).some(
                            (key) => cftItem[key] === item.customerData[key]
                        )
                    );
                    const passed = !isInCFTList;

                    return CftCheck.create({ submissionId: item.submissionId, passed })
                        .then(() => updateSubmissionStatus(item.submissionId, passed))
                        .then(() => {
                            cftQueue.complete(item);
                            return { passed };
                        });
                });
        })
        .catch((error) => {
            console.error("Error processing CFT check:", error);
            cftQueue.requeue(item);
            setTimeout(processCftQueue, 60000); // Retry after 1 minute
        });
}

async function updateSubmissionStatus(submissionId: string, cftPassed: boolean) {
    try {
        const submission = await Submission.findByPk(submissionId);
        if (!submission) {
            console.error(`Submission not found: ${submissionId}`);
            return;
        }

        const amlCheck = await AmlCheck.findOne({ where: { submissionId } });

        let newStatus: 'APPROVED' | 'REJECTED' | 'PENDING';

        if (!cftPassed) {
            newStatus = 'REJECTED';
        } else if (amlCheck && amlCheck.passed) {
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