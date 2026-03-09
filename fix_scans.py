import pymongo

try:
    client = pymongo.MongoClient('mongodb://127.0.0.1:27017/trustlayer')
    db = client.get_default_database()
    
    user = db.users.find_one()
    if not user:
        print("No user found in database. Create a user first.")
    else:
        user_id = user['_id']
        result = db.scans.update_many(
            {'userId': {'$exists': False}},
            {'$set': {'userId': user_id}}
        )
        print(f"Updated {result.modified_count} scans with userId {user_id}")
        
    client.close()
except Exception as e:
    print(f"Error: {e}")
