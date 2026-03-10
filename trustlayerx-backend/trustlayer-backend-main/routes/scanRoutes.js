const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { analyze, getHistory, getStats } = require("../controllers/scanController");

// Unified Analyze endpoint
router.post("/analyze", authMiddleware, analyze);

// History and Stats endpoints
router.get("/history", authMiddleware, getHistory);
router.get("/stats", authMiddleware, getStats);

module.exports = router;