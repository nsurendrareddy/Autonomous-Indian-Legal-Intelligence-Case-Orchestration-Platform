<div align="center">

# ⚖️ LegalAssist AI

### AI-Powered Legal Guidance for Every Indian Citizen

![LegalAssist](https://img.shields.io/badge/LegalAssist-AI%20Legal%20Platform-6c63ff?style=for-the-badge&logo=scales&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-LLaMA%203.3%2070B-FF4B4B?style=for-the-badge&logo=openai&logoColor=white)

*Describe your legal issue in plain language — get instant, AI-powered legal guidance based on Indian law.*

[🚀 Live](https://autonomous-indian-legal-intelligence-mmrc.onrender.com/) [📖 API Docs](#api-documentation) &nbsp;|&nbsp; [🛠 Setup](#-local-setup--installation)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Project Structure](#-project-structure)
- [Local Setup & Installation](#-local-setup--installation)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Contact Us — n8n Workflow](#-contact-us--n8n-automation-workflow)
- [Deployment on Render](#-deployment-on-render)
- [Pages & Routes](#-pages--routes)
- [License](#-license)

---

## 📖 About the Project

**LegalAssist AI** was created to bridge the gap between ordinary Indian citizens and the complex legal system. Most people don't know their rights, where to file a complaint, or how to approach a legal problem — especially for everyday issues like consumer fraud, property disputes, or cyber crimes.

> 💡 *A user ordered from Swiggy, received the wrong item, and was told "we can't refund." After using the National Consumer Helpline (1800-11-4000), they filed a complaint and received a full refund within 12 days. Most people don't know where to escalate — LegalAssist guides you exactly there.*

This platform provides:
- **Instant legal analysis** powered by LLaMA 3.3 70B via the Groq API
- Precise citations of **Indian law** (IPC, BNS, CPC, Consumer Protection Act, IT Act, etc.)
- A step-by-step **action plan** for your specific situation
- **Lawyer recommendations** matched to your case category in Hyderabad
- A **floating AI chatbot** for follow-up questions after analysis

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Legal Analysis** | 10-section structured legal diagnostic report with IPC/BNS section citations, severity classification, and actionable steps |
| 🎤 **Voice Input** | Speak your legal issue directly — uses native Web Speech API (works on HTTPS/Render) |
| 🖼️ **Image Evidence Upload** | Attach up to **2 images** as visual evidence with your case description |
| 💬 **Floating AI Chatbot** | Context-aware legal assistant for follow-up questions, pre-loaded with your latest analysis report |
| 📚 **Legal Sections Browser** | Browse major Indian law sections with plain-language explanations |
| 👨‍⚖️ **Lawyer Directory** | Find specialized lawyers in Hyderabad, matched intelligently to your case category |
| 🔐 **User Authentication** | Register/Login with JWT-based auth; personal analysis history stored per user |
| 📜 **Analysis History** | View all your past legal analysis reports with full diagnostic details |
| 📧 **Contact Form** | Automated email workflow via n8n — sends you a support token and notifies the admin |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.x | UI Framework |
| **Vite** | 5.x | Build tool & dev server |
| **React Router DOM** | 7.x | Client-side routing |
| **Framer Motion** | 12.x | Animations & transitions |
| **Axios** | 1.x | HTTP client for API calls |
| **React Icons** | 5.x | Icon library |
| **Web Speech API** | Native | Voice input (browser built-in) |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **FastAPI** | Latest | REST API framework |
| **Python** | 3.10+ | Backend runtime |
| **Uvicorn** | Latest | ASGI server |
| **PyMongo** | Latest | MongoDB driver |
| **Groq API** | Latest | LLaMA 3.3 70B AI model |
| **python-jose** | Latest | JWT authentication |
| **passlib[bcrypt]** | Latest | Password hashing |
| **aiofiles** | Latest | Async file upload handling |
| **python-dotenv** | Latest | Environment variable management |

### Infrastructure & Services
| Service | Purpose |
|---|---|
| **MongoDB Atlas** | Cloud database for users, cases, lawyers, history |
| **Groq Cloud** | AI inference (LLaMA 3.3 70B Versatile) |
| **Render** | Deployment (frontend as static site + backend as web service) |
| **n8n** | Contact form automation workflow — email routing |

---

## 📁 Project Structure

```
major2/
├── render.yaml                    # Render deployment configuration + HTTP headers
├── .gitignore                     # Git ignore rules
├── README.md                      # This file
│
├── frontend/                      # React + Vite application
│   ├── public/
│   │   ├── _redirects             # SPA routing for Render static hosting
│   │   └── _headers               # HTTP security & permissions headers
│   ├── src/
│   │   ├── main.jsx               # React entry point
│   │   ├── App.jsx                # Root component with router & auth provider
│   │   ├── index.css              # Global design system (CSS variables, utilities)
│   │   ├── components/
│   │   │   ├── Navbar.jsx/css     # Top navigation bar with auth state
│   │   │   ├── InputBox.jsx/css   # Analysis input with voice & image upload
│   │   │   ├── FloatingChatbot.jsx/css  # Persistent AI chat widget
│   │   │   ├── LegalSteps.jsx/css # Renders the 10-section analysis report
│   │   │   ├── LawyerCard.jsx/css # Lawyer profile card component
│   │   │   └── CursorAnimation.jsx/css # Custom cursor effect
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Global authentication state (login/logout/user)
│   │   └── pages/
│   │       ├── Home.jsx/css       # Landing page with features & use cases
│   │       ├── Analysis.jsx/css   # AI legal analysis page (main feature)
│   │       ├── Laws.jsx/css       # Indian law sections browser
│   │       ├── Lawyers.jsx/css    # Lawyer directory with search & filter
│   │       ├── History.jsx/css    # User's past analysis reports
│   │       ├── About.jsx/css      # About the platform
│   │       ├── Contact.jsx/css    # Contact form (n8n webhook)
│   │       ├── Login.jsx          # Login page
│   │       └── Register.jsx       # Registration page
│   ├── package.json
│   └── vite.config.js
│
└── backend_python/                # FastAPI Python backend
    ├── app.py                     # Main application entry point
    ├── requirements.txt           # Python dependencies
    ├── .env                       # Environment variables (NOT committed to Git)
    ├── .gitignore
    ├── seed_db.py                 # One-time script to populate MongoDB with sample data
    ├── config/
    │   └── database.py            # MongoDB connection manager
    ├── middleware/
    │   └── upload.py              # Async image upload handler (saves to /uploads)
    ├── models/
    │   ├── user.py                # User model (register, login, verify password)
    │   ├── case.py                # Case model (save & retrieve legal cases)
    │   ├── history.py             # Analysis history model (per-user)
    │   ├── lawyer.py              # Lawyer model + specialization matching logic
    │   └── legal_section.py       # Legal section model
    ├── routes/
    │   ├── analysis.py            # POST /api/analysis — main AI analysis endpoint
    │   ├── auth.py                # POST /api/auth/register, /login, GET /me
    │   ├── chatbot.py             # POST /api/chat — AI chatbot endpoint
    │   ├── history.py             # GET /api/history — user analysis history
    │   ├── lawyers.py             # GET /api/lawyers — lawyer directory
    │   └── legal_sections.py      # GET /api/legal-sections — laws browser
    ├── services/
    │   └── groq_service.py        # Groq API integration (LLaMA 3.3 70B)
    └── uploads/                   # Uploaded image evidence (not committed to Git)
```

---

## 🚀 Local Setup & Installation

### Prerequisites

- **Node.js** ≥ 18.x and **npm** ≥ 9.x
- **Python** ≥ 3.10
- A **MongoDB Atlas** account (free tier works) — or local MongoDB
- A **Groq API key** — get one free at [console.groq.com](https://console.groq.com)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/yourusername/major2.git
cd major2
```

### Step 2 — Backend Setup

```bash
cd backend_python

# (Recommended) Create a virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install all Python dependencies
pip install -r requirements.txt
```

Create your `.env` file inside `backend_python/`:

```bash
# backend_python/.env
GROQ_API_KEY=your_groq_api_key_here
GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/legalassist?retryWrites=true&w=majority
PORT=5000
SECRET_KEY=your_random_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

(Optional) Seed the database with sample lawyers and legal sections:

```bash
python seed_db.py
```

Start the backend server:

```bash
python app.py
# Server starts at http://localhost:5000
# API docs available at http://localhost:5000/docs
```

### Step 3 — Frontend Setup

Open a **new terminal** in the project root:

```bash
cd frontend

# Install Node.js dependencies
npm install
```

Create a `.env` file inside `frontend/`:

```bash
# frontend/.env
VITE_API_URL=http://localhost:5000
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/contact-us
```

Start the frontend dev server:

```bash
npm run dev
# App runs at http://localhost:3000
```

---

## 🔑 Environment Variables

### Backend (`backend_python/.env`)

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | ✅ Yes | Your Groq API key for LLaMA model access |
| `GROQ_API_URL` | ✅ Yes | Groq API endpoint (default: `https://api.groq.com/openai/v1/chat/completions`) |
| `MONGODB_URI` | ✅ Yes | MongoDB Atlas connection string |
| `PORT` | No | Server port (default: `5000`) |
| `SECRET_KEY` | ✅ Yes | Random string for JWT signing (keep secret!) |
| `ALGORITHM` | No | JWT algorithm (default: `HS256`) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No | JWT expiry in minutes (default: `1440` = 24 hours) |

### Frontend (`frontend/.env`)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | ✅ Yes | Backend API base URL (e.g. `https://your-backend.onrender.com`) |
| `VITE_N8N_WEBHOOK_URL` | ✅ Yes | Your n8n webhook URL for the Contact Us form |

> ⚠️ **Never commit `.env` files to Git.** Both are already listed in `.gitignore`.

---

## 📡 API Documentation

The backend automatically generates interactive API docs at:
- **Swagger UI:** `http://localhost:5000/docs`
- **ReDoc:** `http://localhost:5000/redoc`

### Key Endpoints

#### AI Analysis
```http
POST /api/analysis
Content-Type: multipart/form-data

Fields:
  query      (string, required)  — Description of the legal issue
  images     (file[], optional)  — Up to 2 image files as evidence
  imageContext (string, optional) — Additional image description
```

**Response:**
```json
{
  "analysis": {
    "reportText": "## 1. ISSUE ANALYSIS...",
    "category": "Consumer Rights"
  },
  "recommendedLawyers": [
    { "name": "Adv. Priya Sharma", "specialization": "Consumer Law", ... }
  ]
}
```

#### Authentication
```http
POST   /api/auth/register    — Create a new account
POST   /api/auth/login       — Login and receive JWT token
GET    /api/auth/me          — Get current user (requires Bearer token)
```

#### Other Endpoints
```http
POST   /api/chat             — AI chatbot message (with optional analysis context)
GET    /api/lawyers          — List all lawyers
GET    /api/legal-sections   — List all legal sections
GET    /api/history          — Current user's analysis history (requires auth)
GET    /api/health           — Health check
GET    /api/debug            — Debug endpoint (shows env var status, no values)
```

---

## 📧 Contact Us — n8n Automation Workflow

The Contact Us form uses **n8n** as a serverless automation layer instead of handling email in the backend. This keeps the API lightweight and email delivery reliable.

### Workflow Flow

```
User submits form → n8n Webhook → Prepare Data → Send Email (Admin) → Send Email (Client) → Respond OK
```

1. **Webhook Trigger** — React frontend POSTs `{ name, email, subject, message }` to the n8n webhook
2. **Prepare Data** — Extracts fields and generates a unique support token: `LA-{timestamp}`
3. **Admin Email** — Sends a full notification email to `nsurendrareddy3@gmail.com` with the inquiry details
4. **Client Confirmation** — Sends an automated acknowledgment to the user's email with their support token
5. **Webhook Response** — Returns `{ "message": "Message sent successfully!" }` to the frontend

### Setting Up n8n

1. Install n8n locally: `npx n8n` or use [n8n Cloud](https://n8n.io)
2. Import the workflow JSON below into your n8n workspace
3. Configure an **SMTP credential** in n8n with your Gmail/SMTP settings
4. Copy the production webhook URL and set it as `VITE_N8N_WEBHOOK_URL` in your frontend environment

<details>
<summary><b>📋 Click to expand — n8n Workflow JSON (import this into n8n)</b></summary>

```json
{
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "contact-us",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "70215fb6-b9db-45ca-a438-a3d3ba2d364f",
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [2608, -400],
      "webhookId": "866002b2-e5ee-44f8-b7f1-42c318d6a9b6"
    },
    {
      "parameters": {
        "keepOnlySet": true,
        "values": {
          "string": [
            { "name": "name",    "value": "={{$node[\"Webhook\"].json[\"body\"][\"name\"]}}"    },
            { "name": "email",   "value": "={{$node[\"Webhook\"].json[\"body\"][\"email\"]}}"   },
            { "name": "subject", "value": "={{$node[\"Webhook\"].json[\"body\"][\"subject\"]}}" },
            { "name": "message", "value": "={{$node[\"Webhook\"].json[\"body\"][\"message\"]}}" },
            { "name": "token",   "value": "=LA-{{$now.toMillis()}}"                            }
          ]
        },
        "options": {}
      },
      "id": "da624351-91d1-4e7d-a4a2-6106053adb7a",
      "name": "Prepare Data",
      "type": "n8n-nodes-base.set",
      "typeVersion": 2,
      "position": [2864, -400]
    },
    {
      "parameters": {
        "fromEmail": "nsurendrareddy3@gmail.com",
        "toEmail": "nsurendrareddy3@gmail.com",
        "subject": "=New Contact: {{$json.subject}}",
        "text": "=Name: {{$json.name}}\nEmail: {{$json.email}}\n\nSubject: {{$json.subject}}\n\nMessage:\n{{$json.message}}\n\nToken: {{$json.token}}",
        "options": {}
      },
      "id": "9f9526e2-54aa-427f-a6e9-deea3999f0fc",
      "name": "Send Email Admin",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2,
      "position": [3120, -400]
    },
    {
      "parameters": {
        "fromEmail": "nsurendrareddy3@gmail.com",
        "toEmail": "={{$node[\"Webhook\"].json[\"body\"][\"email\"]}}",
        "subject": "=Your LegalAI Support Ticket {{$json.token}}",
        "text": "=Hello {{$node[\"Webhook\"].json[\"body\"][\"name\"]}},\n\nThank you for contacting LegalAI.\n\nYour support token is: LA-{{$now.toMillis()}}\n\nWe will contact you soon.\n\nRegards,\nLegalAI Team",
        "options": {}
      },
      "id": "2b85f51d-2929-4da2-823b-4cc896461a85",
      "name": "Send Email Client",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2,
      "position": [3360, -400]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ { \"message\": \"Message sent successfully!\" } }}",
        "options": {}
      },
      "id": "e31c9f88-c245-4027-9a73-5f9bc16b6a2c",
      "name": "Respond",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [3616, -400]
    }
  ],
  "connections": {
    "Webhook":        { "main": [[{ "node": "Prepare Data",      "type": "main", "index": 0 }]] },
    "Prepare Data":   { "main": [[{ "node": "Send Email Admin",  "type": "main", "index": 0 }]] },
    "Send Email Admin": { "main": [[{ "node": "Send Email Client","type": "main", "index": 0 }]] },
    "Send Email Client": { "main": [[{ "node": "Respond",         "type": "main", "index": 0 }]] }
  }
}
```
</details>

---

## ☁️ Deployment on Render

This project includes a `render.yaml` at the root which configures the frontend static site deployment automatically.

### Frontend (Static Site)

1. Push your code to GitHub
2. In **Render Dashboard** → **New** → **Static Site**
3. Connect your GitHub repository
4. Set these settings:
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `./frontend/dist`
5. Add environment variables:
   - `VITE_API_URL` → your backend Render URL
   - `VITE_N8N_WEBHOOK_URL` → your n8n production webhook URL

### Backend (Web Service)

1. In **Render Dashboard** → **New** → **Web Service**
2. Connect your GitHub repository
3. Set these settings:
   - **Root Directory:** `backend_python`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python app.py`
4. Add all backend environment variables (see [Environment Variables](#-environment-variables))

### Important: Microphone / Voice Input on Render

The `render.yaml` and `public/_headers` files configure the required HTTP headers so voice input works correctly:

```
Permissions-Policy: microphone=(self)
Feature-Policy: microphone 'self'
```

> ⚠️ Without these headers, browsers block microphone access on deployed sites. These files are already included in the project.

---

## 🗺️ Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page with features, use cases, and CTAs |
| `/analysis` | AI Analysis | Main feature — describe issue, upload images, get legal report |
| `/laws` | Legal Sections | Browse Indian law sections with plain-language explanations |
| `/lawyers` | Lawyers | Find and filter specialized lawyers in Hyderabad |
| `/history` | History | View your past legal analysis reports (login required) |
| `/about` | About | About the platform and its mission |
| `/contact` | Contact | Contact form (powered by n8n automation) |
| `/login` | Login | User login with JWT authentication |
| `/register` | Register | New user registration |

---

## 🤖 AI Analysis — How It Works

When you submit a legal issue, the system:

1. **Validates the query** — checks it is related to Indian law using keyword heuristics
2. **Calls Groq API** — sends the query to LLaMA 3.3 70B with a detailed system prompt that mandates a structured legal report
3. **Generates a 10-section report** covering:
   - Issue Analysis & Legal Classification
   - Main Applicable Laws (IPC/BNS with exact sections)
   - Related / Secondary Laws
   - Your Demonstrable Rights
   - Step-by-Step Strategic Action Plan
   - Where to File the Complaint
   - How to File (Detailed Procedural Breakdown)
   - Advocate Guidance
   - Legal Pitfalls & Warnings
   - Disclaimer
4. **Matches lawyers** — detects case category and finds up to 3 specialized lawyers
5. **Saves to history** — if you're logged in, permanently stores the report to your account

---

## 🔒 Security Notes

- Passwords are hashed with **bcrypt** (via passlib)
- Authentication uses **JWT tokens** (HS256, 24-hour expiry)
- Uploaded images are stored server-side only; URLs are not publicly guessable
- CORS is configured to allow all origins (suitable for development; restrict in strict production environments)
- The `.env` file is in `.gitignore` — **never commit API keys or secrets**

---

<div align="center">

Built with ❤️ for Indian Citizens &nbsp;|&nbsp; Hyderabad, Telangana, India 🇮🇳

</div>
