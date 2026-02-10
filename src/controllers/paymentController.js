import Payment from "../models/Payment.js";
import createNotification from "../utils/createNotification.js";

export const createPayment = async (req, res) => {
  try {
    const { amount, planType, upiTransactionId } = req.body;

    if (!amount || !planType || !upiTransactionId) {
      return res.status(400).json({ message: "All fields required" });
    }

    const payment = await Payment.create({
      user: req.user._id,
      amount,
      planType,
      upiTransactionId,
    });

    await createNotification({
      userId: req.user._id,
      title: "Payment Submitted",
      message: `Your payment of ₹${amount} is pending verification`,
      type: "PAYMENT",
    });

    res.status(201).json({
      message: "Payment submitted for verification",
      payment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.status = "VERIFIED";
    await payment.save();

    await createNotification({
      userId: payment.user,
      title: "Payment Verified",
      message: "Your payment has been verified successfully ✅",
      type: "PAYMENT",
    });

    res.json({ message: "Payment verified", payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

