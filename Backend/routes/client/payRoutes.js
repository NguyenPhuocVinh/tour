import { createPaymentUrl, vnpayReturn, IPN_Url } from "../../controllers/client/payController.js";
import auth from "../../middleware/client/auth.js";
import express from "express";
const router = express.Router();

router.get('/create_payment_url', function (req, res, next) {
    res.render('order', { title: 'Tạo mới đơn hàng'});

});

router.get('/refund', function (req, res, next) {
    let desc = 'Hoan tien GD thanh toan';
    res.render('refund', {title: 'Hoàn tiền giao dịch thanh toán'})
});

router.route("/create_payment_url/:bookingId").post(createPaymentUrl);
router.route("/vnpay_return").get(vnpayReturn);
router.route("/vnpay_ipn").get(IPN_Url);

export default router;