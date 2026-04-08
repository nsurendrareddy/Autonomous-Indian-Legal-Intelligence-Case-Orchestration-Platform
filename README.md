# ⚖️ LegalAI / LegalAssist

An AI-powered legal assistance platform designed for Indian citizens. This full-stack application provides legal analysis, an AI chatbot, a lawyer directory, legal section references, and an automated contact management system.

---

## ✨ Features
- **AI Case Analysis:** Advanced legal document and scenario analysis using the Groq API.
- **Legal Chatbot:** Instant AI-driven legal assistance and answers.
- **Directories:** Browse comprehensive legal sections and discover professional lawyers.
- **Voice Recognition:** Integrated speech-to-text functionality for user convenience and accessibility.
- **Authentication:** Secure user login, signup, and query history tracking.
- **Automated Support Workflow:** "Contact Us" feature seamlessly integrated with **n8n** for automatic email notifications and responses.

## 🛠 Tech Stack
### **Frontend**
- **Framework:** React 19 / Vite
- **Routing:** React Router DOM
- **Animations:** Framer Motion
- **Accessibility:** React Speech Recognition
- **HTTP Client:** Axios

### **Backend**
- **Framework:** Python 3 / FastAPI
- **Database:** MongoDB (PyMongo)
- **AI Engine:** Groq API
- **Authentication:** JWT (python-jose, passlib)

---

## 🚀 Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/major2.git
cd major2
```

### 2. Backend Setup
```bash
cd backend_python

# Create a virtual environment (optional but recommended)
python -m venv venv
# On Windows use: 
venv\Scripts\activate
# On Mac/Linux use: source venv/bin/activate 

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
# Note: Provide your valid MongoDB URI, Groq API key, and JWT Secret in a `.env` file!

# Run the FastAPI backend server
python app.py
```
*The backend API will run on `http://localhost:5000` or the port specified in settings.*

### 3. Frontend Setup
```bash
cd frontend

# Install Node.js dependencies
npm install

# Run the Vite development server
npm run dev
```

---

## 📧 Contact Us Serverless Automation (n8n)

The built-in *Contact Us* flow offloads email processing to an **n8n workflow**. This ensures the backend API remains lightweight and responsive, while reliable automation handles the communication.

### **How the Workflow Operates:**
1. **Webhook Trigger:** The React frontend makes a `POST` request to the n8n webhook URL at `/contact-us`.
2. **Data Preparation:** The payload (`name`, `email`, `subject`, `message`) is mapped to internal n8n values. It dynamically generates a unique transaction/support token (e.g., `LA-1729000000000`).
3. **Admin Notification:** An email alert is immediately generated and sent to the administrator notifying them of a new support ticket.
4. **Client Confirmation:** The user who filled out the form receives an automated acknowledgment email with their support token for future follow-up.
5. **Success Response:** The webhook node securely responds to the frontend with `{ "message": "Message sent successfully!" }`.

<details>
<summary><b>View n8n Workflow Details (JSON)</b></summary>
You can import this code directly into your n8n workspace to recreate the workflow:

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
      "position": [
        2608,
        -400
      ],
      "webhookId": "866002b2-e5ee-44f8-b7f1-42c318d6a9b6"
    },
    {
      "parameters": {
        "keepOnlySet": true,
        "values": {
          "string": [
            {
              "name": "name",
              "value": "={{$node[\"Webhook\"].json[\"body\"][\"name\"]}}"
            },
            {
              "name": "email",
              "value": "={{$node[\"Webhook\"].json[\"body\"][\"email\"]}}"
            },
            {
              "name": "subject",
              "value": "={{$node[\"Webhook\"].json[\"body\"][\"subject\"]}}"
            },
            {
              "name": "message",
              "value": "={{$node[\"Webhook\"].json[\"body\"][\"message\"]}}"
            },
            {
              "name": "token",
              "value": "=LA-{{$now.toMillis()}}"
            }
          ]
        },
        "options": {}
      },
      "id": "da624351-91d1-4e7d-a4a2-6106053adb7a",
      "name": "Prepare Data",
      "type": "n8n-nodes-base.set",
      "typeVersion": 2,
      "position": [
        2864,
        -400
      ]
    },
    {
      "parameters": {
        "fromEmail": "nsurendrareddy3@gmail.com",
        "toEmail": "nsurendrareddy3@gmail.com",
        "subject": "=New Contact: {{$json.subject}}",
        "text": "=Name: {{$json.name}}\\nEmail: {{$json.email}}\\n\\nSubject: {{$json.subject}}\\n\\nMessage:\\n{{$json.message}}\\n\\nToken: {{$json.token}}",
        "options": {}
      },
      "id": "9f9526e2-54aa-427f-a6e9-deea3999f0fc",
      "name": "Send Email Admin",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2,
      "position": [
        3120,
        -400
      ],
      "webhookId": "4e4cde60-df65-4843-a740-593a793a66ae",
      "credentials": {
        "smtp": {
          "id": "qKIuEYR4C2tHAqax",
          "name": "SMTP account"
        }
      }
    },
    {
      "parameters": {
        "fromEmail": "nsurendrareddy3@gmail.com",
        "toEmail": "={{$node[\"Webhook\"].json[\"body\"][\"email\"]}}",
        "subject": "=Your LegalAI Support Ticket {{$json.token}}",
        "text": "=Hello {{$node[\"Webhook\"].json[\"body\"][\"name\"]}},\\n\\nThank you for contacting LegalAI.\\n\\nYour support token is: LA-{{$now.toMillis()}}\\n\\nWe will contact you soon.\\n\\nRegards,\\nLegalAI Team",
        "options": {}
      },
      "id": "2b85f51d-2929-4da2-823b-4cc896461a85",
      "name": "Send Email Client",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2,
      "position": [
        3360,
        -400
      ],
      "webhookId": "72364727-2f14-4204-8f6f-d831ff5fd4e1",
      "credentials": {
        "smtp": {
          "id": "qKIuEYR4C2tHAqax",
          "name": "SMTP account"
        }
      }
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
      "position": [
        3616,
        -400
      ]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Prepare Data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Prepare Data": {
      "main": [
        [
          {
            "node": "Send Email Admin",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Send Email Admin": {
      "main": [
        [
          {
            "node": "Send Email Client",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Send Email Client": {
      "main": [
        [
          {
            "node": "Respond",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "9e3acf9ef5f05f3765e9ea62b3abc782634a5f2a8f6137f31988bd60c706f7c5"
  }
}
```
</details>

---

Site URL:

https://autonomous-indian-legal-intelligence-mmrc.onrender.com
