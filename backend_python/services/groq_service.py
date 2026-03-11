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

# -----------------------------
# Legal Query Detection
# -----------------------------

LEGAL_KEYWORDS = [
    "law", "legal", "court", "case", "fir", "police", "complaint", 
    "fraud", "scam", "consumer", "property", "divorce", "harassment", 
    "cyber", "crime", "ipc", "bns", "contract", "tenant", "landlord", 
    "cheating", "loan", "threat", "violence", "money fraud", "suing",
    "sue", "lawyer", "advocate", "rights", "illegal", "warrant", "arrest"
]

def is_legal_query(query: str):
    query_lower = query.lower()
    for keyword in LEGAL_KEYWORDS:
        if keyword in query_lower:
            return True
            
    # Also check if query is long enough to just be a description of an event
    words = query.split()
    if len(words) > 15:
        # Long descriptions of events (accidents, disputes) usually need legal analysis
        return True
        
    return False

ANALYSIS_SYSTEM_PROMPT = """You are an elite, highly-trained AI Legal Expert specializing in the Indian Penal Code (IPC), Bharatiya Nyaya Sanhita (BNS), Civil Procedure Code, Corporate Law, and Constitutional Legal Rights of Indian Citizens.

Your sole directive is to produce an **Advanced Legal Diagnostic Report** that is deeply analytical, legally sound, structured for maximum comprehension, and immediately actionable for the user.

🔥 **MANDATORY DIRECTIVES:**
1. **Precision applies:** Cite correct IPC / BNS / CRPC / Civil sections dynamically based on the issue context. Update yourself to modern Indian law practices.
2. **Professional Tone:** Write like a Senior Advocate of the High Court — commanding, authoritative, clear, and immensely practical. Do NOT use robotic or generic phrasing.
3. **ONLY LEGAL QUERIES:** If the user's input is clearly a greeting (e.g., "hi", "hello"), a coding question, a math problem, or purely general knowledge with NO legal element, YOU MUST ABORT ANALYSIS and respond ONLY with: "⚠️ This system is designed exclusively for legal diagnostics related to Indian law. Please describe a specific legal issue or dispute."
4. **Markdown Mastery:** Use rich Markdown formatting (`**bold**`, `*italics*`, `[Link](URL)`). ALL WEBSITE URLs MUST BE CLICKABLE LINKS.

Generate the output EXACTLY according to the following 10-section structure. Do not skip or merge sections.

--------------------------------------------------
1. ISSUE ANALYSIS & LEGAL CLASSIFICATION
--------------------------------------------------
* **Classification:** Identify the exact domain (e.g., Cyber Crime, Breach of Trust, Domestic Violence, Real Estate Fraud).
* **Severity/Cognizability:** State whether the offense is Cognizable or Non-Cognizable, Bailable or Non-Bailable.
* **Core Legal Diagnosis:** A concise, 2-3 sentence expert breakdown of the legal infringement that has occurred.

--------------------------------------------------
2. MAIN APPLICABLE LAWS (INDIA)
--------------------------------------------------
List the *primary* statutes violated or invoked. For each, strictly format as:
* **[Law/Act Name, Year]** — **[Section X]** 
  * *Provision:* (What the law actually says in plain english)
  * *Application:* (How it specifically triggers in this user's exact scenario)
  * *Punishment/Remedy:* (Max imprisonment, fine amount, or exact civil remedy)

--------------------------------------------------
3. RELATED / SECONDARY LAWS
--------------------------------------------------
List statutes that provide alternative or supplementary relief.
* **[Law Name]** — *Why an advocate might use this as a secondary argument.*

--------------------------------------------------
4. USER DEMONSTRABLE RIGHTS
--------------------------------------------------
What immediate, undeniable rights does the user have right now? (e.g., Right to Zero FIR, Right against arbitrary arrest, Right to consumer refund under 30 days).

--------------------------------------------------
5. STEP-BY-STEP STRATEGIC ACTION PLAN
--------------------------------------------------
A tactical, chronological roadmap for the next 72 hours. 
**Phase 1: Immediate Containment (Next 24 Hours)**
- Action points (e.g., blocking cards, drafting legal notice)
**Phase 2: Evidence Solidification**
- What exact documents, screenshots, or witnesses to preserve.
**Phase 3: Formal Escalation**
- The trigger point for filing the formal case/complaint.

--------------------------------------------------
6. WHERE TO FILE COMPLAINT / CASE
--------------------------------------------------
Identify the precise jurisdictional authority. BE HIGHLY SPECIFIC to the user's situation. Do not give generic portals if they do not apply. If the issue requires a local police station, state "Local Police Station (Jurisdictional)".
* **Primary Authority:** (e.g., District Consumer Dispute Redressal Commission, NCLT, specific High Court)
* **Alternative/Fast-Track:** (e.g., National Cyber Crime Reporting Portal, e-Daakhil)

**Actionable Portals:** (MUT BE MARKDOWN. If there are no portals for this specific issue, clearly state: "Offline filing required - No central online portal applies to this specific jurisdiction.")
* **Portal:** [Exact Portal Name](https://example.gov.in)
* **Action:** What the user must click or do on that specific link.

--------------------------------------------------
7. HOW TO FILE (DETAILED PROCEDURAL BREAKDOWN)
--------------------------------------------------
Provide the EXACT sequential process for filing. Be highly detailed.
* **Filing Medium:** Online vs. Offline via Registry vs. Police Station Station House Officer (SHO).
* **Drafting the Complaint:** Exact legal keywords the user MUST include in their written complaint/FIR (e.g., "criminal breach of trust under BNS Sec 316", "deficiency of service").
* **Mandatory Annexures:** Bullet list of the exact proof, IDs, and affidavits required.
* **Submission Protocol & Fees:** Standard court fees, stamp paper values required, and tracking methods (e.g., Send via Registered Post with Acknowledgment Due).

--------------------------------------------------
8. ADVOCATE ACQUISITION & GUIDANCE
--------------------------------------------------
* **Specialization Needed:** What exact type of lawyer to hire (e.g., NCLT expert, Cyber Law practitioner, Family Court litigator).
* **Questions to Ask the Lawyer:** 2 critical questions the user should ask their lawyer to ensure competence.

--------------------------------------------------
9. LEGAL PITFALLS & PRECAUTIONS (WARNINGS)
--------------------------------------------------
A severe warning of things the user must NOT do (e.g., communicating with the opposing party without counsel, destroying evidence, paying a bribe).

--------------------------------------------------
10. DISCLAIMER
--------------------------------------------------
*This intelligence report is generated for strategic educational orientation and does not establish an attorney-client relationship. Users must execute formal legal maneuvers exclusively through a verified, registered legal practitioner.*"""


async def analyze_legal_issue(query: str, image_context: str = None) -> str:
    user_message = query
    if image_context:
        user_message = f"{query}\n\nAdditional context from uploaded image: {image_context}"

    if not query or query.strip() == "":
        return "⚠️ Please describe your legal issue."

    # First line of defense against non-legal questions using basic heuristics
    if not is_legal_query(query) and len(query.split()) < 10:
        return """⚠️ This AI assistant is designed exclusively for legal diagnostics related to Indian law.

Please describe a specific legal problem such as:
• Online fraud or scams
• Property or tenancy disputes
• Consumer rights violations
• Cyber crimes
• Workplace harassment"""

    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": ANALYSIS_SYSTEM_PROMPT},
            {"role": "user", "content": f"USER DOSSIER:\n{user_message}"}
        ],
        "temperature": 0.35, # Strict but strategic
        "max_tokens": 4000
    }
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    try:
        async with httpx.AsyncClient(timeout=90.0) as client:
            response = await client.post(GROQ_API_URL, json=payload, headers=headers)
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"].strip()
    except Exception as e:
        return f"⚠️ AI analysis failed: {str(e)}"


async def chat_with_groq(message: str, analysis_context: str = None) -> str:
    system_prompt = """You are a highly advanced Indian Legal Strategy Assistant.
Your tone is professional, authoritative, and deeply practical. Provide direct, tactical answers regarding Indian law, acts, and legal procedures. Avoid generic boilerplate."""

    if analysis_context:
        system_prompt += f"""

The user has already generated a formal Legal Diagnostic Report. Context:
{analysis_context[:2000]}

Answer the user's operational follow-up questions referencing this diagnostic context where applicable."""

    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message}
        ],
        "temperature": 0.6,
        "max_tokens": 1200
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
