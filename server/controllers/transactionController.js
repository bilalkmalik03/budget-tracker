const Transaction = require("../models/Transaction");

exports.createTransaction = async (req, res) => {
  try {
    const { title, amount, type, date } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: no user ID found" });
    }

    const newTx = await Transaction.create({
      title,
      amount,
      type,
      user: userId,
      date,
    });

    res.status(201).json(newTx);
  } catch (err) {
    console.error("❌ Failed to create transaction:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    console.error("❌ Failed to get transactions:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    res.json({ income, expense, total: income - expense });
  } catch (err) {
    res.status(500).json({ message: "Failed to calculate balance" });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete transaction" });
  }
};
