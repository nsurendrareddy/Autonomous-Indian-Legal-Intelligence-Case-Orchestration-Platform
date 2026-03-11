from fastapi import APIRouter, Query
from typing import Optional
from models.lawyer import get_top_lawyers, get_lawyers_by_filter

router = APIRouter()

@router.get("/lawyers/top")
async def top_lawyers():
    return get_top_lawyers(50)

@router.get("/lawyers")
async def lawyers(specialization: Optional[str] = Query(None), limit: Optional[int] = Query(None)):
    return get_lawyers_by_filter(specialization, limit)
