const express = require("express");
const router = express.Router();
const { addTransaction, getTransactions } = require("../controllers/transactionController");

router.post("/", addTransaction);     // POST /api/transactions
router.get("/", getTransactions);     // GET /api/transactions

module.exports = router;
