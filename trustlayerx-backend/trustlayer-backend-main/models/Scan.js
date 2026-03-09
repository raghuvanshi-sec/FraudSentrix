const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["text", "audio", "video"],
        default: "text"
    },
    text: String, // transcription for audio/video, or primary text for text scans
    domain: String, // source domain or caller ID info
    riskScore: Number,
    level: String,
    hash: String,
    
    // Vishing Specific Metadata
    vishingMetadata: {
        callerId: String,
        audioUrl: String,
        duration: Number,
        transcript: String
    },

    // Deepfake Specific Metadata
    deepfakeMetadata: {
        videoUrl: String,
        thumbnailUrl: String,
        manipulationType: String, // e.g., face-swap, lip-sync
        confidenceScore: Number
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Scan", scanSchema);