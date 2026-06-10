function buildMembershipEmail(data) {
    return `

        <div style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 700px;
            margin: auto;
            padding: 2rem;
        ">

            <h1 style="
                color: #555583;
                border-bottom: 3px solid #555583;
                padding-bottom: 1rem;
            ">
                New Membership Application
            </h1>

            <h2 style="color: #555583;">
                Membership Information
            </h2>

            <p>
                <strong>Membership Status:</strong>
                ${data.memberStatus}
            </p>

            <p>
                <strong>Membership Type:</strong>
                ${data.memberType}
            </p>

            <p>
                <strong>How They Heard About BKFA:</strong>
                ${data.hearAboutUs}
            </p>

            <h2 style="color: #555583;">
                Applicant Details
            </h2>

            <p>
                <strong>Name:</strong>
                ${data.firstName} ${data.lastName}
            </p>

            <p>
                <strong>Company/Club:</strong>
                ${data.companyClub || 'N/A'}
            </p>

            <p>
                <strong>Email:</strong>
                ${data.email}
            </p>

            <p>
                <strong>Mobile:</strong>
                ${data.mobile}
            </p>

            <p>
                <strong>Home/Business Phone:</strong>
                ${data.homeNumber}
            </p>

            <h2 style="color: #555583;">
                Address
            </h2>

            <p>
                ${data.streetAddress}
            </p>

            <p>
                ${data.city},
                ${data.state}
                ${data.zipPostal}
            </p>

            <h2 style="color: #555583;">
                Membership Options
            </h2>

            <p>
                <strong>Tax Deductible Donation:</strong>
                ${data.taxDeductibleDonation ? 'Yes' : 'No'}
            </p>

            <p>
                <strong>Donation Amount:</strong>
                ${data.donationAmount
                    ? `$${data.donationAmount}`
                    : 'None'}
            </p>

            <p>
                <strong>Hard Copy Annual Report Requested:</strong>
                ${data.annualReportHardCopy ? 'Yes' : 'No'}
            </p>

            <h2 style="color: #555583;">
                Membership Agreements
            </h2>

            <p>
                <strong>Over 18 Agreement:</strong>
                ${data.over18 ? 'Yes' : 'No'}
            </p>

            <p>
                <strong>Agree To Pay Membership Fee:</strong>
                ${data.agreeToPay ? 'Yes' : 'No'}
            </p>

            <p>
                <strong>Agrees To Uphold BKFA Values:</strong>
                ${data.upholdValues ? 'Yes' : 'No'}
            </p>

            <p>
                <strong>Conflict Of Interest Agreement:</strong>
                ${data.avoidConflictofInterest ? 'Yes' : 'No'}
            </p>

            <p>
                <strong>No Disrepute Declaration:</strong>
                ${data.noCompromise ? 'Yes' : 'No'}
            </p>

            <p>
                <strong>No Membership Revocations:</strong>
                ${data.noRevoke ? 'Yes' : 'No'}
            </p>

            <p>
                <strong>Privacy Policy Accepted:</strong>
                ${data.privacyPolicy ? 'Yes' : 'No'}
            </p>

            <p>
                <strong>Wants Newsletter & Updates:</strong>
                ${data.updatesAndNewsletter ? 'Yes' : 'No'}
            </p>

            <hr>

            <p>
                <strong>Submitted:</strong>
                ${new Date(
                    data.submittedAt
                ).toLocaleString()}
            </p>

        </div>

    `;
}

module.exports = buildMembershipEmail;