from config.database import get_db

def get_sections(category: str = None) -> dict:
    db = get_db()
    query = {}
    if category:
        query["category"] = category
    sections = list(db.legal_sections.find(query, {"_id": 0}))
    grouped = {}
    for s in sections:
        cat = s.get("category", "General")
        grouped.setdefault(cat, []).append(s)
    return {"sections": sections, "grouped": grouped}

def get_categories() -> list:
    db = get_db()
    return db.legal_sections.distinct("category")
