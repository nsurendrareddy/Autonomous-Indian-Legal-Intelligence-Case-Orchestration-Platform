from pydantic import BaseModel, EmailStr
from typing import Optional
import bcrypt
from config.database import get_db


# ── Pydantic Schemas ──────────────────────────────────────────────────────────

class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: str
    name: str
    email: str


# ── Password Helpers ──────────────────────────────────────────────────────────

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode('utf-8'), hashed.encode('utf-8'))


# ── DB Helpers ────────────────────────────────────────────────────────────────

def create_user(name: str, email: str, password: str) -> dict:
    db = get_db()
    hashed = hash_password(password)
    doc = {"name": name, "email": email.lower(), "password": hashed}
    result = db.users.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    return doc

def get_user_by_email(email: str) -> Optional[dict]:
    db = get_db()
    user = db.users.find_one({"email": email.lower()})
    if user:
        user["id"] = str(user["_id"])
    return user

def get_user_by_id(user_id: str) -> Optional[dict]:
    from bson import ObjectId
    db = get_db()
    try:
        user = db.users.find_one({"_id": ObjectId(user_id)})
        if user:
            user["id"] = str(user["_id"])
        return user
    except Exception:
        return None
