import joblib
import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report, confusion_matrix

MODEL_PATH = os.path.join(os.path.dirname(__file__), "vishing_model.joblib")

# =====================================================================
# VISHING DATASET GENERATION
# =====================================================================

VISHING_TEMPLATES = [
    # Tech Support Scams
    "Hello, this is Microsoft technical support. We have detected a virus on your computer. Please grant us remote access to fix it.",
    "Your Windows license has expired and all services will be suspended. Press 1 to speak to an agent.",
    "This is Apple Support. There is a breach in your iCloud account. Please verify your Apple ID password to secure it.",
    "We are calling from your internet service provider. Your router has been compromised by hackers. We need to install security software.",
    # IRS / Tax Scams
    "This is an automated message from the IRS. A lawsuit has been filed against you for tax fraud. Call us back immediately at this number.",
    "You have an outstanding tax balance. If you do not pay within 24 hours, local authorities will issue a warrant for your arrest.",
    "Your Social Security number has been suspended due to suspicious activity. Press 1 to speak with an officer.",
    # Bank / Fake Fraud Alert Scams
    "This is the fraud department at Chase Bank. Did you authorize a charge for $800 at Target? If not, please confirm your card number and CVV.",
    "We detected unauthorized access to your Wells Fargo account. To verify your identity, please read me the code that was just sent to your phone.",
    "Your debit card has been temporarily locked. To unlock it, please provide your date of birth and the last four digits of your Social Security number.",
    "Hello, this is your credit card company. You have a pre-approved loan of $50,000. Just pay a processing fee of $200 via gift cards.",
    # Family Emergency / Grandparent Scams
    "Grandma, it's me. I've been in an accident and I'm in jail. Please don't tell mom. I need you to wire bail money right now.",
    "This is officer Jenkins. Your grandson is in our custody. He needs $2000 for bail or he will be transferred to county lockup.",
    # Indian Context Vishing
    "This is speaking from SBI headquarters. Your KYC is incomplete and account will be blocked today. Share the OTP to update it.",
    "You have won the KBC lottery of 25 lakh rupees. Pay the tax amount of 10,000 rupees to claim your prize.",
    "Hello sir, I am calling from Paytm. We are upgrading your wallet. Please download the AnyDesk app so I can guide you.",
    "TRAI department calling. 14 illegal complaints are registered against your Aadhaar. Your number will be deactivated in 2 hours.",
    "Digital arrest warrant has been issued. You must remain on this video call until the investigation is complete.",
    # AI Voice Clone impersonation
    "Hey mom, my phone broke so I'm calling from a friend's number. I really need you to send me some money on Zelle right now, it's an emergency.",
    "Hi, this is your boss. I'm stuck in a meeting and need you to buy 5 Apple gift cards for a client right now. Text me the codes.",
]

BENIGN_TEMPLATES = [
    # Business / Professional
    "Hi, this is Sarah from HR. I'm calling to follow up on your interview yesterday. We'd like to schedule a second round.",
    "Hey John, are we still on for the marketing meeting at 2 PM?",
    "This is a reminder from Dr. Smith's office about your dental appointment tomorrow at 9 AM.",
    "Good afternoon, I'm calling from the pharmacy. Your prescription is ready for pickup.",
    # Customer Service (legitimate)
    "Thank you for calling Delta Airlines. How can I help you with your booking today?",
    "Hello, this is Comcast support. I see you're experiencing internet outages in your area. Our technicians are working on it.",
    "Your Amazon package has been delivered to your front porch.",
    # Personal / Casual
    "Hey man, what time are we heading to the game tonight?",
    "Mom, can you pick me up from soccer practice at 5?",
    "Hi, I'm calling about the Honda Civic you listed on Craigslist. Is it still available?",
    "Did you remember to take the trash out this morning?",
    "Hello, I'd like to order a large pepperoni pizza for delivery, please.",
    "Sorry I missed your call earlier, I was driving. What's up?",
    # Indian Routine
    "Bhaiya, parcel aa gaya है. Gate par wait kar raha hoon.",
    "Hi, your Swiggy order will be delivered in 10 minutes.",
    "Can we reschedule our 1:1 meeting to tomorrow?",
    "Just calling to check if you received the email I sent this morning."
]

def generate_vishing_data(num_samples=2000):
    """Generate synthetic vishing and benign call transcripts."""
    data = []
    
    # Generate Vishing
    import random
    import string
    
    scam_keywords = ["urgent", "arrest", "suspend", "verify", "password", "otp", "gift card", "wire transfer", "anydesk", "teamviewer"]
    
    for _ in range(num_samples):
        base = random.choice(VISHING_TEMPLATES)
        # Randomly insert urgency or typical scam flags
        if random.random() > 0.7:
            base = "URGENT: " + base
        if random.random() > 0.8:
            base += f" Please verify your details immediately."
            
        data.append((base, 1))
        
    # Generate Benign
    for _ in range(num_samples):
        base = random.choice(BENIGN_TEMPLATES)
        data.append((base, 0))
        
    return pd.DataFrame(data, columns=["transcript", "label"])


# =====================================================================
# TRAINING PIPELINE
# =====================================================================

def train():
    print("Generating vishing dataset...")
    df = generate_vishing_data(num_samples=2500)
    
    scam_count = df['label'].sum()
    safe_count = len(df) - scam_count
    print(f"[DATA] Total: {len(df)} transcripts | Vishing: {scam_count} | Safe: {safe_count}")

    X_train, X_test, y_train, y_test = train_test_split(
        df['transcript'], df['label'], test_size=0.2, random_state=42, stratify=df['label']
    )
    print(f"[SPLIT] Train: {len(X_train)} | Test: {len(X_test)}")

    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(
            stop_words='english',
            ngram_range=(1, 3), # Capture phrases like "gift card", "social security"
            max_features=5000,
            sublinear_tf=True
        )),
        ('clf', LogisticRegression(
            max_iter=1000,
            C=1.5,
            class_weight='balanced'
        ))
    ])

    # Cross-validation
    scores = cross_val_score(pipeline, X_train, y_train, cv=5, scoring='accuracy')
    print(f"[CV] Cross-Validation Accuracy: {scores.mean():.2%} (+/-{scores.std():.2%})")

    # Train on full set
    print("[TRAIN] Training model...")
    pipeline.fit(X_train, y_train)

    y_pred = pipeline.predict(X_test)
    print(f"\n[RESULTS] Test Set Performance:")
    print(classification_report(y_test, y_pred, target_names=['Safe', 'Vishing']))

    cm = confusion_matrix(y_test, y_pred)
    print(f"[MATRIX] Confusion Matrix:")
    print(f"  True Safe:  {cm[0][0]} | False Alarm: {cm[0][1]}")
    print(f"  Missed:     {cm[1][0]} | True Scam:   {cm[1][1]}")

    # Top indicator words (coefficients)
    clf = pipeline.named_steps['clf']
    tfidf = pipeline.named_steps['tfidf']
    feature_names = tfidf.get_feature_names_out()
    
    top_indices = clf.coef_[0].argsort()[-10:][::-1]
    top_words = [feature_names[i] for i in top_indices]
    print(f"\n[TOP VISHING KEYWORDS]")
    print(", ".join(top_words))

    # Save
    joblib.dump(pipeline, MODEL_PATH)
    print(f"\n[SAVED] Model saved to {MODEL_PATH}")

    # Quick Verification
    test_cases = [
        "This is Interpol. Your bank account is linked to money laundering. Download AnyDesk for audit.",
        "Hey, can we reschedule our meeting to 4 pm instead?",
        "Your grandson is in jail. I need 500 dollars in target gift cards to release him.",
        "Hello, this is John from Comcast following up on your internet ticket.",
        "Your Aadhaar is deactivated. Share OTP to activate it now.",
    ]
    
    print("\n[TEST] Domain Verification:")
    for text in test_cases:
        proba = pipeline.predict_proba([text])[0][1]
        risk = int(proba * 100)
        label = ">> VISHING" if risk > 50 else "-- SAFE"
        print(f"  {label} (Risk: {risk}%) -> {text[:65]}")

    return True


if __name__ == "__main__":
    train()
