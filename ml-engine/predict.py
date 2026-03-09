import joblib
import sys
import json
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.joblib")

def predict(text):
    if not os.path.exists(MODEL_PATH):
        return {"error": "Model not trained", "riskScore": 0, "level": "UNKNOWN"}
        
    try:
        model = joblib.load(MODEL_PATH)
        # TfidfVectorizer expects a list of documents
        proba = model.predict_proba([text])[0][1] # Probability of being scam (class 1)
        risk_score = int(proba * 100)
        
        level = "LOW"
        if risk_score > 70: level = "HIGH"
        elif risk_score > 40: level = "MEDIUM"
        
        return {
            "riskScore": risk_score,
            "level": level,
            "message": "🚨 Scam detected" if level == "HIGH" else "Looks Safe"
        }
    except Exception as e:
        return {"error": str(e), "riskScore": 0, "level": "ERROR"}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No text provided"}))
        sys.exit(1)
        
    input_text = sys.argv[1]
    result = predict(input_text)
    print(json.dumps(result))
