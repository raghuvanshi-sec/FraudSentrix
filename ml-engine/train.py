import joblib
import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report, confusion_matrix

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.joblib")
DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "SMSSpamCollection")

# Additional domain-specific scam examples (Digital Arrest, Vishing, Indian context)
EXTRA_SCAM_DATA = [
    # Digital Arrest Scams
    ("URGENT: This is the cyber crime department. Your Aadhaar has been linked to illegal activities. You must pay a fine immediately or face arrest.", 1),
    ("This is officer Sharma from CBI. A case has been registered under your name. Transfer the security deposit to avoid arrest.", 1),
    ("Your bank account is being used for money laundering. This is the police. Cooperate or we will issue an arrest warrant.", 1),
    ("I am calling from the Supreme Court. A warrant has been issued in your name. You need to settle the fine via online transfer.", 1),
    ("This is the narcotics department. A parcel with drugs has been intercepted with your Aadhaar. Pay the clearance fee or face imprisonment.", 1),
    ("You are under digital arrest. Do not disconnect. Your Aadhaar number is linked to a terror financing case.", 1),
    ("We are from the RBI. Your PAN card has been used in 14 fraudulent transactions. Your accounts will be frozen unless you verify now.", 1),
    ("This is the Income Tax Department. You have unpaid taxes of Rs 5 lakhs. Pay immediately to avoid legal proceedings.", 1),
    ("I am inspector Verma. Your son has been arrested. Transfer bail money of Rs 50000 immediately.", 1),
    ("TRAI has detected your mobile number is being used for illegal calls. Your SIM will be blocked in 2 hours.", 1),
    ("Mumbai Police Cyber Cell. We have evidence of your involvement in online fraud. Pay settlement or report to station.", 1),
    ("Your KYC is not updated. Your bank account will be blocked within 24 hours. Click this link to update immediately.", 1),
    # Vishing
    ("Hello, this is your bank fraud department. We detected unauthorized transactions. Please verify your account number and PIN.", 1),
    ("This is the IRS. You have an outstanding tax debt. Provide your social security number for verification.", 1),
    ("Your grandson has been in an accident. He needs money for surgery. Please transfer funds immediately.", 1),
    ("This is Microsoft tech support. Your Windows license has expired. Provide remote access so we can fix it.", 1),
    ("We are calling from Airtel. Your mobile number will be deactivated. Share your OTP to keep it active.", 1),
    # Indian Context Phishing
    ("SBI Alert: Suspicious activity detected. Verify your account: http://sbi-online-secure.in/verify", 1),
    ("HDFC Bank: Your debit card has been blocked. Reactivate here: http://hdfc-reactivate.in", 1),
    ("Your Paytm wallet is locked. Verify KYC now or lose your balance: http://paytm-kyc-update.com", 1),
    # Prize / Lottery Scams
    ("You have been selected for a pre-approved loan of Rs 10 lakhs at 0% interest. Pay processing fee of Rs 3000.", 1),
    ("Amazon Lucky Draw: You have won an iPhone 15. Pay shipping charges of Rs 999.", 1),
    ("Earn Rs 50000 per day working from home. No experience needed. Just pay Rs 500 registration fee.", 1),
]

EXTRA_SAFE_DATA = [
    ("Hey, are we still meeting for lunch today at 12?", 0),
    ("The team standup is at 9am. Don't be late.", 0),
    ("Your Amazon order has been shipped. Track at amazon.in/track", 0),
    ("Reminder: Your dentist appointment is tomorrow at 3pm.", 0),
    ("Your SBI account statement for March 2026 is now available.", 0),
    ("Sprint planning is scheduled for Monday at 10am.", 0),
    ("I finished the book you recommended. It was really good.", 0),
    ("The database migration completed without issues.", 0),
    ("Can you pick up some groceries on your way home?", 0),
    ("Your flight AI-302 to Delhi is on time. Boarding starts at Gate 12.", 0),
]


def load_dataset():
    """Load UCI SMS Spam dataset + custom domain-specific examples."""
    # Load UCI dataset
    df = pd.read_csv(DATA_PATH, sep='\t', header=None, names=['label', 'text'], encoding='utf-8')
    df['label'] = df['label'].map({'ham': 0, 'spam': 1})

    # Append domain-specific data
    extra = EXTRA_SCAM_DATA + EXTRA_SAFE_DATA
    extra_df = pd.DataFrame(extra, columns=['text', 'label'])
    df = pd.concat([df, extra_df], ignore_index=True)

    return df


def train():
    print("Loading dataset...")
    df = load_dataset()

    scam_count = int(df['label'].sum())
    safe_count = len(df) - scam_count
    print(f"[DATA] Total: {len(df)} samples | Scam/Spam: {scam_count} | Safe/Ham: {safe_count}")

    X_train, X_test, y_train, y_test = train_test_split(
        df['text'], df['label'], test_size=0.2, random_state=42, stratify=df['label']
    )
    print(f"[SPLIT] Train: {len(X_train)} | Test: {len(X_test)}")

    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(
            stop_words='english',
            lowercase=True,
            ngram_range=(1, 2),
            max_features=10000,
            sublinear_tf=True
        )),
        ('clf', LogisticRegression(
            max_iter=1000,
            C=1.0,
            class_weight='balanced',
            solver='lbfgs'
        ))
    ])

    # Cross-validation
    scores = cross_val_score(pipeline, X_train, y_train, cv=5, scoring='accuracy')
    print(f"[CV] Cross-Validation Accuracy: {scores.mean():.2%} (+/-{scores.std():.2%})")

    # Train on full training set
    pipeline.fit(X_train, y_train)

    # Evaluate on held-out test set
    y_pred = pipeline.predict(X_test)
    print(f"\n[RESULTS] Test Set Performance:")
    print(classification_report(y_test, y_pred, target_names=['SAFE', 'SCAM']))

    cm = confusion_matrix(y_test, y_pred)
    print(f"[MATRIX] Confusion Matrix:")
    print(f"  True Safe:  {cm[0][0]} | False Alarm: {cm[0][1]}")
    print(f"  Missed:     {cm[1][0]} | True Scam:   {cm[1][1]}")

    # Save model
    joblib.dump(pipeline, MODEL_PATH)
    print(f"\n[SAVED] Model saved to {MODEL_PATH}")

    # Quick domain-specific verification
    test_cases = [
        "Your Aadhaar is linked to a crime. Pay now or face arrest.",
        "Hey, want to grab coffee later today?",
        "URGENT: Verify your bank account now to avoid suspension.",
        "The team standup is at 9am. Don't be late.",
        "Congratulations! You won a free ticket. Call now to claim.",
        "Your order has been shipped and will arrive by Thursday.",
    ]
    print("\n[TEST] Domain Verification:")
    for text in test_cases:
        proba = pipeline.predict_proba([text])[0][1]
        risk = int(proba * 100)
        label = ">> SCAM" if risk > 50 else "-- SAFE"
        print(f"  {label} (Risk: {risk}%) -> {text[:65]}")

    return True


if __name__ == "__main__":
    train()
