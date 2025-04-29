const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables (.env file)

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Budget Tracker API running 🚀");
});

// Import your auth routes
const authRoutes = require("./routes/auth");
// Import your transaction routes
const transactionRoutes = require("./routes/transactions");

// Use routes
app.use("/api/auth", authRoutes);
// Mount your transaction routes
app.use("/api/transactions", transactionRoutes);

// MongoDB Connection and Server Start
const PORT = process.env.PORT || 5000;


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection failed:", err));
