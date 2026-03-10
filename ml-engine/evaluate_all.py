import joblib
import os
import pandas as pd
import warnings
warnings.filterwarnings('ignore')

BASE_DIR = os.path.dirname(__file__)

def get_model_path(name):
    return os.path.join(BASE_DIR, name)

def evaluate_text_model():
    print("\n" + "="*50)
    print("1. TEXT / SMS SPAM ANALYZER (Logistic Regression)")
    print("="*50)
    try:
        model = joblib.load(get_model_path("model.joblib"))
        test_cases = [
            ("Your Aadhaar is linked to a crime. Pay now or face arrest.", "SCAM"),
            ("Hey, want to grab coffee later today?", "SAFE"),
            ("URGENT: Verify your bank account now to avoid suspension.", "SCAM"),
            ("The team standup is at 9am. Don't be late.", "SAFE")
        ]
        
        correct = 0
        for text, expected in test_cases:
            proba = model.predict_proba([text])[0][1]
            risk = int(proba * 100)
            pred = "SCAM" if risk > 50 else "SAFE"
            if pred == expected: correct += 1
            icon = "[PASS]" if pred == expected else "[FAIL]"
            print(f"{icon} Expected: {expected:<5} | Pred: {pred:<5} (Risk: {risk:02d}%) -> {text[:45]}...")
            
        print(f"\n=> Accuracy on test suite: {correct}/{len(test_cases)} ({(correct/len(test_cases))*100:.0f}%)")
    except Exception as e:
        print(f"Error loading text model: {e}")


def evaluate_domain_model():
    from train_domain import extract_features
    print("\n" + "="*50)
    print("2. DOMAIN IMPERSONATION CHECKER (Random Forest)")
    print("="*50)
    try:
        model = joblib.load(get_model_path("domain_model.joblib"))
        features_list = joblib.load(get_model_path("domain_features.joblib"))
        test_cases = [
            ("google.com", "LEGIT"),
            ("amazon.com", "LEGIT"),
            ("g00gle-login.xyz", "MALICIOUS"),
            ("sbi-secure-login.info", "MALICIOUS"),
        ]
        
        correct = 0
        for domain, expected in test_cases:
            feats = extract_features(domain)
            feat_values = [feats[c] for c in features_list]
            proba = model.predict_proba([feat_values])[0][1]
            risk = int(proba * 100)
            pred = "MALICIOUS" if risk > 50 else "LEGIT"
            if pred == expected: correct += 1
            icon = "[PASS]" if pred == expected else "[FAIL]"
            print(f"{icon} Expected: {expected:<9} | Pred: {pred:<9} (Risk: {risk:02d}%) -> {domain}")
            
        print(f"\n=> Accuracy on test suite: {correct}/{len(test_cases)} ({(correct/len(test_cases))*100:.0f}%)")
    except Exception as e:
        print(f"Error loading domain model: {e}")


def evaluate_phishing_url_model():
    print("\n" + "="*50)
    print("3. PHISHING URL DETECTOR (Random Forest, 235K subset)")
    print("="*50)
    try:
        model = joblib.load(get_model_path("phishing_model.joblib"))
        features_list = joblib.load(get_model_path("phishing_features.joblib"))
        
        # Mock features
        legit_feats = [0] * len(features_list)
        phishing_feats = [1.0 if c in ['URLSimilarityIndex', 'HasObfuscation'] else 0 for c in features_list]
        
        test_cases = [
            (legit_feats, "LEGITIMATE", "https://wikipedia.org"),
            (phishing_feats, "PHISHING", "http://update-paypal-secure39.com")
        ]
        
        correct = 0
        for feat_vals, expected, url in test_cases:
            df = pd.DataFrame([feat_vals], columns=features_list)
            proba = model.predict_proba(df)[0][1]
            risk = int(proba * 100)
            pred = "PHISHING" if risk > 50 else "LEGITIMATE"
            if pred == expected: correct += 1
            icon = "[PASS]" if pred == expected else "[FAIL]"
            print(f"{icon} Expected: {expected:<10} | Pred: {pred:<10} (Risk: {risk:02d}%) -> {url}")
            
        print(f"\n=> Accuracy on test suite: {correct}/{len(test_cases)} ({(correct/len(test_cases))*100:.0f}%)")
    except Exception as e:
        print(f"Error loading phishing URL model: {e}")


def evaluate_vishing_model():
    print("\n" + "="*50)
    print("4. VISHING / VOICE PHISHING ANALYZER (TF-IDF + LR)")
    print("="*50)
    try:
        model = joblib.load(get_model_path("vishing_model.joblib"))
        test_cases = [
            ("Your grandson is in jail. I need 500 dollars in target gift cards", "VISHING"),
            ("This is Interpol. Your bank account is linked to money laundering", "VISHING"),
            ("Hey, can we reschedule our meeting to 4 pm instead?", "SAFE"),
            ("Hello, this is John from Comcast following up on your internet ticket.", "SAFE")
        ]
        
        correct = 0
        for text, expected in test_cases:
            proba = model.predict_proba([text])[0][1]
            risk = int(proba * 100)
            pred = "VISHING" if risk > 50 else "SAFE"
            if pred == expected: correct += 1
            icon = "[PASS]" if pred == expected else "[FAIL]"
            print(f"{icon} Expected: {expected:<7} | Pred: {pred:<7} (Risk: {risk:02d}%) -> {text[:45]}...")
            
        print(f"\n=> Accuracy on test suite: {correct}/{len(test_cases)} ({(correct/len(test_cases))*100:.0f}%)")
    except Exception as e:
        print(f"Error loading vishing model: {e}")


def evaluate_deepfake_model():
    print("\n" + "="*50)
    print("5. DEEPFAKE VIDEO ANALYZER (Random Forest)")
    print("="*50)
    try:
        model = joblib.load(get_model_path("deepfake_model.joblib"))
        features_list = joblib.load(get_model_path("deepfake_features.joblib"))
        
        # Test 1: Real video profile
        real_test = [0.01, 0.35, 0.04, 0.98, 0.02, 0.99, 0.12, 0.01, 16.0]
        # Test 2: Deepfake video profile (sync issue, edge artifacts)
        fake_test = [0.12, 0.08, 0.35, 0.85, 0.22, 0.88, 0.25, 0.14, 8.0]
        
        test_cases = [
            (real_test, "REAL", "Clear resolution, normal lip sync, 0.35hz blink"),
            (fake_test, "DEEPFAKE", "Facial jitter (0.12), mismatched res, 0.08hz blink")
        ]
        
        correct = 0
        for feat_vals, expected, desc in test_cases:
            df = pd.DataFrame([feat_vals], columns=features_list)
            proba = model.predict_proba(df)[0][1]
            risk = int(proba * 100)
            pred = "DEEPFAKE" if risk > 50 else "REAL"
            if pred == expected: correct += 1
            icon = "[PASS]" if pred == expected else "[FAIL]"
            print(f"{icon} Expected: {expected:<8} | Pred: {pred:<8} (Risk: {risk:02d}%) -> {desc}")
            
        print(f"\n=> Accuracy on test suite: {correct}/{len(test_cases)} ({(correct/len(test_cases))*100:.0f}%)")
    except Exception as e:
        print(f"Error loading deepfake model: {e}")


def evaluate_document_model():
    print("\n" + "="*50)
    print("6. DOCUMENT FORGERY VERIFICATION (Random Forest)")
    print("="*50)
    try:
        model = joblib.load(get_model_path("document_model.joblib"))
        features_list = joblib.load(get_model_path("document_features.joblib"))
        
        # Test 1: Authentic document (signed, low mod time, clean metadata)
        authentic_test = [2.5, 1, 1, 0.02, 0, 0.01, 0, 0, 0]
        # Test 2: Forged document (unsigned, high inconsistency, high compression anomalies)
        forged_test = [850.0, 0, 0, 0.85, 1, 0.75, 1, 0, 0]
        
        test_cases = [
            (authentic_test, "AUTHENTIC", "Signed by CA, consistent metadata, no images comp issues"),
            (forged_test, "FORGED", "No signature, high metadata mismatch, image compression variance")
        ]
        
        correct = 0
        for feat_vals, expected, desc in test_cases:
            df = pd.DataFrame([feat_vals], columns=features_list)
            proba = model.predict_proba(df)[0][1]
            risk = int(proba * 100)
            pred = "FORGED" if risk > 50 else "AUTHENTIC"
            if pred == expected: correct += 1
            icon = "[PASS]" if pred == expected else "[FAIL]"
            print(f"{icon} Expected: {expected:<9} | Pred: {pred:<9} (Risk: {risk:02d}%) -> {desc}")
            
        print(f"\n=> Accuracy on test suite: {correct}/{len(test_cases)} ({(correct/len(test_cases))*100:.0f}%)")
        print("\n" + "="*50 + "\n")
    except Exception as e:
        print(f"Error loading document model: {e}")

if __name__ == "__main__":
    evaluate_text_model()
    evaluate_domain_model()
    evaluate_phishing_url_model()
    evaluate_vishing_model()
    evaluate_deepfake_model()
    evaluate_document_model()
