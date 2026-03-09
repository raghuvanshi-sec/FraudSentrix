const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const scanRoutes = require("./routes/scanRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/scan", scanRoutes);

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