from fastapi import APIRouter, Query
from typing import Optional
from models.legal_section import get_sections, get_categories

router = APIRouter()

@router.get("/legal-sections")
async def legal_sections(category: Optional[str] = Query(None)):
    return get_sections(category)

@router.get("/legal-sections/categories")
async def categories():
    return get_categories()
