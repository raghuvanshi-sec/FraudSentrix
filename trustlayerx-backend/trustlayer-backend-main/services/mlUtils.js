const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const ML_ENGINE_DIR = path.join(__dirname, "../../ml-engine");
const PREDICT_SCRIPT = path.join(ML_ENGINE_DIR, "predict.py");
const MODEL_FILE = path.join(ML_ENGINE_DIR, "model.joblib");

/**
 * Runs ML inference on a given text using the trained model.
 * @param {string} text - The text to analyze.
 * @returns {Promise<Object>} - The analysis result { riskScore, level, message }.
 */
exports.predictThreat = (text) => {
    return new Promise((resolve, reject) => {
        // Fallback if model doesn't exist
        if (!fs.existsSync(MODEL_FILE)) {
            return resolve(null);
        }

        const pythonProcess = spawn("python", [PREDICT_SCRIPT, text]);

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
                try {
                    const result = JSON.parse(output.trim());
                    resolve(result);
                } catch (e) {
                    console.error("ML_PARSE_ERROR:", output);
                    resolve(null);
                }
            } else {
                console.error("ML_PREDICT_ERROR:", error);
                resolve(null);
            }
        });
    });
};
