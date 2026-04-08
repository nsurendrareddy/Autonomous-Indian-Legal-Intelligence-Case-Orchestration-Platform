from fastapi import APIRouter, Form, File, UploadFile, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional, List
from services.groq_service import analyze_legal_issue
from models.case import save_case
from models.lawyer import get_lawyers_by_specializations, get_top_lawyers, SPECIALIZATION_MAP
from models.history import save_analysis_history
from middleware.upload import save_upload
import re

router = APIRouter()
security = HTTPBearer(auto_error=False)


def _get_user_id(credentials) -> Optional[str]:
    if credentials is None:
        return None
    try:
        import os
        from jose import jwt
        payload = jwt.decode(credentials.credentials, os.getenv("SECRET_KEY", ""), algorithms=[os.getenv("ALGORITHM", "HS256")])
        return payload.get("sub")
    except Exception:
        return None



def detect_category(report_text: str) -> str:
    """Extract category from the text report for lawyer matching."""
    text_lower = report_text.lower()
    category_map = {
        "Consumer Rights": ["consumer", "product", "refund", "warranty", "ecommerce"],
        "Cyber Crime": ["cyber", "hacking", "phishing", "online fraud", "social media"],
        "Property Law": ["property", "land", "rent", "tenant", "landlord", "eviction"],
        "Criminal Law": ["criminal", "theft", "assault", "murder", "fraud", "cheating"],
        "Family Law": ["divorce", "marriage", "custody", "maintenance", "domestic"],
        "Employment Law": ["employment", "workplace", "salary", "termination", "labour"],
        "Financial Fraud": ["financial", "banking", "loan", "investment", "cheque", "upi"],
        "Civil Law": ["civil", "contract", "agreement", "dispute", "damages"],
    }
    for category, keywords in category_map.items():
        if any(kw in text_lower for kw in keywords):
            return category
    return "Civil Law"


@router.post("/analysis")
async def analyze(
    query: str = Form(...),
    images: List[UploadFile] = File(default=[]),
    imageContext: Optional[str] = Form(None),
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
):
    # Enforce max 2 images
    if len(images) > 2:
        raise HTTPException(status_code=400, detail="Maximum 2 images allowed per analysis.")
    if not query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    # Check API key up-front
    from services.groq_service import GROQ_API_KEY
    if not GROQ_API_KEY or GROQ_API_KEY == "your_groq_api_key_here":
        raise HTTPException(
            status_code=503,
            detail="Groq API key is not configured. Add GROQ_API_KEY to backend_python/.env and restart the server."
        )

    # AI analysis
    try:
        report_text = await analyze_legal_issue(query, imageContext)
    except Exception as e:
        err = str(e)
        if "401" in err:
            detail = "Invalid Groq API key (401 Unauthorized). Check GROQ_API_KEY in your .env file."
        elif "429" in err:
            detail = "Groq API rate limit reached. Please wait a moment and try again."
        elif "timeout" in err.lower():
            detail = "Groq API timed out. Please try again."
        else:
            detail = f"AI analysis failed: {err}"
        raise HTTPException(status_code=502, detail=detail)

    # Detect category from text for lawyer matching
    category = detect_category(report_text)

    # Find matching lawyers
    specializations = SPECIALIZATION_MAP.get(category, [category])
    lawyers = get_lawyers_by_specializations(specializations, limit=3)
    seen_names = {l["name"] for l in lawyers}
    if len(lawyers) < 3:
        top = get_top_lawyers(10)
        for l in top:
            if l["name"] not in seen_names and len(lawyers) < 3:
                lawyers.append(l)
                seen_names.add(l["name"])

    # Save uploaded images (up to 2)
    image_urls = []
    for img in images:
        if img and img.filename:
            url = await save_upload(img)
            image_urls.append(url)
    image_url = ",".join(image_urls) if image_urls else None

    # Save case to DB
    case_data = {
        "userQuery": query,
        "category": category,
        "reportText": report_text,
        "imageUrl": image_url
    }
    save_case(case_data)

    # Save to user history if logged in
    user_id = _get_user_id(credentials)
    if user_id:
        save_analysis_history(user_id, query, category, report_text)

    return {
        "analysis": {
            "reportText": report_text,
            "category": category
        },
        "recommendedLawyers": lawyers
    }


@router.get("/analysis/cases")
async def get_cases():
    from models.case import get_all_cases
    return get_all_cases()
