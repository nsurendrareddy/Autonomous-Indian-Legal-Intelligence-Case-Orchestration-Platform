from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional
from models.history import get_user_history, clear_user_history
from routes.auth import get_current_user

router = APIRouter()


@router.get("/history")
async def history(current_user: dict = Depends(get_current_user)):
    """Return the chat + analysis history for the logged-in user."""
    items = get_user_history(current_user["id"])
    return {"history": items, "count": len(items)}


@router.delete("/history")
async def delete_history(current_user: dict = Depends(get_current_user)):
    """Clear all history for the logged-in user."""
    clear_user_history(current_user["id"])
    return {"message": "History cleared"}
