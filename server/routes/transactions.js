const express = require("express");
const {
  createTransaction,
  getTransactions,
  getBalance,
  deleteTransaction,
} = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware); // protect all routes

router.post("/", createTransaction);
router.get("/", getTransactions);
router.get("/balance", getBalance);
router.delete("/:id", deleteTransaction);

module.exports = router;
