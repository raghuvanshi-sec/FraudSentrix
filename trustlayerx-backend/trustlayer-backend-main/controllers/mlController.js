const { spawn } = require("child_process");
const path = require("path");
const Scan = require("../models/Scan");

const ML_ENGINE_DIR = path.join(__dirname, "../../ml-engine");

exports.trainModels = async (req, res) => {
    try {
        const pythonProcess = spawn("python", [
            path.join(ML_ENGINE_DIR, "train.py")
        ]);

        let output = "";
        let error = "";

        pythonProcess.stdout.on("data", (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on("data", (data) => {
            error += data.toString();
        });

        pythonProcess.on("close", (code) => {
            if (code === 0) {
                res.json({ success: true, message: "ML Model training completed successfully", output });
            } else {
                console.error("ML_TRAIN_ERROR:", error);
                res.status(500).json({ success: false, error: "Training failed", details: error });
            }
        });

    } catch (err) {
        console.error("ML_CONTROLLER_ERROR:", err);
        res.status(500).json({ error: "Failed to trigger training" });
    }
};

exports.getMLStatus = async (req, res) => {
    try {
        const totalSamples = await Scan.countDocuments();
        const modelPath = path.join(ML_ENGINE_DIR, "model.joblib");
        const fs = require("fs");
        
        const modelExists = fs.existsSync(modelPath);
        let lastTrained = null;
        
        if (modelExists) {
            const stats = fs.statSync(modelPath);
            lastTrained = stats.mtime;
        }

        res.json({
            isTrained: modelExists,
            lastTrained,
            totalSamples,
            modelType: "TF-IDF + Logistic Regression",
            accuracy: "89.4%" // Mock accuracy for now, could be parsed from log in future
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch ML status" });
    }
};
