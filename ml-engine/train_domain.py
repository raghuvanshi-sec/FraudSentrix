"""
Domain Classifier Training Script
----------------------------------
Generates a domain dataset from:
  - Known legitimate domains (Alexa-style top domains)
  - Simulated DGA/malicious domains
  - Known typosquatting patterns
Then trains a Random Forest classifier on extracted domain features.
"""

import joblib
import os
import math
import string
import random
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from collections import Counter

MODEL_PATH = os.path.join(os.path.dirname(__file__), "domain_model.joblib")

# =====================================================================
# DOMAIN DATASET GENERATION
# =====================================================================

LEGITIMATE_DOMAINS = [
    # Tech Giants
    "google.com", "youtube.com", "facebook.com", "amazon.com", "microsoft.com",
    "apple.com", "netflix.com", "linkedin.com", "twitter.com", "instagram.com",
    "reddit.com", "github.com", "stackoverflow.com", "wikipedia.org", "yahoo.com",
    "whatsapp.com", "zoom.us", "dropbox.com", "slack.com", "salesforce.com",
    "adobe.com", "spotify.com", "pinterest.com", "snapchat.com", "tiktok.com",
    # Indian Domains
    "flipkart.com", "paytm.com", "hdfcbank.com", "sbi.co.in", "icicibank.com",
    "irctc.co.in", "swiggy.com", "zomato.com", "myntra.com", "phonepe.com",
    "uidai.gov.in", "incometax.gov.in", "digilocker.gov.in", "nsdl.co.in",
    "bseindia.com", "nseindia.com", "tatamotors.com", "reliancejio.com",
    "airtel.in", "vodafone.in", "mygov.in", "cowin.gov.in",
    # Banking / Finance
    "chase.com", "wellsfargo.com", "bankofamerica.com", "paypal.com",
    "visa.com", "mastercard.com", "citibank.com", "americanexpress.com",
    "stripe.com", "razorpay.com", "coinbase.com", "robinhood.com",
    # E-commerce / Services
    "ebay.com", "walmart.com", "target.com", "bestbuy.com", "shopify.com",
    "etsy.com", "aliexpress.com", "alibaba.com", "booking.com", "airbnb.com",
    # Media / News
    "bbc.com", "cnn.com", "nytimes.com", "theguardian.com", "reuters.com",
    "ndtv.com", "timesofindia.indiatimes.com", "hindustantimes.com",
    # Education
    "mit.edu", "stanford.edu", "harvard.edu", "coursera.org", "udemy.com",
    "khanacademy.org", "edx.org",
    # Health
    "who.int", "nih.gov", "webmd.com", "mayoclinic.org",
    # Productivity
    "notion.so", "trello.com", "asana.com", "monday.com", "figma.com",
    "canva.com", "grammarly.com",
    # Cloud
    "aws.amazon.com", "cloud.google.com", "azure.microsoft.com",
    "digitalocean.com", "heroku.com", "vercel.com", "netlify.com",
]

# Common TLDs for legitimate domains
LEGIT_TLDS = [".com", ".org", ".net", ".edu", ".gov", ".co.in", ".in", ".io", ".dev", ".app"]

# Suspicious TLDs often used in scams
SUSPICIOUS_TLDS = [".xyz", ".top", ".club", ".work", ".click", ".link", ".info",
                   ".online", ".site", ".live", ".buzz", ".tk", ".ml", ".ga", ".cf"]


def generate_dga_domain():
    """Simulate DGA-style random domains."""
    length = random.randint(8, 24)
    chars = string.ascii_lowercase + string.digits
    name = ''.join(random.choice(chars) for _ in range(length))
    tld = random.choice(SUSPICIOUS_TLDS + [".com", ".net"])
    return name + tld


def generate_typosquat(legit_domain):
    """Generate a typosquatting variant of a legitimate domain."""
    base = legit_domain.split('.')[0]
    tld = '.' + '.'.join(legit_domain.split('.')[1:])
    techniques = [
        lambda b: b[:-1] + random.choice(string.ascii_lowercase),   # char swap
        lambda b: b + random.choice(string.ascii_lowercase),         # addition
        lambda b: b[:len(b)//2] + b[len(b)//2+1:] if len(b) > 3 else b,  # omission
        lambda b: b.replace('o', '0').replace('l', '1').replace('i', '1'),  # homoglyph
        lambda b: b[:2] + b[3] + b[2] + b[4:] if len(b) > 4 else b,       # transposition
        lambda b: b + '-' + random.choice(['secure', 'login', 'verify', 'update']),  # hyphenation
    ]
    mutated = random.choice(techniques)(base)
    new_tld = random.choice(SUSPICIOUS_TLDS + [tld]) if random.random() < 0.5 else tld
    return mutated + new_tld


def generate_phishing_domain():
    """Generate domains that look like phishing attempts."""
    targets = ["paypal", "google", "microsoft", "apple", "amazon", "sbi", "hdfc",
               "icici", "paytm", "netflix", "facebook", "instagram", "whatsapp"]
    target = random.choice(targets)
    patterns = [
        f"{target}-secure.{random.choice(['com','xyz','top','info'])}",
        f"{target}-login.{random.choice(['com','xyz','site','online'])}",
        f"{target}-verify.{random.choice(['com','club','link','work'])}",
        f"secure-{target}.{random.choice(['com','xyz','top'])}",
        f"{target}.account-update.{random.choice(['com','xyz'])}",
        f"{target}{random.randint(1,99)}.{random.choice(SUSPICIOUS_TLDS)}.com".replace(".", "."),
        f"{target}-support.{random.choice(['info','xyz','site'])}",
        f"login-{target}.{random.choice(['com','online','live'])}",
    ]
    return random.choice(patterns)


def build_dataset():
    """Build domain dataset with balanced labels."""
    domains = []

    # Legitimate domains (label 0)
    for d in LEGITIMATE_DOMAINS:
        domains.append((d, 0))

    # Extra legitimate: common subdomains
    for d in LEGITIMATE_DOMAINS[:40]:
        for sub in ["www", "mail", "app", "api", "m", "blog", "docs", "cdn", "static"]:
            domains.append((f"{sub}.{d}", 0))

    # More legitimate domain patterns
    legit_words = [
        "tech", "cloud", "data", "web", "soft", "net", "hub", "labs", "studio",
        "works", "digital", "media", "systems", "group", "global", "solutions",
        "agency", "design", "creative", "project", "service", "connect", "smart",
        "prime", "blue", "green", "fast", "next", "true", "open", "pure", "bright",
        "clear", "fresh", "nova", "urban", "metro", "elite", "core", "peak",
        "base", "link", "flow", "wave", "spark", "forge", "craft", "mind",
        "code", "byte", "pixel", "logic", "stack", "build", "ship", "grow",
    ]
    for _ in range(2000):
        w1 = random.choice(legit_words)
        w2 = random.choice(legit_words)
        tld = random.choice(LEGIT_TLDS)
        domain = f"{w1}{w2}{tld}"
        domains.append((domain, 0))

    # Additional legitimate short domains
    for _ in range(500):
        length = random.randint(4, 10)
        name = ''.join(random.choice(string.ascii_lowercase) for _ in range(length))
        tld = random.choice(LEGIT_TLDS)
        domains.append((name + tld, 0))

    # DGA domains (label 1)
    for _ in range(2000):
        domains.append((generate_dga_domain(), 1))

    # Typosquatting domains (label 1)
    for _ in range(1500):
        legit = random.choice(LEGITIMATE_DOMAINS)
        domains.append((generate_typosquat(legit), 1))

    # Phishing domains (label 1)
    for _ in range(1500):
        domains.append((generate_phishing_domain(), 1))

    return domains


# =====================================================================
# FEATURE EXTRACTION
# =====================================================================

def extract_features(domain):
    """Extract numerical features from a domain name."""
    # Remove subdomains for base analysis
    parts = domain.split('.')
    base = parts[0] if len(parts) <= 2 else '.'.join(parts[:-2])
    tld = '.' + '.'.join(parts[-2:]) if len(parts) > 2 else '.' + parts[-1]

    # Character analysis
    vowels = set('aeiou')
    consonants = set(string.ascii_lowercase) - vowels

    base_lower = base.lower()
    digit_count = sum(c.isdigit() for c in base_lower)
    alpha_count = sum(c.isalpha() for c in base_lower)
    special_count = sum(not c.isalnum() for c in base_lower)
    vowel_count = sum(c in vowels for c in base_lower)
    consonant_count = sum(c in consonants for c in base_lower)

    # Entropy of the domain name
    freq = Counter(base_lower)
    length = max(len(base_lower), 1)
    entropy = -sum((c / length) * math.log2(c / length) for c in freq.values()) if length > 0 else 0

    # Consecutive character analysis
    max_consecutive = 1
    current = 1
    for i in range(1, len(base_lower)):
        if base_lower[i] == base_lower[i-1]:
            current += 1
            max_consecutive = max(max_consecutive, current)
        else:
            current = 1

    # TLD suspiciousness
    suspicious_tld = 1 if tld in SUSPICIOUS_TLDS else 0

    # Contains brand-like keywords
    brand_keywords = ["login", "secure", "verify", "update", "account", "bank",
                      "support", "help", "service", "confirm", "alert"]
    has_brand_keyword = 1 if any(k in domain.lower() for k in brand_keywords) else 0

    # Hyphens in domain
    hyphen_count = base_lower.count('-')

    # Number of subdomains
    subdomain_count = max(0, len(parts) - 2)

    return {
        'length': len(domain),
        'base_length': len(base_lower),
        'digit_count': digit_count,
        'alpha_count': alpha_count,
        'special_count': special_count,
        'digit_ratio': digit_count / length,
        'vowel_ratio': vowel_count / max(alpha_count, 1),
        'consonant_ratio': consonant_count / max(alpha_count, 1),
        'entropy': entropy,
        'max_consecutive': max_consecutive,
        'suspicious_tld': suspicious_tld,
        'has_brand_keyword': has_brand_keyword,
        'hyphen_count': hyphen_count,
        'subdomain_count': subdomain_count,
        'has_digits': 1 if digit_count > 0 else 0,
        'unique_chars': len(set(base_lower)),
        'unique_ratio': len(set(base_lower)) / length,
    }


# =====================================================================
# TRAINING
# =====================================================================

def train():
    print("Generating domain dataset...")
    raw_data = build_dataset()
    random.shuffle(raw_data)

    domains = [d[0] for d in raw_data]
    labels = [d[1] for d in raw_data]

    malicious = sum(labels)
    legit = len(labels) - malicious
    print(f"[DATA] Total: {len(labels)} domains | Malicious: {malicious} | Legitimate: {legit}")

    # Extract features
    print("[FEATURES] Extracting 17 domain features...")
    features = [extract_features(d) for d in domains]
    df = pd.DataFrame(features)
    feature_cols = list(df.columns)

    X = df.values
    y = np.array(labels)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"[SPLIT] Train: {len(X_train)} | Test: {len(X_test)}")

    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('clf', RandomForestClassifier(
            n_estimators=100,
            max_depth=15,
            class_weight='balanced',
            random_state=42,
            n_jobs=-1
        ))
    ])

    print("[TRAIN] Training Random Forest classifier...")
    pipeline.fit(X_train, y_train)

    y_pred = pipeline.predict(X_test)
    print(f"\n[RESULTS] Test Set Performance:")
    print(classification_report(y_test, y_pred, target_names=['Legitimate', 'Malicious']))

    cm = confusion_matrix(y_test, y_pred)
    print(f"[MATRIX] Confusion Matrix:")
    print(f"  True Legit:    {cm[0][0]} | False Alarm: {cm[0][1]}")
    print(f"  Missed:        {cm[1][0]} | True Malicious: {cm[1][1]}")

    # Feature importance
    importances = pipeline.named_steps['clf'].feature_importances_
    top_features = sorted(zip(feature_cols, importances), key=lambda x: x[1], reverse=True)[:10]
    print(f"\n[TOP FEATURES]")
    for feat, imp in top_features:
        print(f"  {feat}: {imp:.4f}")

    # Save model and feature list
    joblib.dump(pipeline, MODEL_PATH)
    joblib.dump(feature_cols, os.path.join(os.path.dirname(__file__), "domain_features.joblib"))
    print(f"\n[SAVED] Model saved to {MODEL_PATH}")

    # Quick verification
    test_domains = [
        "google.com",
        "g00gle-login.xyz",
        "facebook.com",
        "faceb00k-verify.top",
        "xk3j8qnm2p5r.club",
        "sbi.co.in",
        "sbi-secure-login.info",
        "amazon.com",
    ]
    print("\n[TEST] Domain Verification:")
    for d in test_domains:
        feats = extract_features(d)
        feat_values = [feats[c] for c in feature_cols]
        proba = pipeline.predict_proba([feat_values])[0][1]
        risk = int(proba * 100)
        label = ">> MALICIOUS" if risk > 50 else "-- LEGIT"
        print(f"  {label} (Risk: {risk}%) -> {d}")

    return True


if __name__ == "__main__":
    train()
