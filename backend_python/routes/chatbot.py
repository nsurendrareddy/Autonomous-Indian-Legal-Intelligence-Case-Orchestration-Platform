from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from services.groq_service import chat_with_groq

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    analysisContext: Optional[str] = None

@router.post("/chatbot")
async def chatbot(body: ChatRequest):
    if not body.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    response = await chat_with_groq(body.message, body.analysisContext)
    return {"response": response}
