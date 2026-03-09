const Scan = require("../models/Scan");
const crypto = require("crypto");

exports.analyze = async (req, res) => {
    try {
        const { 
            type = "text", 
            text = "", 
            domain = "", 
            vishingMetadata = {}, 
            deepfakeMetadata = {} 
        } = req.body;

        const userId = req.user.id;

        let risk = 0;
        let detectionMessage = "Looks Safe";

        // ✅ STEP 1: Process Text/Domain Scanning (Traditional)
        const keywordWeights = {
            urgent: 20, otp: 30, bank: 20, verify: 25, lottery: 30, win: 20, prize: 20
        };

        const analyzeText = (input) => {
            let score = 0;
            if (!input) return 0;
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
            if (vishingMetadata.callerId) risk += 10;
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
        const hashPayload = JSON.stringify({ type, text, domain, vishingMetadata, deepfakeMetadata, userId });
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
            userId,
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
};

exports.getHistory = async (req, res) => {
    try {
        const data = await Scan.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch history" });
    }
};

exports.getStats = async (req, res) => {
    try {
        const total = await Scan.countDocuments({ userId: req.user.id });
        const highRisk = await Scan.countDocuments({ userId: req.user.id, level: "HIGH" });

        // Aggregate by type for better dashboard stats
        const textScans = await Scan.countDocuments({ userId: req.user.id, type: "text" });
        const audioScans = await Scan.countDocuments({ userId: req.user.id, type: "audio" });
        const videoScans = await Scan.countDocuments({ userId: req.user.id, type: "video" });

        res.json({
            totalScans: total,
            highRiskScans: highRisk,
            textScans,
            audioScans,
            videoScans
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch stats" });
    }
};