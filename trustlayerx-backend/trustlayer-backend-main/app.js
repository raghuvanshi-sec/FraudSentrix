const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const scanRoutes = require("./routes/scanRoutes");
const mlRoutes = require("./routes/mlRoutes");

const app = express();

// ✅ Security Headers
app.use(helmet());

// ✅ Rate Limiting (Prevents DDoS and Brute-force)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: "Too many requests from this IP, please try again after 15 minutes." }
});
app.use(limiter);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/scan", scanRoutes);
app.use("/api/ml", mlRoutes);

/* =========================
   MONGODB CONNECTION
========================= */
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log(err));

/* =========================
   ROOT ROUTE
========================= */
app.get("/", (req, res) => {
    res.send("TrustLayerX Backend Running 🚀");
});

/* =========================
   START SERVER
========================= */
app.listen(3000, () => {
    console.log("Server running on port 3000 🚀");
});