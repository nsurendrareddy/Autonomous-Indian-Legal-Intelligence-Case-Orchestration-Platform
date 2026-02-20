import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv

load_dotenv()

from config.database import connect_db, close_db
from routes.analysis import router as analysis_router
from routes.chatbot import router as chatbot_router
from routes.lawyers import router as lawyers_router
from routes.legal_sections import router as legal_sections_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    connect_db()
    yield
    close_db()

app = FastAPI(
    title="LegalAssist API",
    description="AI-powered Legal Assistance for Indian Citizens",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(analysis_router, prefix="/api")
app.include_router(chatbot_router, prefix="/api")
app.include_router(lawyers_router, prefix="/api")
app.include_router(legal_sections_router, prefix="/api")

@app.get("/api/health")
async def health():
    return {"status": "ok", "message": "LegalAssist API is running"}

@app.get("/api/debug")
async def debug():
    """Debug endpoint — check env vars are loaded (safe: only shows key presence, not value)"""
    groq_key = os.getenv("GROQ_API_KEY", "")
    mongo_uri = os.getenv("MONGODB_URI", "")
    return {
        "groq_key_set": bool(groq_key) and len(groq_key) > 10,
        "groq_key_prefix": groq_key[:8] + "..." if groq_key else "NOT SET",
        "mongo_uri_set": bool(mongo_uri) and "mongodb" in mongo_uri,
        "port": os.getenv("PORT", "5000")
    }

@app.get("/")
async def root():
    return {
        "name": "LegalAssist API",
        "version": "1.0.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 5000))
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)
