function buildContactEmail(data) {

    return `

        <div style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 700px;
            margin: auto;
            padding: 2rem;
            background-color: #ffffff;
        ">

            <div style="
                border-bottom: 3px solid #555583;
                padding-bottom: 1rem;
                margin-bottom: 2rem;
            ">

                <h1 style="
                    color: #555583;
                    margin: 0;
                    font-size: 2rem;
                ">
                    New BKFA Contact Submission
                </h1>

                <p style="
                    margin-top: 0.5rem;
                    color: #666666;
                ">
                    A new enquiry has been submitted through the BKFA website.
                </p>

            </div>

            <table style="
                width: 100%;
                border-collapse: collapse;
            ">

                <tr>
                    <td style="
                        padding: 0.75rem;
                        font-weight: bold;
                        width: 180px;
                        background: #f5f5f5;
                    ">
                        Enquiry Type
                    </td>

                    <td style="
                        padding: 0.75rem;
                    ">
                        ${data.enquiryType || 'N/A'}
                    </td>
                </tr>

                <tr>
                    <td style="
                        padding: 0.75rem;
                        font-weight: bold;
                        background: #f5f5f5;
                    ">
                        Name
                    </td>

                    <td style="
                        padding: 0.75rem;
                    ">
                        ${data.firstName} ${data.lastName}
                    </td>
                </tr>

                <tr>
                    <td style="
                        padding: 0.75rem;
                        font-weight: bold;
                        background: #f5f5f5;
                    ">
                        Email
                    </td>

                    <td style="
                        padding: 0.75rem;
                    ">
                        ${data.email}
                    </td>
                </tr>

                <tr>
                    <td style="
                        padding: 0.75rem;
                        font-weight: bold;
                        background: #f5f5f5;
                    ">
                        Phone
                    </td>

                    <td style="
                        padding: 0.75rem;
                    ">
                        ${data.phone || 'Not provided'}
                    </td>
                </tr>

                <tr>
                    <td style="
                        padding: 0.75rem;
                        font-weight: bold;
                        background: #f5f5f5;
                    ">
                        Submitted
                    </td>

                    <td style="
                        padding: 0.75rem;
                    ">
                        ${new Date(data.submittedAt).toLocaleString()}
                    </td>
                </tr>

            </table>

            <div style="
                margin-top: 2rem;
            ">

                <h2 style="
                    color: #555583;
                    margin-bottom: 1rem;
                ">
                    Message
                </h2>

                <div style="
                    background: #f7f7f7;
                    border-left: 4px solid #555583;
                    padding: 1rem;
                    border-radius: 8px;
                    white-space: pre-wrap;
                ">
                    ${data.message}
                </div>

            </div>

        </div>

    `;
}

module.exports = buildContactEmail;