from config.database import get_db
from datetime import datetime

def save_case(case_data: dict) -> str:
    db = get_db()
    case_data["createdAt"] = datetime.utcnow()
    result = db.cases.insert_one(case_data)
    return str(result.inserted_id)

def get_all_cases() -> list:
    db = get_db()
    cases = list(db.cases.find({}, {"_id": 0}))
    return cases
