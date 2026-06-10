const fs = require('fs').promises;
const path = require('path');

// saves to json file for records just in case

async function saveSubmission(fileName, submissionData) {

    try {
        const filePath = path.join(
            __dirname,
            `../data/${fileName}.json`
        );

        let submissions = [];

        try {
            const existingData = await fs.readFile(
                filePath,
                'utf8'
            );
            submissions = existingData
                ? JSON.parse(existingData)
                : [];

        } catch (err) {
            // File does not exist yet
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }

        submissions.push(submissionData);

        await fs.writeFile(
            filePath,
            JSON.stringify(submissions, null, 2)
        );

    } catch (err) {
        console.error(
            `Error saving submission to ${fileName}:`,
            err
        );
        throw err;
    }
}

module.exports = {
    saveSubmission
};