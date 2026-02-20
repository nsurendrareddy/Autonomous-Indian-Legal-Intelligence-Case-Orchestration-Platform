from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = None
db = None

def connect_db():
    global client, db
    try:
        mongo_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017/legalassist")
        client = MongoClient(mongo_uri)
        db = client.get_database()
        print(f"[OK] Connected to MongoDB: {db.name}")
        return db
    except Exception as e:
        print(f"[ERROR] MongoDB connection failed: {e}")
        raise

def close_db():
    global client
    if client:
        client.close()
        print("MongoDB connection closed.")

def get_db():
    return db
