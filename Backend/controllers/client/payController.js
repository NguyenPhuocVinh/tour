import Pay from "../../db/models/Pay.js";
import Booking from "../../db/models/Booking.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../../errors/index.js";
import createTicketPDF from "../../utils/createTicketPDF.js";
import {sendEmailTicket} from "../../utils/sendEmail.js";

import moment from "moment";
import dotenv from "dotenv";
import querystring from "qs";
import crypto from "crypto";

dotenv.config({ path: "../../.env" });

const createPaymentUrl = async (req, res) => {
  const bookingId = req.params.bookingId;

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let tmnCode = process.env.vnp_TmnCode;
  let secretKey = process.env.vnp_HashSecret;
  let vnpUrl = process.env.vnp_Url;
  let returnUrl = process.env.vnp_ReturnUrl;
  let orderId = moment(date).format("HHmmss");
  const amountObject = await Booking.findOne({ _id: bookingId }).select(
    "totalAmount"
  );
  let amount = amountObject.totalAmount;
  let bankCode = "";

  let locale = "vn";
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] =
    "Thanh toan cho ma GD:" + orderId + "bookingId:" + bookingId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  const pay = new Pay({
    orderId: orderId,
    bookingId: bookingId,
    amountTranstion: amount,
    createDate: createDate,
  });
  await pay.save();

  res.status(StatusCodes.OK).json({ vnpUrl });   
  // res.redirect(vnpUrl);
  console.log(vnpUrl);
  console.log(vnp_Params);
};

const vnpayReturn = async (req, res) => {
  try {
    let vnp_Params = req.query;
    let secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    let tmnCode = process.env.vnp_TmnCode;
    let secretKey = process.env.vnp_HashSecret;

    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      const orderId = vnp_Params["vnp_TxnRef"];
      const updatedBooking = await updatePaymentStatus(orderId);
      const bookingId = await getBookingIdFromPay(orderId);
      const bookingData = await getBookingCreateTicket(bookingId);
      const pdfPath = await createTicketPDF(bookingData);
      const to = bookingData.email;
      const subject = "Xác nhận thanh toán";
      const text = "Xác nhận thanh toán thành công!";
      const html = "<p>Xác nhận thanh toán thành công!</p>";

      await sendEmailTicket(to, subject, text, html, pdfPath);

      return res.status(StatusCodes.OK).json({ code: "00" });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ code: "97" });
    }
  } catch (error) {
    console.error("Error processing VNPAY return:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ code: "500", message: "Internal server error" });
  }
};


const IPN_Url = async (req, res) => {
  // try {
  //   let vnp_Params = req.query;
  //   let secureHash = vnp_Params["vnp_SecureHash"];

  //   delete vnp_Params["vnp_SecureHash"];
  //   delete vnp_Params["vnp_SecureHashType"];

  //   vnp_Params = sortObject(vnp_Params);

  //   let tmnCode = process.env.vnp_TmnCode;
  //   let secretKey = process.env.vnp_HashSecret;

  //   let signData = querystring.stringify(vnp_Params, { encode: false });
  //   let hmac = crypto.createHmac("sha512", secretKey);
  //   let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  //   if (secureHash === signed) {
  //     const orderId = vnp_Params["vnp_TxnRef"];
  //     console.log("orderId", orderId);
  //     const updatedBooking = await updatePaymentStatus(orderId);
  //     const bookingId = await getBookingIdFromPay(orderId);
  //     const bookingData = await getBookingCreateTicket(bookingId);
  //     const pdfPath = await createTicketPDF(bookingData);
  //     const to = bookingData.email;
  //     const subject = "Xác nhận thanh toán";
  //     const text = "Xác nhận thanh toán thành công!";
  //     const html = "<p>Xác nhận thanh toán thành công!</p>";

  //     await sendEmailTicket(to, subject, text, html, pdfPath);

  //     return res.status(StatusCodes.OK).json({ code: "00" });
  //   } else {
  //     return res.status(StatusCodes.BAD_REQUEST).json({ code: "97" });
  //   }
  // } catch (error) {
  //   console.error("Error processing VNPAY return:", error);
  //   return res
  //     .status(StatusCodes.INTERNAL_SERVER_ERROR)
  //     .json({ code: "500", message: "Internal server error" });
  // }
};

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

const getBookingIdFromPay = async (orderId) => {
  try {
    const payRecord = await Pay.findOne({ orderId: orderId });

    if (!payRecord) {
      throw new BadRequestError("Pay record not found for orderId: " + orderId);
    }

    return payRecord.bookingId;
  } catch (error) {
    console.error("Error getting bookingId from Pay:", error);
    throw new BadRequestError("Error getting bookingId from Pay");
  }
};

const updatePaymentStatus = async (orderId) => {
  try {
    const PayRecord = await Pay.findOne({orderId});

    if (!PayRecord) {
      throw new Error("Failed to update payment status");
    }

    const booking = await Booking.findById(PayRecord.bookingId);
    booking.paymentStatus = "Đã thanh toán";
    await booking.save();
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw new Error("Error updating payment status");
  }
};


const getBookingCreateTicket = async (bookingId) => {
  const booking = await Booking.findOne({ _id: bookingId }).populate('tourId');
  const bookingData = {
    tourName: booking.tourId.tourName,
    fullName: booking.fullName,
    email: booking.email,
    phone: booking.phone,
    departureDate: booking.departureDate,
    dateCreate: booking.dateCreate,
    quantity: booking.quantity,
    totalAmount: booking.totalAmount,
    paymentStatus: booking.paymentStatus,
  };
  return bookingData;
};

export { createPaymentUrl, vnpayReturn, IPN_Url };
