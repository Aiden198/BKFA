function buildBabyShowerEmail(data) {

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
                Thank you for your form Submission to the Birthing Kit Foundation
            </h1>

            <h2 style="color: #555583;">
                Host Information
            </h2>

            <p>
                <strong>Name:</strong>
                ${data.hostFirstName} ${data.hostLastName}
            </p>

            <p>
                <strong>Email:</strong>
                ${data.email}
            </p>

            <p>
                <strong>Phone:</strong>
                ${data.phone}
            </p>

            <h2 style="color: #555583;">
                Event Details
            </h2>

            <p>
                <strong>Event Date:</strong>
                ${data.eventDate}
            </p>

            <p>
                <strong>Kit Quantity:</strong>
                ${data.kitQuantity}
            </p>

            <p>
                <strong>Mum-to-Be:</strong>
                ${data.mumToBeName}
            </p>

            <p>
                <strong>Expected Guests:</strong>
                ${data.guestCount}
            </p>

            <h2 style="color: #555583;">
                Delivery Information
            </h2>

            <p>
                ${data.deliveryAddress}
            </p>

            <p>
                ${data.city},
                ${data.state}
                ${data.postcode}
            </p>

            <h2 style="color: #555583;">
                Additional Information
            </h2>

            <p>
                <strong>Invoice Recipient:</strong>
                ${data.invoiceRecipient}
            </p>

            <p>
                <strong>How They Heard About BKFA:</strong>
                ${data.heardAboutBKFA}
            </p>

            <p>
                <strong>Submitted:</strong>
                ${new Date(
                    data.submittedAt
                ).toLocaleString()}
            </p>

        </div>

    `;
}

module.exports = buildBabyShowerEmail;