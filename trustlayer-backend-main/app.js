const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
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
    res.send("TrustLayer Backend Running 🚀");
});

const Scan = require("./models/Scan");

/* =========================
   ANALYZE API (MAIN LOGIC)
   Supports: Text, Audio (Vishing), Video (Deepfake)
========================= */
app.post("/analyze", async (req, res) => {
    try {
        const { 
            type = "text", 
            text = "", 
            domain = "", 
            vishingMetadata = {}, 
            deepfakeMetadata = {} 
        } = req.body;

        let risk = 0;
        let detectionMessage = "Looks Safe";

        // ✅ STEP 1: Process Text/Domain Scanning (Traditional)
        const keywordWeights = {
            urgent: 20, otp: 30, bank: 20, verify: 25, lottery: 30, win: 20, prize: 20
        };

        const analyzeText = (input) => {
            let score = 0;
            for (let word in keywordWeights) {
                if (input.toLowerCase().includes(word)) score += keywordWeights[word];
            }
            return score;
        };

        if (type === "text" || text) {
            risk += analyzeText(text);
        }

        // ✅ STEP 2: Process Vishing Specifics (Audio)
        if (type === "audio" || vishingMetadata.transcript) {
            risk += analyzeText(vishingMetadata.transcript || "");
            if (vishingMetadata.callerId) risk += 10; // Extra risk for unknown callers if logic added later
        }

        // ✅ STEP 3: Process Deepfake Specifics (Video)
        if (type === "video") {
            if (deepfakeMetadata.confidenceScore) {
                risk = Math.max(risk, deepfakeMetadata.confidenceScore);
            }
        }

        // ✅ STEP 4: Domain Risk Detection
        const suspiciousDomains = ["paytm-secure", "bank-login", "verify-account", "deepfake-gen"];
        if (domain) {
            suspiciousDomains.forEach(d => {
                if (domain.includes(d)) risk += 50;
            });
        }

        // ✅ STEP 5: Risk Level Categorization
        let level = "LOW";
        if (risk > 70) level = "HIGH";
        else if (risk > 40) level = "MEDIUM";

        if (level === "HIGH") detectionMessage = "🚨 Scam detected";

        // ✅ STEP 6: SHA-256 Hash for Deduplication
        // Include type and metadata in hash to distinguish different scans of same text
        const hashPayload = JSON.stringify({ type, text, domain, vishingMetadata, deepfakeMetadata });
        const hash = crypto.createHash("sha256").update(hashPayload).digest("hex");

        // ✅ STEP 7: Duplicate Detection
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
            type,
            text,
            domain,
            riskScore: risk,
            level,
            hash,
            vishingMetadata,
            deepfakeMetadata
        });

        await newScan.save();

        // ✅ RESPONSE
        res.json({
            type,
            riskScore: risk,
            level,
            message: detectionMessage,
            hash
        });

    } catch (err) {
        console.error("ANALYSIS_ERROR:", err);
        res.status(500).json({ error: "Server error during analysis" });
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
app.listen(3000, () => {
    console.log("Server running on port 3000 🚀");
});