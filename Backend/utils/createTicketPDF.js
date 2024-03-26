import puppeteer from "puppeteer";

const createTicketPDF = async (bookingData) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short', hour12: false };
    const dateParts = new Date(bookingData.departureDate).toLocaleDateString('vi-VN', options).split(' ');
    const formattedDepartureDate = `${dateParts[4]} ${dateParts[5]} ${dateParts[6]}`;
    

    const htmlContent = `
        <html>
        <head>
            <style>
                /* Add your CSS styles here */
                body {
                    font-family: Arial, sans-serif;
                }
                /* Position the logo in the top right corner */
                .logo-container {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                }
                /* Add any other styles you need */
            </style>
        </head>
        <body>
            <div class="logo-container">
                <img src="https://res.cloudinary.com/ds3gsxqhm/image/upload/v1710752517/tour-images/TOURVIET_cdonme.png" alt="Your Logo" width="100" height="auto">
            </div>
            <h1>Ticket Information</h1>
            <p><strong>Tour:</strong> ${bookingData.tourName}</p>
            <p><strong>Họ và tên:</strong> ${bookingData.fullName}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Số điện thoại:</strong> ${bookingData.phone}</p>
            <p><strong>Ngày khởi hành:</strong> lúc 7:00:00 ${formattedDepartureDate}</p>
            <p><strong>Tổng số vé:</strong> ${bookingData.quantity}</p>
            <p><strong>Tổng số tiền:</strong> ${bookingData.totalAmount} VND</p>
        </body>
        </html>
    `;

    await page.setContent(htmlContent);
    await page.pdf({ path: "ticket.pdf", format: "A4" });

    await browser.close();

    return "ticket.pdf";
};

export default createTicketPDF;
