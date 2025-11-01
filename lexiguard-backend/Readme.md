# ⚙️ LexiGuard Backend

The **LexiGuard Backend** is a powerful FastAPI-based REST API that powers the LexiGuard legal document analysis platform. It leverages Google's Gemini AI for intelligent contract analysis, Cloud DLP for PII redaction, and Cloud Firestore for persistent storage.

---

## 🌟 Features

### Core Capabilities
- **📄 Document Processing** - Supports PDF, DOCX, and plain text formats
- **🤖 AI-Powered Analysis** - Uses Google Gemini 2.5 Flash for contract analysis
- **🛡️ PII Redaction** - Automatic removal of 7+ types of sensitive information
- **💬 Context-Aware Chat** - Conversational Q&A about legal documents
- **✉️ Email Generation** - Professional negotiation emails and PDF reports
- **📊 Two Analysis Modes**:
  - **Standard**: Quick overview with risk summary
  - **Detailed**: Comprehensive clause-by-clause breakdown
- **🔒 Privacy-First Design** - Only stores redacted content in Firestore

### Advanced Features
- **🌐 Multi-Language Support** - Translate documents and analyses (Google Translate API)
- **📧 Gmail Integration** - Send PDF reports via SMTP
- **🔐 Firebase Authentication** - Token verification support
- **⚡ Async Processing** - Background job processing with Cloud Pub/Sub

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | FastAPI 0.104.1 |
| **Server** | Uvicorn (ASGI) |
| **AI/ML** | Google Gemini 2.5 Flash |
| **Security** | Google Cloud DLP (PII Redaction) |
| **Database** | Cloud Firestore |
| **Storage** | Google Cloud Storage |
| **Translation** | Google Cloud Translate API |
| **Email** | Gmail SMTP, ReportLab (PDF) |
| **Auth** | Firebase Admin SDK |

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.11+** (check with `python --version`)
- **Google Cloud Account** with billing enabled
- **Google API Keys**:
  - Gemini API Key ([Get here](https://makersuite.google.com/app/apikey))
  - Service Account JSON (for DLP, Firestore, etc.)
- **Gmail App Password** (for email features)

### Installation

1. **Navigate to backend directory**
   ```bash
   cd lexiguard-backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv .venv
   ```

3. **Activate virtual environment**
   
   **Windows:**
   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```
   
   **Linux/Mac:**
   ```bash
   source .venv/bin/activate
   ```
   
   > **Note**: If you get an execution policy error on Windows:
   > ```powershell
   > Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   > ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables** (see next section)

6. **Start the server**
   ```bash
   python main.py
   ```
   
   Or using uvicorn directly:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

7. **Access the API**
   
   Open your browser: **http://localhost:8000/docs**

---

## 🔑 Environment Configuration

### Step 1: Create `.env` File

Create a `.env` file in the `lexiguard-backend` directory:

```env
# ===== GOOGLE AI CONFIGURATION =====
# Get your API key from: https://makersuite.google.com/app/apikey
GOOGLE_API_KEY=your_gemini_api_key_here

# ===== GOOGLE CLOUD CONFIGURATION =====
# Your Google Cloud Project ID
GOOGLE_CLOUD_PROJECT=your_gcp_project_id

# Path to Service Account JSON file (for DLP, Firestore, Translation)
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json

# ===== STORAGE CONFIGURATION =====
# Google Cloud Storage bucket name (for document storage)
GCS_BUCKET_NAME=lexiguard-documents

# ===== EMAIL CONFIGURATION =====
# Your Gmail address (sender)
GMAIL_SENDER_EMAIL=your-email@gmail.com

# Gmail App Password (16 characters, no spaces)
# Generate at: https://myaccount.google.com/apppasswords
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

### Step 2: Get Google API Keys

#### Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key and paste into `.env` as `GOOGLE_API_KEY`

#### Service Account JSON
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **IAM & Admin → Service Accounts**
3. Click "Create Service Account"
4. Name it (e.g., "lexiguard-backend")
5. Grant roles:
   - Cloud DLP User
   - Cloud Translation API User
   - Cloud Firestore User
   - Cloud Storage Admin
6. Click "Create Key" → Choose JSON
7. Download the file and save to `lexiguard-backend/`
8. Update `GOOGLE_APPLICATION_CREDENTIALS` path in `.env`

#### Gmail App Password
1. Enable 2-Step Verification: [Google Account Security](https://myaccount.google.com/security)
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Computer" (or other device)
4. Click "Generate"
5. Copy the 16-character password (no spaces)
6. Paste into `.env` as `GMAIL_APP_PASSWORD`

### Step 3: Enable Google Cloud APIs

In [Google Cloud Console](https://console.cloud.google.com/), enable these APIs:
- ✅ Cloud DLP API
- ✅ Cloud Translation API
- ✅ Cloud Firestore API
- ✅ Cloud Storage API
- ✅ Cloud Pub/Sub API (for async processing)

---

## 📂 Project Structure

```
lexiguard-backend/
├── main.py                      # FastAPI application (main entry)
├── requirements.txt             # Python dependencies
├── .env                         # Environment variables (create this!)
├── .env.example                 # Environment template
├── Dockerfile                   # Container configuration
├── .dockerignore
├── .gitignore
│
├── translation_utils.py         # Translation service utilities
├── dlp_processor.py             # PII redaction logic
├── gemini_analyzer.py           # Gemini AI integration
├── worker.py                    # Background job processor
│
└── uploads/                     # Temporary file storage (auto-created)
```

---

## 🔌 API Endpoints

### Core Analysis Endpoints

#### 1. Analyze Document (Standard)
```http
POST /analyze-file
Content-Type: multipart/form-data

Parameters:
- file: PDF/DOCX file (required)
- analysis_type: "standard" (default)

Response:
{
  "summary": "AI-generated summary",
  "risks": [
    {
      "clause_text": "Redacted clause...",
      "severity": "High",
      "risk_explanation": "Explanation..."
    }
  ],
  "fairness_score": 65,
  "pii_redacted": true,
  "redacted_document_text": "Full redacted text..."
}
```

#### 2. Analyze Clauses (Detailed)
```http
POST /analyze-clauses
Content-Type: multipart/form-data

Parameters:
- file: PDF/DOCX file (required)
- analysis_type: "detailed"

Response:
{
  "clauses": [
    {
      "clause": "Original clause text...",
      "risk_level": "High",
      "impact": "Impact description...",
      "recommendation": "Action to take...",
      "explanation": "Detailed explanation..."
    }
  ],
  "total_risky_clauses": 5,
  "fairness_score": 65,
  "pii_redacted": true
}
```

#### 3. Chat with Document
```http
POST /chat
Content-Type: application/json

Body:
{
  "document_text": "Redacted document content...",
  "question": "What are the termination clauses?"
}

Response:
{
  "answer": "AI-generated answer based on document context..."
}
```

### Email & Negotiation Endpoints

#### 4. Draft Negotiation Email
```http
POST /draft-negotiation
Content-Type: application/json

Body:
{
  "clause": "Unfair clause text...",
  "risk_level": "High",
  "explanation": "Why this is risky..."
}

Response:
{
  "email_subject": "Concern Regarding Contract Terms",
  "email_body": "Professional negotiation email text..."
}
```

#### 5. Send PDF Document Review
```http
POST /send-document-review
Content-Type: application/json

Body:
{
  "filename": "contract.pdf",
  "document_summary": "Summary text...",
  "risk_summary": "Risk analysis...",
  "clauses": [
    {
      "clause": "Clause text...",
      "risk": "High",
      "explanation": "Explanation..."
    }
  ],
  "user_email": "recipient@example.com"
}

Response:
{
  "success": true,
  "message": "Email sent successfully to recipient@example.com"
}
```

### Utility Endpoints

#### 6. Health Check
```http
GET /
Response: {"message": "LexiGuard Backend API is running"}
```

#### 7. Interactive API Docs
```http
GET /docs
```
Opens Swagger UI with interactive API documentation

---

## 🛡️ Privacy & Security Features

### PII Redaction (Cloud DLP)

The backend automatically redacts 7 types of sensitive information:

| Type | Examples |
|------|----------|
| `PERSON_NAME` | John Doe, Jane Smith |
| `EMAIL_ADDRESS` | john@example.com |
| `PHONE_NUMBER` | (555) 123-4567 |
| `STREET_ADDRESS` | 123 Main St, New York |
| `CREDIT_CARD_NUMBER` | 4111-1111-1111-1111 |
| `DATE_OF_BIRTH` | 01/15/1990 |
| `US_SOCIAL_SECURITY_NUMBER` | 123-45-6789 |

**How it works:**
1. Document uploaded → Extract text
2. Send to Cloud DLP API → Redact PII
3. Redacted text used for all AI analysis
4. Original document **never stored**
5. Only redacted content saved to Firestore

**Example:**
```
Original:  "Contact John Doe at john@email.com"
Redacted:  "Contact [PERSON_NAME] at [EMAIL_ADDRESS]"
```

### Security Best Practices

- ✅ Environment variables for sensitive data (never hardcoded)
- ✅ Virtual environment isolation (`.venv`)
- ✅ CORS configured for trusted origins only
- ✅ File upload validation (type, size limits)
- ✅ Automatic cleanup of temporary files
- ✅ HTTPS for all production deployments

---

## 🧪 Testing

### Manual Testing with Swagger UI

1. **Start the backend**
   ```bash
   python main.py
   ```

2. **Open interactive docs**
   - Browser: http://localhost:8000/docs
   - Try "POST /analyze-file" with sample document
   - Verify response includes redacted text

### Test with curl

```bash
curl -X POST "http://localhost:8000/analyze-file" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@sample_contract.txt" \
  -F "analysis_type=standard"
```

---

## 🚀 Deployment to Google Cloud Run

### Step 1: Build Container

```bash
# Build Docker image
docker build -t lexiguard-backend .

# Test locally
docker run -p 8000:8000 \
  -e GOOGLE_API_KEY=your_key \
  -e GOOGLE_CLOUD_PROJECT=your_project \
  lexiguard-backend
```

### Step 2: Deploy to Cloud Run

```bash
# Deploy from source
gcloud run deploy lexiguard-backend \
  --source . \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_API_KEY=your_key \
  --set-env-vars GOOGLE_CLOUD_PROJECT=your_project \
  --memory 2Gi \
  --timeout 300
```

### Step 3: Configure CORS for Frontend

Update `main.py` to allow your frontend domain:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",           # Local development
        "https://your-frontend.run.app"    # Production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🔧 Troubleshooting

### Issue: "Module not found" Errors

**Solution:** Ensure packages are installed in virtual environment!

```bash
# Activate virtual environment first
source .venv/bin/activate  # Linux/Mac
.\.venv\Scripts\Activate.ps1  # Windows

# Check installed packages
pip list

# Reinstall if needed
pip install -r requirements.txt
```

### Issue: "Google API Key Invalid"

**Solutions:**
1. Verify API key is correct in `.env`
2. Check if Gemini API is enabled: [AI Studio](https://makersuite.google.com/)
3. Ensure billing is enabled on Google Cloud project

### Issue: "Cloud DLP Permission Denied"

**Solutions:**
1. Verify Service Account has "Cloud DLP User" role
2. Check `GOOGLE_APPLICATION_CREDENTIALS` path is correct
3. Ensure DLP API is enabled in Cloud Console

### Issue: "Email Sending Failed"

**Solutions:**
1. Verify `GMAIL_SENDER_EMAIL` and `GMAIL_APP_PASSWORD` in `.env`
2. Ensure App Password (not regular password) is used
3. Check 2-Step Verification is enabled on Google Account

### Issue: Port Already in Use

**Windows:**
```powershell
# Find process using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID)
taskkill /PID <process_id> /F
```

**Linux/Mac:**
```bash
# Find and kill process
lsof -ti:8000 | xargs kill -9
```

### Issue: Virtual Environment Not Activating

```bash
# Enable script execution (Windows only)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Activate venv
.\.venv\Scripts\Activate.ps1  # Windows
source .venv/bin/activate     # Linux/Mac
```

---

## 📊 Architecture Overview

```
┌─────────────┐
│   Client    │ (React Frontend)
│ Port 3000   │
└──────┬──────┘
       │ HTTP/JSON
       ▼
┌──────────────────────────────────────────┐
│     FastAPI Backend (Port 8000)          │
│                                          │
│  ┌────────────┐  ┌──────────────────┐  │
│  │  FastAPI   │  │  Gemini AI       │  │
│  │  Routes    │→ │  Analysis        │  │
│  └────────────┘  └──────────────────┘  │
│         ↓                                │
│  ┌────────────┐  ┌──────────────────┐  │
│  │  Cloud     │  │  Cloud Firestore │  │
│  │  DLP       │  │  Storage         │  │
│  └────────────┘  └──────────────────┘  │
│         ↓                ↓               │
│  ┌────────────┐  ┌──────────────────┐  │
│  │  Gmail     │  │  Cloud Storage   │  │
│  │  SMTP      │  │  (GCS)           │  │
│  └────────────┘  └──────────────────┘  │
└──────────────────────────────────────────┘
```

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🆘 Support

### Getting Help
1. Check **Troubleshooting** section above
2. Review [FastAPI Documentation](https://fastapi.tiangolo.com/)
3. Check [Google Cloud Documentation](https://cloud.google.com/docs)
4. Review backend logs in terminal
5. Open an issue on GitHub

---

## 📞 Contact

- **Developers**: Dhriti Gandhi, Krisha Gandhi, Kavya Patel
- **Project**: LexiGuard - AI-Powered Legal Document Assistant
- **Repository**: https://github.com/krishagandhi0711/Lexiguard

---

## ✅ Quick Start Checklist

**Setup:**
- [ ] Python 3.11+ installed
- [ ] Virtual environment created (`.venv`)
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] `.env` file created with all required variables
- [ ] Gemini API key obtained and added
- [ ] Service Account JSON downloaded
- [ ] Gmail App Password generated
- [ ] Google Cloud APIs enabled

**Testing:**
- [ ] Backend starts without errors
- [ ] Interactive docs accessible at `/docs`
- [ ] Can upload and analyze sample document
- [ ] PII redaction working (check logs)
- [ ] Chat feature responds correctly
- [ ] Email generation works
- [ ] PDF email sends successfully

**Deployment:**
- [ ] Dockerfile builds successfully
- [ ] Cloud Run deployment successful
- [ ] Environment variables set in Cloud Run
- [ ] CORS configured for frontend domain
- [ ] SSL/HTTPS enabled

---

**Built with ❤️ for LexiGuard**

*Last Updated: October 2025*
