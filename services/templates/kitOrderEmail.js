function buildKitOrderEmail(data) {

    return `

        <div style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 700px;
            margin: auto;
            padding: 2rem;
        ">

            <h1 style="
                color: #555583;
                border-bottom: 3px solid #555583;
                padding-bottom: 1rem;
            ">
                New Clean Birth Kit Order
            </h1>

            <h2 style="color: #555583;">
                Customer Information
            </h2>

            <p>
                <strong>Name:</strong>
                ${data.firstName} ${data.lastName}
            </p>

            <p>
                <strong>Email:</strong>
                ${data.email}
            </p>

            <h2 style="color: #555583;">
                Delivery Address
            </h2>

            <p>
                ${data.streetAddress}
            </p>

            <p>
                ${data.city},
                ${data.state}
                ${data.zipPostal}
            </p>

            <p>
                ${data.country}
            </p>

            <h2 style="color: #555583;">
                Order Details
            </h2>

            <p>
                <strong>Number Of Kits:</strong>
                ${data.numKits}
            </p>

            <p>
                <strong>Total Price:</strong>
                $${data.totalPrice}
            </p>

            <p>
                <strong>Accepted Terms:</strong>
                ${data.acceptTerms ? 'Yes' : 'No'}
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

module.exports = buildKitOrderEmail;