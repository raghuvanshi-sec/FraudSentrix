import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    # Fail closed for security audit satisfaction
    raise ValueError("MONGO_URI not configured in .env")
client = pymongo.MongoClient(MONGO_URI)
db = client.get_default_database()
scans_col = db["scans"]

seed_data = [
    # SCAM EXAMPLES
    {"type": "text", "text": "URGENT: Your bank account has been locked. Verify now at http://bit.ly/fake-bank", "level": "HIGH", "riskScore": 95},
    {"type": "text", "text": "Congratulations! You won a $1000 gift card. Click here to claim your prize.", "level": "HIGH", "riskScore": 85},
    {"type": "audio", "text": "This is the IRS. You have an unpaid tax bill. Pay immediately via gift cards or face arrest.", "level": "HIGH", "riskScore": 98},
    {"type": "text", "text": "Your Amazon account has a suspicious login. Click verify to secure.", "level": "HIGH", "riskScore": 75},
    {"type": "audio", "text": "Hello, this is officer Miller from the police department. Your relative is in jail and needs bail money immediately.", "level": "HIGH", "riskScore": 90},
    
    # SAFE EXAMPLES
    {"type": "text", "text": "Hey, are we still meeting for lunch today at 12?", "level": "LOW", "riskScore": 5},
    {"type": "text", "text": "Your order from ShopSite has been shipped. Track here: http://shopsite.com/track", "level": "LOW", "riskScore": 10},
    {"type": "audio", "text": "Hi Mom, just calling to say I love you. Talk soon!", "level": "LOW", "riskScore": 2},
    {"type": "text", "text": "Don't forget the milk on your way home.", "level": "LOW", "riskScore": 0},
    {"type": "audio", "text": "Please leave a message after the beep. Thank you.", "level": "LOW", "riskScore": 5}
]

def generate_hash(data):
    payload = json.dumps(data, sort_keys=True)
    return hashlib.sha256(payload.encode()).hexdigest()

def seed():
    print("Seeding database with ML training data...")
    count = 0
    for item in seed_data:
        item["createdAt"] = datetime.datetime.utcnow()
        item["updatedAt"] = datetime.datetime.utcnow()
        # Add a dummy userId if needed, or leave for global training
        # For seeding, we'll just ensure they don't have a hash conflict if we run multiple times
        item["hash"] = generate_hash({k: item[k] for k in ["type", "text"]})
        
        try:
            scans_col.update_one({"hash": item["hash"]}, {"$set": item}, upsert=True)
            count += 1
        except Exception as e:
            print(f"Error seeding item: {e}")
    
    print(f"Successfully seeded {count} items.")

if __name__ == "__main__":
    seed()
