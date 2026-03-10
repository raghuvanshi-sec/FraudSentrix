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

MODEL_PATH = os.path.join(os.path.dirname(__file__), "deepfake_model.joblib")

# =====================================================================
# DEEPFAKE VIDEO FEATURE DATASET GENERATION
# =====================================================================
# In a real pipeline, these features would be extracted from the video
# frames using tools like OpenCV, MediaPipe, or a CNN (like EfficientNet).
# Here we generate synthetic tabular data that mimics these extracted features.

def generate_video_features(num_samples=2500):
    """Generate synthetic video analysis features."""
    data = []
    
    # ----------------------------------------------------
    # Generate REAL videos (label 0)
    # ----------------------------------------------------
    for _ in range(num_samples):
        # Real videos have natural, consistent patterns
        features = {
            'facial_jitter_score': np.random.normal(0.02, 0.01),       # Very low jitter
            'blink_rate_hz': np.random.normal(0.3, 0.1),               # Normal human blink rate (~15-20 / min)
            'lip_sync_error': np.random.normal(0.05, 0.02),            # Audio and lips are synced
            'color_consistency': np.random.normal(0.95, 0.02),         # Lighting doesn't oddly flicker on face
            'edge_artifacts': np.random.normal(0.03, 0.01),            # Smooth face/background blending
            'pupil_consistency': np.random.normal(0.98, 0.01),         # Eyes look in consistent directions naturally
            'forehead_texture_noise': np.random.normal(0.1, 0.05),     # Natural skin texture
            'resolution_mismatch': np.random.normal(0.01, 0.01),       # Face and background resolution match
            # Some natural variance
            'head_pose_variance': np.random.normal(15.0, 5.0),
            'label': 0
        }
        data.append(features)
        
    # ----------------------------------------------------
    # Generate DEEPFAKE videos (label 1)
    # ----------------------------------------------------
    for _ in range(num_samples):
        # Deepfakes often have subtle anomalies
        
        # Decide which type of deepfake artifact is most prominent in this sample
        artifact_type = random.choice(['sync', 'visual', 'blinking'])
        
        jitter = np.random.normal(0.15, 0.05) if artifact_type == 'visual' else np.random.normal(0.08, 0.03)
        blink = np.random.normal(0.05, 0.05) if artifact_type == 'blinking' else np.random.normal(0.25, 0.1) # Often blink less or unnaturally
        sync = np.random.normal(0.25, 0.1) if artifact_type == 'sync' else np.random.normal(0.1, 0.05)
        color = np.random.normal(0.75, 0.1) if artifact_type == 'visual' else np.random.normal(0.9, 0.05)
        edges = np.random.normal(0.2, 0.08) if artifact_type == 'visual' else np.random.normal(0.08, 0.04) # Blending issues around jawline/hair
        
        features = {
            'facial_jitter_score': jitter,
            'blink_rate_hz': max(0, blink),
            'lip_sync_error': sync,
            'color_consistency': min(1.0, color),
            'edge_artifacts': edges,
            'pupil_consistency': np.random.normal(0.85, 0.08),         # Sometimes pupils deform
            'forehead_texture_noise': np.random.normal(0.3, 0.1),      # Too smooth or too noisy
            'resolution_mismatch': np.random.normal(0.15, 0.08),       # Face might be sharper/blurrier than background
            'head_pose_variance': np.random.normal(10.0, 4.0),         # Often stiffer head movements
            'label': 1
        }
        data.append(features)
        
    df = pd.DataFrame(data)
    
    # Clip values to realistic bounds
    cols_to_clip_0_1 = ['facial_jitter_score', 'lip_sync_error', 'color_consistency', 
                        'edge_artifacts', 'pupil_consistency', 'forehead_texture_noise',
                        'resolution_mismatch']
    for col in cols_to_clip_0_1:
        df[col] = df[col].clip(0, 1)
        
    return df


# =====================================================================
# TRAINING PIPELINE
# =====================================================================

def train():
    print("Generating deepfake metadata dataset...")
    df = generate_video_features(num_samples=3000)
    
    # Shuffle
    df = df.sample(frac=1).reset_index(drop=True)
    
    fake_count = df['label'].sum()
    real_count = len(df) - fake_count
    print(f"[DATA] Total: {len(df)} samples | Deepfake: {fake_count} | Real: {real_count}")

    X = df.drop('label', axis=1)
    y = df['label']
    feature_cols = list(X.columns)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"[SPLIT] Train: {len(X_train)} | Test: {len(X_test)}")

    # Deepfake detection often relies on non-linear combinations of subtle artifacts
    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('clf', RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            random_state=42,
            n_jobs=-1
        ))
    ])

    print("[TRAIN] Training Random Forest model...")
    pipeline.fit(X_train, y_train)

    y_pred = pipeline.predict(X_test)
    print(f"\n[RESULTS] Test Set Performance:")
    print(classification_report(y_test, y_pred, target_names=['Real Video', 'Deepfake']))

    cm = confusion_matrix(y_test, y_pred)
    print(f"[MATRIX] Confusion Matrix:")
    print(f"  True Real:    {cm[0][0]} | False Alarm: {cm[0][1]}")
    print(f"  Missed Fake:   {cm[1][0]} | True Fake:   {cm[1][1]}")

    # Feature importance
    importances = pipeline.named_steps['clf'].feature_importances_
    top_features = sorted(zip(feature_cols, importances), key=lambda x: x[1], reverse=True)
    
    print(f"\n[TOP ANOMALY INDICATORS]")
    for feat, imp in top_features[:5]:
        name_clean = feat.replace('_', ' ').title()
        print(f"  {name_clean}: {imp:.4f}")

    # Save model and feature names
    joblib.dump(pipeline, MODEL_PATH)
    joblib.dump(feature_cols, os.path.join(os.path.dirname(__file__), "deepfake_features.joblib"))
    print(f"\n[SAVED] Model saved to {MODEL_PATH}")

    # Quick Verification
    print("\n[TEST] Synthetic Input Verification:")
    
    # Test 1: Real video profile
    real_test = [0.01, 0.35, 0.04, 0.98, 0.02, 0.99, 0.12, 0.01, 16.0]
    
    # Test 2: Deepfake video profile (sync issue, edge artifacts)
    fake_test = [0.12, 0.08, 0.35, 0.85, 0.22, 0.88, 0.25, 0.14, 8.0]
    
    for i, test_data in enumerate([real_test, fake_test]):
        # Reshape for single prediction
        test_df = pd.DataFrame([test_data], columns=feature_cols)
        proba = pipeline.predict_proba(test_df)[0][1]
        risk = int(proba * 100)
        label = ">> DEEPFAKE" if risk > 50 else "-- REAL"
        print(f"  Test Case {i+1} -> {label} (Risk: {risk}%)")

    return True


if __name__ == "__main__":
    train()
