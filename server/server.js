const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables (.env file)

const app = express();

// Middlewares
const allowedOrigins = [
  "http://localhost:5173", 
  "https://budget-tracker-client.vercel.app" // your production domain
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman, curl, etc.
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app") // allow Vercel preview URLs
    ) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
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
