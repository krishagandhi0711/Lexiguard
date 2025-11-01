# ⚙️ LexiGuard Backend

The **LexiGuard Backend** is a powerful FastAPI-based REST API that powers the LexiGuard legal document analysis platform. It leverages Google's Gemini 2.5 Flash for intelligent contract analysis, Cloud DLP for PII redaction, Cloud Firestore for persistent storage, and Cloud Pub/Sub for asynchronous processing.

---

## 🌟 Features

### Core Capabilities
- **📄 Document Processing** - Supports PDF, DOCX, and plain text formats
- **🤖 AI-Powered Analysis** - Uses Google Gemini 2.5 Flash for contract analysis
- **🛡️ PII Redaction** - Automatic removal of 7+ types of sensitive information
- **💬 Role-Aware Chat** - Intelligent conversational Q&A with role discovery and persona-based responses
- **✉️ Email Generation** - Professional negotiation emails and PDF reports
- **📊 Two Analysis Modes**:
  - **Standard**: Quick overview with risk summary and AI-generated suggestions
  - **Detailed**: Comprehensive clause-by-clause breakdown with impact assessment
- **🔒 Privacy-First Design** - Only stores redacted content in Firestore

### Advanced Features
- **🌐 Multi-Language Support** - Translate analyses to 100+ languages (Google Translate API)
- **📧 Gmail Integration** - Send PDF reports via SMTP
- **⚡ Async Processing** - Background job processing with Cloud Storage and Pub/Sub
- **🔐 Firebase Integration** - User authentication and data isolation
- **📈 Real-time Job Tracking** - Poll or stream job status updates via Firestore

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
| **Async Processing** | Cloud Pub/Sub |

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.11+** (check with `python --version`)
- **Google Cloud Account** with billing enabled
- **Google API Keys**:
  - Gemini API Key ([Get here](https://makersuite.google.com/app/apikey))
  - Service Account JSON (for DLP, Firestore, Translation, Storage)
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
   uvicorn main:app --reload --host 0.0.0.0 --port 8080
   ```

7. **Access the API**
   
   Open your browser: **http://localhost:8080/docs**

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

# Path to Service Account JSON file (for DLP, Firestore, Translation, Storage)
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json

# ===== STORAGE CONFIGURATION =====
# Google Cloud Storage bucket name (for async document processing)
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
   - Pub/Sub Publisher (for async processing)
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
- ✅ Cloud Pub/Sub API
- ✅ Generative AI API (Gemini)

### Step 4: Create Cloud Storage Bucket

```bash
# Create bucket for document uploads
gsutil mb -l asia-south1 gs://lexiguard-documents

# Set up CORS if needed
gsutil cors set cors.json gs://lexiguard-documents
```

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
├── dlp_processor.py             # PII redaction logic (optional)
├── gemini_analyzer.py           # Gemini AI integration (optional)
├── worker.py                    # Background job processor
│
└── uploads/                     # Temporary file storage (auto-created)
```

---

## 🔌 API Endpoints

### Core Analysis Endpoints

#### 1. Analyze Document (Standard) - Synchronous
```http
POST /analyze-file
Content-Type: multipart/form-data

Parameters:
- file: PDF/DOCX/TXT file (optional)
- text: Plain text input (optional)

Response:
{
  "filename": "contract.pdf",
  "file_type": "PDF",
  "summary": "AI-generated summary...",
  "risks": [
    {
      "clause_text": "Redacted clause...",
      "severity": "High",
      "risk_explanation": "Explanation..."
    }
  ],
  "suggestions": [
    "AI-generated contextual suggestions..."
  ],
  "pii_redacted": true,
  "redacted_document_text": "Full redacted text..."
}
```

#### 2. Analyze Document (Async) - Non-blocking
```http
POST /analyze-file-async
Content-Type: multipart/form-data

Parameters:
- file: PDF/DOCX/TXT file (required)
- documentTitle: string (required)
- analysisType: "standard" or "detailed" (default: "standard")
- userId: Firebase user ID (required)

Response:
{
  "success": true,
  "message": "File uploaded successfully. Analysis in progress...",
  "jobId": "uuid-v4-job-id",
  "status": "pending",
  "estimatedTime": "30-60 seconds",
  "documentTitle": "My Contract",
  "fileType": "pdf"
}
```

#### 3. Check Job Status
```http
GET /job-status/{job_id}?user_id={firebase_user_id}

Response:
{
  "jobId": "uuid-v4-job-id",
  "status": "completed",  // pending, processing, completed, failed
  "documentTitle": "My Contract",
  "resultAnalysisId": "firestore-doc-id",
  "processingTimeSeconds": 45.2
}
```

#### 4. Get Analysis Results
```http
GET /analysis-result/{analysis_id}?user_id={firebase_user_id}

Response:
{
  "filename": "contract.pdf",
  "file_type": "PDF",
  "summary": "AI-generated summary...",
  "risks": [...],
  "recommendations": [...],
  "pii_redacted": true,
  "redacted_document_text": "..."
}
```

#### 5. Analyze Clauses (Detailed)
```http
POST /analyze-clauses
Content-Type: multipart/form-data

Parameters:
- file: PDF/DOCX/TXT file (optional)
- text: Plain text input (optional)

Response:
{
  "filename": "contract.pdf",
  "file_type": "PDF",
  "total_risky_clauses": 5,
  "clauses": [
    {
      "clause": "Original clause text...",
      "risk_level": "High",
      "impact": "Impact description...",
      "recommendation": "Action to take...",
      "explanation": "Detailed explanation..."
    }
  ],
  "pii_redacted": true
}
```

### Chat & Interaction Endpoints

#### 6. Role-Aware Chat
```http
POST /chat
Content-Type: application/json

Body:
{
  "document_text": "Redacted document content...",
  "message": "What are the termination clauses?",
  "analysis_id": "optional-firestore-id",
  "user_role": "Tenant",  // optional, will be discovered if not provided
  "conversation_history": [
    {"sender": "user", "text": "Previous question"},
    {"sender": "assistant", "text": "Previous answer"}
  ]
}

Response:
{
  "reply": "AI-generated answer based on role and context...",
  "identified_role": "Tenant",
  "needs_role_input": false,
  "intent": "analysis"  // retrieval, analysis, or general
}
```

### Email & Negotiation Endpoints

#### 7. Draft Negotiation Email
```http
POST /draft-negotiation
Content-Type: application/json

Body:
{
  "clause": "Unfair clause text..."
}

Response:
{
  "negotiation_email": "Professional email body text..."
}
```

#### 8. Generate Document Review Email
```http
POST /draft-document-email
Content-Type: application/json

Body:
{
  "document_summary": "Summary text...",
  "risk_summary": "Risk analysis..."
}

Response:
{
  "document_email": "Professional email body text..."
}
```

#### 9. Send PDF Document Review via Email
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

### Translation Endpoints

#### 10. Get Supported Languages
```http
GET /supported-languages

Response:
{
  "total_languages": 100,
  "languages": [
    {"code": "es", "name": "Spanish"},
    {"code": "fr", "name": "French"},
    ...
  ],
  "categories": {
    "Asian": [...],
    "European": [...],
    "Indian": [...]
  }
}
```

#### 11. Translate Analysis
```http
POST /translate/{analysis_id}?language=es&user_id={firebase_user_id}

Response:
{
  "language": "es",
  "language_name": "Spanish",
  "translated_content": {
    "summary": "Resumen traducido...",
    "risks": [...],
    "clauses": [...],
    "suggestions": [...]
  }
}
```

#### 12. Translation Statistics
```http
GET /translation-stats/{analysis_id}

Response:
{
  "analysis_id": "firestore-doc-id",
  "available_translations": ["es", "fr", "hi"],
  "remaining_languages": 97
}
```

### Utility Endpoints

#### 13. Health Check
```http
GET /

Response:
{
  "message": "LexiGuard API is running successfully 🚀"
}
```

#### 14. Test Gemini API
```http
GET /test-gemini

Response:
{
  "status": "success",
  "message": "Gemini API is working correctly",
  "api_key_configured": true,
  "model_name": "models/gemini-2.5-flash",
  "test_response": "Gemini API is working correctly."
}
```

#### 15. Interactive API Documentation
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

### Role-Aware Chat System

The backend implements intelligent role discovery and persona-based responses:

1. **Role Discovery**: Automatically detects user's role (Tenant, Employee, Borrower, etc.)
2. **Role Persistence**: Saves role to Firestore for future conversations
3. **Intent Routing**: Classifies queries as Retrieval, Analysis, or General
4. **Persona-Based Responses**: Tailors answers based on user's role perspective

### Security Best Practices

- ✅ Environment variables for sensitive data (never hardcoded)
- ✅ Virtual environment isolation (`.venv`)
- ✅ CORS configured for trusted origins only
- ✅ Firebase user ID verification for all protected endpoints
- ✅ File upload validation (type, size limits - 10MB max)
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
   - Browser: http://localhost:8080/docs
   - Try endpoints with sample data
   - Verify responses

### Test Gemini API Connection

```bash
curl http://localhost:8080/test-gemini
```

Expected response:
```json
{
  "status": "success",
  "message": "Gemini API is working correctly",
  "model_name": "models/gemini-2.5-flash"
}
```

### Test Document Analysis

```bash
curl -X POST "http://localhost:8080/analyze-file" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@sample_contract.txt"
```

---

## 🚀 Deployment to Google Cloud Run

### Step 1: Build Container

```bash
# Build Docker image
docker build -t lexiguard-backend .

# Test locally
docker run -p 8080:8080 \
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
  --set-env-vars GCS_BUCKET_NAME=lexiguard-documents \
  --memory 2Gi \
  --timeout 300 \
  --port 8080
```

### Step 3: Set Environment Variables Securely

```bash
# Create secrets in Secret Manager
gcloud secrets create gmail-app-password --data-file=- <<< "your_app_password"

# Deploy with secrets
gcloud run deploy lexiguard-backend \
  --update-secrets GMAIL_APP_PASSWORD=gmail-app-password:latest \
  --set-env-vars GOOGLE_API_KEY=your_key \
  --set-env-vars GMAIL_SENDER_EMAIL=your_email
```

### Step 4: Configure CORS for Frontend

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
4. Test with `/test-gemini` endpoint

### Issue: "Cloud DLP Permission Denied"

**Solutions:**
1. Verify Service Account has "Cloud DLP User" role
2. Check `GOOGLE_APPLICATION_CREDENTIALS` path is correct
3. Ensure DLP API is enabled in Cloud Console
4. Verify project ID matches in `.env`

### Issue: "Email Sending Failed"

**Solutions:**
1. Verify `GMAIL_SENDER_EMAIL` and `GMAIL_APP_PASSWORD` in `.env`
2. Ensure App Password (not regular password) is used
3. Check 2-Step Verification is enabled on Google Account
4. Test SMTP connection manually

### Issue: "Async Job Not Processing"

**Solutions:**
1. Verify Cloud Storage bucket exists: `gsutil ls gs://lexiguard-documents`
2. Check Pub/Sub topic created: `gcloud pubsub topics list`
3. Verify Cloud Function is deployed for job processing
4. Check Firestore security rules allow job writes

### Issue: Port Already in Use

**Windows:**
```powershell
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process (replace PID)
taskkill /PID <process_id> /F
```

**Linux/Mac:**
```bash
# Find and kill process
lsof -ti:8080 | xargs kill -9
```

### Issue: "Translation Failed"

**Solutions:**
1. Verify Translation API is enabled
2. Check Service Account has "Cloud Translation API User" role
3. Verify language code is supported (use `/supported-languages`)
4. Check Firestore permissions for caching translations

---

## 📊 Architecture Overview

```
┌─────────────┐
│   Client    │ (React Frontend)
│ Port 3000   │
└──────┬──────┘
       │ HTTP/JSON
       ▼
┌──────────────────────────────────────────────────┐
│     FastAPI Backend (Port 8080)                  │
│                                                  │
│  ┌────────────┐  ┌──────────────────────────┐  │
│  │  FastAPI   │  │  Gemini 2.5 Flash        │  │
│  │  Routes    │→ │  AI Analysis             │  │
│  └────────────┘  └──────────────────────────┘  │
│         ↓                                        │
│  ┌────────────┐  ┌──────────────────────────┐  │
│  │  Cloud     │  │  Cloud Firestore         │  │
│  │  DLP       │  │  (Analyses, Jobs)        │  │
│  └────────────┘  └──────────────────────────┘  │
│         ↓                ↓                       │
│  ┌────────────┐  ┌──────────────────────────┐  │
│  │  Cloud     │  │  Cloud Storage (GCS)     │  │
│  │  Translate │  │  (Document Uploads)      │  │
│  └────────────┘  └──────────────────────────┘  │
│         ↓                ↓                       │
│  ┌────────────┐  ┌──────────────────────────┐  │
│  │  Gmail     │  │  Cloud Pub/Sub           │  │
│  │  SMTP      │  │  (Async Processing)      │  │
│  └────────────┘  └──────────────────────────┘  │
└──────────────────────────────────────────────────┘
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
- [ ] Google Cloud APIs enabled (DLP, Translation, Firestore, Storage, Pub/Sub)
- [ ] Cloud Storage bucket created

**Testing:**
- [ ] Backend starts without errors on port 8080
- [ ] Interactive docs accessible at `/docs`
- [ ] `/test-gemini` endpoint returns success
- [ ] Can upload and analyze sample document
- [ ] PII redaction working (check logs)
- [ ] Chat feature responds correctly
- [ ] Email generation works
- [ ] PDF email sends successfully
- [ ] Translation works for supported languages
- [ ] Async job processing works (if configured)

**Deployment:**
- [ ] Dockerfile builds successfully
- [ ] Cloud Run deployment successful
- [ ] Environment variables/secrets set in Cloud Run
- [ ] CORS configured for frontend domain
- [ ] SSL/HTTPS enabled
- [ ] Monitoring and logging configured

---

**Built with ❤️ for LexiGuard**

*Last Updated: October 2025*
