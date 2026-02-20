from config.database import get_db
from datetime import datetime

def save_case(case_data: dict) -> str:
    db = get_db()
    if db is None:
        print("[WARNING] MongoDB not connected — skipping case save")
        return ""
    try:
        case_data["createdAt"] = datetime.utcnow()
        result = db.cases.insert_one(case_data)
        return str(result.inserted_id)
    except Exception as e:
        print(f"[WARNING] Failed to save case: {e}")
        return ""

def get_all_cases() -> list:
    db = get_db()
    if db is None:
        return []
    try:
        return list(db.cases.find({}, {"_id": 0}))
    except Exception as e:
        print(f"[WARNING] Failed to get cases: {e}")
        return []
