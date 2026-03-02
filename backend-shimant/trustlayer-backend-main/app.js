const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   MONGODB CONNECTION
========================= */
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fraudsentrix   ";
mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log(err));

/* =========================
   SCHEMA + MODEL
========================= */
const Scan = require("./models/Scan");

/* =========================
   ROOT ROUTE
========================= */
app.get("/", (req, res) => {
    res.send("TrustLayer Backend Running 🚀");
});

/* =========================
   ANALYZE API (MAIN LOGIC)
========================= */
app.post("/analyze", async (req, res) => {
    try {
        const { text = "", domain = "" } = req.body;

        // ✅ STEP 0: Input Validation
        if (typeof text !== "string" || typeof domain !== "string") {
            return res.status(400).json({ error: "Invalid input types. Both text and domain must be strings." });
        }

        let risk = 0;

        // ✅ STEP 1: Weighted Keyword Detection
        const keywordWeights = {
            urgent: 20,
            otp: 30,
            bank: 20,
            verify: 25,
            lottery: 30,
            win: 20,
            prize: 20
        };

        for (let word in keywordWeights) {
            if (text.toLowerCase().includes(word)) {
                risk += keywordWeights[word];
            }
        }

        // ✅ STEP 2: Domain Risk Detection
        const suspiciousDomains = ["paytm-secure", "bank-login", "verify-account"];

        if (domain) {
            suspiciousDomains.forEach(d => {
                if (domain.includes(d)) {
                    risk += 50;
                }
            });
        }

        // ✅ STEP 3: Risk Level
        let level = "LOW";
        if (risk > 70) level = "HIGH";
        else if (risk > 40) level = "MEDIUM";

        // ✅ STEP 4: SHA-256 Hash (with delimiter to prevent collisions)
        const hash = crypto
            .createHash("sha256")
            .update(text + "|" + domain)
            .digest("hex");

        // ✅ STEP 5: Duplicate Detection
        const existing = await Scan.findOne({ hash });

        if (existing) {
            return res.json({
                riskScore: existing.riskScore,
                level: existing.level,
                message: "⚠️ Already scanned (duplicate detected)",
                hash
            });
        }

        // ✅ SAVE TO DATABASE
        const newScan = new Scan({
            text,
            domain,
            riskScore: risk,
            level,
            hash
        });

        await newScan.save();

        // ✅ RESPONSE
        res.json({
            riskScore: risk,
            level,
            message: level === "HIGH" ? "🚨 Scam detected" : "Looks Safe",
            hash
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

/* =========================
   HISTORY API
========================= */
app.get("/history", async (req, res) => {
    try {
        const data = await Scan.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch history" });
    }
});

/* =========================
   STATS API
========================= */
app.get("/stats", async (req, res) => {
    try {
        const total = await Scan.countDocuments();
        const highRisk = await Scan.countDocuments({ level: "HIGH" });

        res.json({
            totalScans: total,
            highRiskScans: highRisk
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch stats" });
    }
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});