import joblib
import os
import random
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

MODEL_PATH = os.path.join(os.path.dirname(__file__), "document_model.joblib")

# =====================================================================
# DOCUMENT METADATA FEATURE GENERATION
# =====================================================================
# In a real pipeline, PDF metadata (XMP, creation dates, software used), 
# digital signatures, and PDF stream anomalies would be extracted using 
# tools like PyPDF2, pdfid, or pdf-parser.
# Here we generate synthetic tabular data mimicking those features.

def generate_document_features(num_samples=2000):
    """Generate synthetic PDF/Document analysis features."""
    data = []
    
    # ----------------------------------------------------
    # Generate AUTHEHTIC documents (label 0)
    # ----------------------------------------------------
    for _ in range(num_samples):
        features = {
            'creation_mod_time_diff_hours': np.random.exponential(5),  # Usually modified close to creation if authentic
            'has_valid_digital_signature': 1 if random.random() > 0.1 else 0, # Most authentic docs are signed
            'signature_cert_trusted': 1 if random.random() > 0.05 else 0,     # From a known CA
            'metadata_inconsistency_score': np.random.normal(0.05, 0.02),     # Very low inconsistency
            'suspicious_fonts_used': 0 if random.random() > 0.05 else 1,      # Standard fonts
            'image_compression_anomalies': np.random.normal(0.02, 0.01),      # Images inserted naturally
            'hidden_text_layers': 0 if random.random() > 0.02 else 1,         # Rarely have hidden "white on white" text
            'pdf_version_mismatch': 0,                                        # Header matches actual PDF version
            'javascript_embedded': 0 if random.random() > 0.01 else 1,        # Rare in standard contracts
            'label': 0
        }
        data.append(features)
        
    # ----------------------------------------------------
    # Generate FORGED/TAMPERED documents (label 1)
    # ----------------------------------------------------
    for _ in range(num_samples):
        # Tampered documents often show signs of secondary editing
        # e.g., created in 2020, modified in 2024 using "iLovePDF"
        
        tamper_type = random.choice(['metadata', 'signature', 'visual'])
        
        # If tampered visually, image compression (like replacing a name) is high
        img_anom = np.random.normal(0.8, 0.1) if tamper_type == 'visual' else np.random.normal(0.2, 0.1)
        
        # If metadata tampered, high inconsistency (e.g. Author is 'Admin' but created by 'Adobe')
        meta_inconsist = np.random.normal(0.7, 0.15) if tamper_type == 'metadata' else np.random.normal(0.3, 0.1)
        
        # Valid signature is often stripped or invalidated during tampering
        has_sig = 0 if tamper_type == 'signature' else (1 if random.random() > 0.5 else 0)
        cert_trusted = 0 if random.random() > 0.3 else 1
        
        features = {
            'creation_mod_time_diff_hours': np.random.exponential(1000),      # Often modified long after creation
            'has_valid_digital_signature': has_sig,
            'signature_cert_trusted': cert_trusted,
            'metadata_inconsistency_score': meta_inconsist,
            'suspicious_fonts_used': 1 if random.random() > 0.4 else 0,       # Custom fonts to overwrite text
            'image_compression_anomalies': img_anom,                          # "Photoshopped" areas have different JPEG quality
            'hidden_text_layers': 1 if random.random() > 0.7 else 0,          # OCR layers overlaid on images
            'pdf_version_mismatch': 1 if random.random() > 0.7 else 0,        # Tool manipulated the header
            'javascript_embedded': 1 if random.random() > 0.8 else 0,         # Sometimes used for malicious logic
            'label': 1
        }
        data.append(features)
        
    df = pd.DataFrame(data)
    
    # Clip probability values
    for col in ['metadata_inconsistency_score', 'image_compression_anomalies']:
        df[col] = df[col].clip(0, 1)
        
    return df

# =====================================================================
# TRAINING PIPELINE
# =====================================================================

def train():
    print("Generating Document Verification dataset...")
    df = generate_document_features(num_samples=2500)
    
    # Shuffle dataset
    df = df.sample(frac=1).reset_index(drop=True)
    
    forged = df['label'].sum()
    authentic = len(df) - forged
    print(f"[DATA] Total: {len(df)} documents | Forged: {forged} | Authentic: {authentic}")

    X = df.drop('label', axis=1)
    y = df['label']
    feature_cols = list(X.columns)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"[SPLIT] Train: {len(X_train)} | Test: {len(X_test)}")

    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('clf', RandomForestClassifier(
            n_estimators=100,
            max_depth=12,
            random_state=42,
            n_jobs=-1
        ))
    ])

    print("[TRAIN] Training Random Forest model for Document Verification...")
    pipeline.fit(X_train, y_train)

    y_pred = pipeline.predict(X_test)
    print(f"\n[RESULTS] Test Set Performance:")
    print(classification_report(y_test, y_pred, target_names=['Authentic', 'Forged']))

    cm = confusion_matrix(y_test, y_pred)
    print(f"[MATRIX] Confusion Matrix:")
    print(f"  True Authentic: {cm[0][0]} | False Alarm: {cm[0][1]}")
    print(f"  Missed Forgery: {cm[1][0]} | True Forged:   {cm[1][1]}")

    importances = pipeline.named_steps['clf'].feature_importances_
    top_features = sorted(zip(feature_cols, importances), key=lambda x: x[1], reverse=True)
    
    print(f"\n[TOP FORGERY INDICATORS]")
    for feat, imp in top_features[:5]:
        name_clean = feat.replace('_', ' ').title()
        print(f"  {name_clean}: {imp:.4f}")

    joblib.dump(pipeline, MODEL_PATH)
    joblib.dump(feature_cols, os.path.join(os.path.dirname(__file__), "document_features.joblib"))
    print(f"\n[SAVED] Model saved to {MODEL_PATH}")

    # Quick Verification
    print("\n[TEST] Synthetic Input Verification:")
    
    # Test 1: Authentic document (signed, low mod time, clean metadata)
    authentic_test = [2.5, 1, 1, 0.02, 0, 0.01, 0, 0, 0]
    
    # Test 2: Forged document (unsigned, high inconsistency, high compression anomalies)
    forged_test = [850.0, 0, 0, 0.85, 1, 0.75, 1, 0, 0]
    
    for i, test_data in enumerate([authentic_test, forged_test]):
        test_df = pd.DataFrame([test_data], columns=feature_cols)
        proba = pipeline.predict_proba(test_df)[0][1]
        risk = int(proba * 100)
        label = ">> FORGED/TAMPERED" if risk > 50 else "-- AUTHENTIC"
        print(f"  Test Case {i+1} -> {label} (Risk: {risk}%)")

    return True


if __name__ == "__main__":
    train()
