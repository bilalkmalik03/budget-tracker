const express = require("express");
const router = express.Router();
const { addTransaction, getTransactions, deleteTransaction } = require("../controllers/transactionController");

router.post("/", addTransaction);     // POST /api/transactions
router.get("/", getTransactions);     // GET /api/transactions
router.delete("/:id", deleteTransaction); 
module.exports = router;
