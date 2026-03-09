import pymongo
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI environment variable not set. Security protocol requires explicitly defined connection strings.")

def load_data():
    """
    Loads scan data from MongoDB and returns a pandas DataFrame.
    """
    try:
        client = pymongo.MongoClient(MONGO_URI)
        db = client.get_default_database()
        scans = list(db["scans"].find({}, {"text": 1, "level": 1, "_id": 0}))
        
        if not scans:
            print("No data found in MongoDB.")
            return pd.DataFrame(columns=["text", "label"])
            
        df = pd.DataFrame(scans)
        # Map levels to binary labels: HIGH = 1 (Scam), LOW/MEDIUM = 0 (Safe)
        df["label"] = df["level"].apply(lambda x: 1 if x == "HIGH" else 0)
        return df[["text", "label"]]
    except Exception as e:
        print(f"Error loading data: {e}")
        return pd.DataFrame(columns=["text", "label"])

if __name__ == "__main__":
    df = load_data()
    print(df.head())
