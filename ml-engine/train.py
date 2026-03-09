import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from dataset_loader import load_data
import os

MODEL_PATH = "model.joblib"

def train():
    print("Fetching training data...")
    df = load_data()
    
    if df.empty or len(df) < 5:
        print("Not enough data to train. Please seed the database first.")
        return False
        
    print(f"Training on {len(df)} samples...")
    
    # Create a pipeline with TF-IDF and Logistic Regression
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(stop_words='english', lowercase=True)),
        ('clf', LogisticRegression())
    ])
    
    # Train the model
    pipeline.fit(df['text'], df['label'])
    
    # Save the model
    joblib.dump(pipeline, MODEL_PATH)
    print(f"Model successfully trained and saved to {MODEL_PATH}")
    return True

if __name__ == "__main__":
    train()
