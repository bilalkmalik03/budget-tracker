const express = require("express");
const router = express.Router();
const { addTransaction, getTransactions, deleteTransaction, getBalance } = require("../controllers/transactionController");

router.post("/", addTransaction);     // POST /api/transactions
router.get("/", getTransactions);     // GET /api/transactions
router.delete("/:id", deleteTransaction); 
router.get("/balance", getBalance);
module.exports = router;
