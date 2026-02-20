from config.database import get_db

SPECIALIZATION_MAP = {
    "Consumer Rights": ["Consumer Law", "Civil Law"],
    "Property Law": ["Property Law", "Civil Law"],
    "Cyber Crime": ["Cyber Law", "Criminal Law"],
    "Criminal Law": ["Criminal Law"],
    "Family Law": ["Family Law"],
    "Labour Law": ["Labour Law"],
    "Civil Law": ["Civil Law"],
}

def get_lawyers_by_specializations(specializations: list, limit: int = 3) -> list:
    db = get_db()
    if db is None:
        return []
    try:
        return list(
            db.lawyers.find(
                {"specializations": {"$in": specializations}},
                {"_id": 0}
            ).sort("rating", -1).limit(limit)
        )
    except Exception as e:
        print(f"[WARNING] Failed to get lawyers by specialization: {e}")
        return []

def get_top_lawyers(limit: int = 10) -> list:
    db = get_db()
    if db is None:
        return []
    try:
        return list(
            db.lawyers.find({}, {"_id": 0}).sort("rating", -1).limit(limit)
        )
    except Exception as e:
        print(f"[WARNING] Failed to get top lawyers: {e}")
        return []

def get_lawyers_by_filter(specialization: str = None, limit: int = None) -> list:
    db = get_db()
    if db is None:
        return []
    try:
        query = {}
        if specialization:
            query["specializations"] = specialization
        cursor = db.lawyers.find(query, {"_id": 0}).sort("rating", -1)
        if limit:
            cursor = cursor.limit(limit)
        return list(cursor)
    except Exception as e:
        print(f"[WARNING] Failed to get lawyers by filter: {e}")
        return []
