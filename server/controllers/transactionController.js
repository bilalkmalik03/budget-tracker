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

exports.deleteTransaction = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const transaction = await Transaction.findById(req.params.id);
  
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
  
      // Check if the transaction belongs to the logged-in user
      if (transaction.user.toString() !== decoded.id) {
        return res.status(403).json({ message: "Unauthorized to delete this transaction" });
      }
  
      await transaction.deleteOne();
  
      res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong", error: err.message });
    }
  };

  exports.getBalance = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const transactions = await Transaction.find({ user: decoded.id });
  
      let income = 0;
      let expense = 0;
  
      transactions.forEach((tx) => {
        if (tx.type === "income") {
          income += tx.amount;
        } else if (tx.type === "expense") {
          expense += tx.amount;
        }
      });
  
      const total = income - expense;
  
      res.status(200).json({ income, expense, total });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong", error: err.message });
    }
  };