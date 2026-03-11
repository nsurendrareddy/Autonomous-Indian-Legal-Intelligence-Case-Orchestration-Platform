from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional
from services.groq_service import chat_with_groq
from models.history import save_chat_message

router = APIRouter()
security = HTTPBearer(auto_error=False)

class ChatRequest(BaseModel):
    message: str
    sessionId: str
    analysisContext: Optional[str] = None

def _get_user_id(credentials: Optional[HTTPAuthorizationCredentials]) -> Optional[str]:
    """Extract user_id from JWT if present, else return None (unauthenticated is OK)."""
    if credentials is None:
        return None
    try:
        import os
        from jose import jwt
        SECRET_KEY = os.getenv("SECRET_KEY", "")
        ALGORITHM = os.getenv("ALGORITHM", "HS256")
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")
    except Exception:
        return None


@router.post("/chatbot")
async def chatbot(
    body: ChatRequest,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
):
    if not body.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    user_id = _get_user_id(credentials)

    # Save user message
    if user_id:
        save_chat_message(user_id, body.sessionId, "user", body.message.strip())

    response = await chat_with_groq(body.message, body.analysisContext)

    # Save bot response
    if user_id:
        save_chat_message(user_id, body.sessionId, "bot", response)

    return {"response": response}
