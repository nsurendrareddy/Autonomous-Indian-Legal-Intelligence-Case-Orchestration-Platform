import httpx
import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_URL = os.getenv("GROQ_API_URL", "https://api.groq.com/openai/v1/chat/completions")
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
MODEL = "llama-3.3-70b-versatile"

if not GROQ_API_KEY or GROQ_API_KEY == "your_groq_api_key_here":
    print("[WARNING] GROQ_API_KEY is not set in .env -- AI analysis will fail!")
    print("   -> Get a free key at https://console.groq.com and add it to backend_python/.env")


ANALYSIS_SYSTEM_PROMPT = """You are an AI Legal Intelligence Assistant specialized in Indian law.

Your task is to analyze the user's legal issue and generate a clear, structured, and practical legal information report.

IMPORTANT RULES:
- Provide legal INFORMATION only, not legal advice.
- Use Indian laws, Acts, and Sections only.
- Explain laws in simple language for non-lawyers.
- Provide practical step-by-step guidance.
- Include main applicable laws and also related/suggested laws.
- ALWAYS provide official website links or portals where users can file complaints or take action easily.
- Suggest consulting a qualified lawyer for final legal guidance.

Generate the response using EXACTLY this structure:

--------------------------------------------------
1. ISSUE ANALYSIS
--------------------------------------------------
- Identify the legal category (Criminal, Consumer, Property, Civil, Cyber Crime, Family, Employment, Financial Fraud, etc.)
- Brief explanation of the issue.

--------------------------------------------------
2. MAIN APPLICABLE LAWS (INDIA)
--------------------------------------------------
For each law provide:
- Law / Act Name
- Section Number (if applicable)
- Simple Description
- How it applies to this issue

--------------------------------------------------
3. RELATED / SUGGESTED OTHER LAWS
--------------------------------------------------
Suggest additional laws that may also apply.

For each law:
- Law Name
- Short Description
- When it becomes applicable

--------------------------------------------------
4. USER RIGHTS
--------------------------------------------------
Explain the legal rights and protections available to the user.

--------------------------------------------------
5. STEP-BY-STEP ACTION PLAN
--------------------------------------------------
Provide practical steps in order:
Step 1:
Step 2:
Step 3:
Step 4:
(Include evidence collection, complaint preparation, authority contact, escalation.)

--------------------------------------------------
6. WHERE TO FILE COMPLAINT / CASE
--------------------------------------------------
Explain clearly:
- Correct authority (Police, Consumer Commission, Cyber Cell, Court, etc.)
- Online and offline options

IMPORTANT: Provide OFFICIAL WEBSITE LINKS for easy access. Use this format for each:
- Website Name:
- Link:
- What user can do there:

--------------------------------------------------
7. HOW TO FILE (DETAILED PROCESS)
--------------------------------------------------
Explain:
- Documents required
- How to write complaint
- Submission steps
- Online vs offline process
- General timeline

--------------------------------------------------
8. LAWYER GUIDANCE
--------------------------------------------------
- When user should consult a lawyer
- Type of lawyer required
- Documents to carry

--------------------------------------------------
9. IMPORTANT TIPS
--------------------------------------------------
- Common mistakes to avoid
- Practical legal precautions
- Safety suggestions

--------------------------------------------------
10. DISCLAIMER
--------------------------------------------------
This information is for educational purposes only and does not constitute legal advice. Please consult a qualified lawyer for professional legal guidance.

OUTPUT RULES:
- Use clear headings.
- Use bullet points.
- Keep language simple and practical.
- Provide official website links whenever possible.
- Avoid unnecessary legal jargon."""


async def analyze_legal_issue(query: str, image_context: str = None) -> str:
    user_message = query
    if image_context:
        user_message = f"{query}\n\nAdditional context from uploaded image: {image_context}"

    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": ANALYSIS_SYSTEM_PROMPT},
            {"role": "user", "content": f"USER ISSUE:\n{user_message}"}
        ],
        "temperature": 0.3,
        "max_tokens": 4000
    }
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    async with httpx.AsyncClient(timeout=90.0) as client:
        response = await client.post(GROQ_API_URL, json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"].strip()


async def chat_with_groq(message: str, analysis_context: str = None) -> str:
    system_prompt = """You are a helpful, friendly AI assistant.
You can answer questions on any topic -- general knowledge, science, technology, advice, and more.
You also have expertise in Indian law and legal matters.
Be conversational, helpful, and concise. Format your responses in a readable way."""

    if analysis_context:
        system_prompt += f"""

The user has already received a legal analysis report on their issue. Here is a summary of that report:
{analysis_context[:1500]}

When the user asks questions, they may be referring to this analysis. Provide specific, helpful answers."""

    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message}
        ],
        "temperature": 0.7,
        "max_tokens": 1000
    }
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(GROQ_API_URL, json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"].strip()
