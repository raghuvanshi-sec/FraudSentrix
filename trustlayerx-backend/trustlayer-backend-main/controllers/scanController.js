const Scan = require("../models/Scan");
const crypto = require("crypto");
const { predictThreat } = require("../services/mlUtils");

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
        let isMLUsed = false;

        // ✅ STEP 1: Process ML Analysis (If model exists)
        if (type === "text" || (type === "audio" && vishingMetadata.transcript)) {
            const mlResult = await predictThreat(text || vishingMetadata.transcript);
            if (mlResult) {
                risk = mlResult.riskScore;
                detectionMessage = mlResult.message;
                isMLUsed = true;
            }
        }

        // ✅ STEP 2: Fallback to Heuristic Engine (If ML fails or is not applicable)
        if (!isMLUsed) {
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

            if (type === "audio" || vishingMetadata.transcript) {
                risk += analyzeText(vishingMetadata.transcript || "");
                if (vishingMetadata.callerId) risk += 10;
            }

            if (type === "video") {
                if (deepfakeMetadata.confidenceScore) {
                    risk = Math.max(risk, deepfakeMetadata.confidenceScore);
                }
            }

            if (domain) {
                const suspiciousDomains = ["paytm-secure", "bank-login", "verify-account", "deepfake-gen"];
                suspiciousDomains.forEach(d => {
                    if (domain.includes(d)) risk += 50;
                });
            }
        }

        // ✅ RISK CATEGORIZATION
        let level = "LOW";
        if (risk > 70) level = "HIGH";
        else if (risk > 40) level = "MEDIUM";

        if (level === "HIGH" && !detectionMessage) detectionMessage = "🚨 Scam detected";

        // ✅ DEDUPLICATION
        const hashPayload = JSON.stringify({ type, text, domain, vishingMetadata, deepfakeMetadata, userId });
        const hash = crypto.createHash("sha256").update(hashPayload).digest("hex");

        const existing = await Scan.findOne({ hash });
        if (existing) {
            return res.json({
                riskScore: existing.riskScore,
                level: existing.level,
                message: "⚠️ Already scanned (duplicate detected)",
                hash
            });
        }

        // ✅ SAVE
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
            hash,
            isMLUsed
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