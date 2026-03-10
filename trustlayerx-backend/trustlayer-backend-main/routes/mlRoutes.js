const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { trainModels, getMLStatus } = require("../controllers/mlController");

router.post("/train", authMiddleware, trainModels);
router.get("/status", authMiddleware, getMLStatus);

module.exports = router;
