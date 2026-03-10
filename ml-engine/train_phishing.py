import joblib
import os
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

MODEL_PATH = os.path.join(os.path.dirname(__file__), "phishing_model.joblib")
DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "phishing", "PhiUSIIL_Phishing_URL_Dataset.csv")

# Features to use for training (numeric columns from the dataset)
FEATURE_COLS = [
    'URLLength', 'DomainLength', 'IsDomainIP', 'URLSimilarityIndex',
    'CharContinuationRate', 'TLDLegitimateProb', 'URLCharProb',
    'TLDLength', 'NoOfSubDomain', 'HasObfuscation', 'NoOfObfuscatedChar',
    'ObfuscationRatio', 'NoOfLettersInURL', 'LetterRatioInURL',
    'NoOfDegitsInURL', 'DegitRatioInURL', 'NoOfEqualsInURL',
    'NoOfQMarkInURL', 'NoOfAmpersandInURL', 'NoOfOtherSpecialCharsInURL',
    'SpssialCharRatioInURL', 'IsHTTPS', 'LineOfCode', 'LargestLineLength',
    'HasTitle', 'DomainTitleMatchScore', 'URLTitleMatchScore',
    'HasFavicon', 'Robots', 'IsResponsive', 'NoOfURLRedirect',
    'NoOfSelfRedirect', 'HasDescription', 'NoOfPopup',
    'NoOfiFrame', 'HasExternalFormSubmit', 'HasSocialNet',
    'HasSubmitButton', 'HasHiddenFields', 'HasPasswordField',
    'BankForm', 'HasCopyrightInfo', 'NoOfImage', 'NoOfCSS', 'NoOfJS',
    'NoOfSelfRef', 'NoOfEmptyRef', 'NoOfExternalRef'
]


def train():
    print("Loading phishing URL dataset...")
    df = pd.read_csv(DATA_PATH)

    # Filter to only columns that exist
    available_cols = [c for c in FEATURE_COLS if c in df.columns]
    missing = [c for c in FEATURE_COLS if c not in df.columns]
    if missing:
        print(f"[WARN] Missing columns (skipped): {missing[:5]}...")

    print(f"[DATA] Total: {len(df)} URLs | Phishing: {(df['label']==1).sum()} | Legitimate: {(df['label']==0).sum()}")
    print(f"[FEATURES] Using {len(available_cols)} features")

    X = df[available_cols].fillna(0)
    y = df['label']

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"[SPLIT] Train: {len(X_train)} | Test: {len(X_test)}")

    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('clf', RandomForestClassifier(
            n_estimators=100,
            max_depth=20,
            class_weight='balanced',
            random_state=42,
            n_jobs=-1
        ))
    ])

    print("[TRAIN] Training Random Forest classifier...")
    pipeline.fit(X_train, y_train)

    y_pred = pipeline.predict(X_test)
    print(f"\n[RESULTS] Test Set Performance:")
    print(classification_report(y_test, y_pred, target_names=['Legitimate', 'Phishing']))

    cm = confusion_matrix(y_test, y_pred)
    print(f"[MATRIX] Confusion Matrix:")
    print(f"  True Legit:    {cm[0][0]} | False Alarm: {cm[0][1]}")
    print(f"  Missed:        {cm[1][0]} | True Phish:  {cm[1][1]}")

    # Feature importance
    importances = pipeline.named_steps['clf'].feature_importances_
    top_features = sorted(zip(available_cols, importances), key=lambda x: x[1], reverse=True)[:10]
    print(f"\n[TOP FEATURES]")
    for feat, imp in top_features:
        print(f"  {feat}: {imp:.4f}")

    joblib.dump(pipeline, MODEL_PATH)
    # Also save the feature columns list for prediction
    joblib.dump(available_cols, os.path.join(os.path.dirname(__file__), "phishing_features.joblib"))
    print(f"\n[SAVED] Model saved to {MODEL_PATH}")

    return True


if __name__ == "__main__":
    train()
