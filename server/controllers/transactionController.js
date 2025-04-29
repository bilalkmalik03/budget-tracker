const Transaction = require("../models/Transaction");
const jwt = require("jsonwebtoken");

exports.addTransaction = async (req, res) => {
  try {
    const { title, amount, type } = req.body;

    // Verify user from token
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const transaction = await Transaction.create({
      user: decoded.id,
      title,
      amount,
      type,
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    // Verify user from token
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const transactions = await Transaction.find({ user: decoded.id }).sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};
