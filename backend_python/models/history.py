"""
History model — saves chatbot messages and analysis runs per user.
Collection: user_history
"""
from datetime import datetime, timezone
from config.database import get_db


def save_chat_message(user_id: str, session_id: str, role: str, text: str):
    """Save a single chatbot message (user or bot) for a logged-in user, grouped by session_id."""
    db = get_db()
    if db is None or not user_id:
        return
        
    message_data = {
        "role": role,        # "user" | "bot"
        "text": text,
        "timestamp": datetime.now(timezone.utc)
    }
    
    # Upsert the session document. If it doesn't exist, it creates a new one with the first message.
    db.user_history.update_one(
        {"user_id": user_id, "session_id": session_id, "type": "chat"},
        {
            "$setOnInsert": {
                "created_at": datetime.now(timezone.utc)
            },
            "$push": {
                "messages": message_data
            }
        },
        upsert=True
    )


def save_analysis_history(user_id: str, query: str, category: str, report_text: str):
    """Save an analysis run for a logged-in user."""
    db = get_db()
    if db is None or not user_id:
        return
    db.user_history.insert_one({
        "user_id": user_id,
        "type": "analysis",
        "query": query,
        "category": category,
        "report_text": report_text,
        "created_at": datetime.now(timezone.utc)
    })


def get_user_history(user_id: str, limit: int = 100) -> list:
    """Return all history items for a user, newest first."""
    db = get_db()
    if db is None:
        return []
    docs = list(
        db.user_history
        .find({"user_id": user_id}, {"_id": 0})
        .sort("created_at", -1)
        .limit(limit)
    )
    # Convert datetime to ISO string for JSON serialisation
    for d in docs:
        if "created_at" in d:
            d["created_at"] = d["created_at"].isoformat()
        if "messages" in d:
            for m in d["messages"]:
                if "timestamp" in m:
                    m["timestamp"] = m["timestamp"].isoformat()
    return docs


def clear_user_history(user_id: str):
    db = get_db()
    if db is None:
        return
    db.user_history.delete_many({"user_id": user_id})
