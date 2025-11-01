# ⚖️ LexiGuard – AI-Powered Legal Document Assistant

LexiGuard is a comprehensive platform that **democratizes legal understanding** by transforming complex contracts into **clear, actionable insights**. Built with cutting-edge AI and cloud-native architecture, it empowers users to navigate legal documents with confidence.

---

## 🌟 What LexiGuard Does

- **Intelligent Analysis** – Two modes (Standard & Detailed) for quick overviews or clause-by-clause breakdowns
- **Risk Detection** – Automatic flagging of unfair clauses with High/Medium/Low severity levels
- **Fairness Scoring** – Benchmark contracts against industry fair-practice standards
- **Privacy-First** – Automatic PII redaction (names, emails, addresses, SSNs) before storage
- **Role-Aware Chat** – Interactive Q&A that understands your role (Tenant, Employee, Borrower, etc.)
- **Smart Negotiation** – AI-generated professional emails to contest risky clauses
- **PDF Reports** – Comprehensive analysis summaries delivered directly to your inbox
- **Multi-Language** – Translate analyses into 100+ languages instantly
- **Async Processing** – Cloud Pub/Sub-powered background jobs for large documents
- **Analytics Dashboard** – Manage all analyses with search, filter, favorites, and inline editing
- **Legal Resources** – Built-in glossary and lawyer directory for additional support

---

## 🏗️ Architecture

### Frontend (React + TailwindCSS)
Modern, responsive web application with document upload, dual analysis modes, interactive chat, negotiation assistant, PDF reports, analytics dashboard, multi-language support, and Firebase authentication.

**Tech Stack:** React 18, React Router v6, TailwindCSS, shadcn/ui, Framer Motion, Firebase Auth, Cloud Firestore

### Backend (FastAPI + Google AI)
High-performance REST API powered by Google Gemini 2.5 Flash, Cloud DLP for PII redaction, role-aware chat, asynchronous processing via Cloud Pub/Sub, Cloud Storage, Gmail SMTP, and Translation API.

**Tech Stack:** FastAPI, Google Gemini AI, Cloud DLP, Cloud Firestore, Cloud Storage, Cloud Pub/Sub, Cloud Translate API

### Infrastructure
Cloud-native deployment with Cloud Functions for Pub/Sub publishing, dedicated Cloud Run worker for async document processing, and automated deployment scripts.

---

## 📂 Project Structure

```
lexiguard/
├── .dockerignore
├── .gcloudignore
├── .gitignore
├── Dockerfile
├── README.md
├── firestore.indexes.json
├── setup.py
│
├── lexiguard-frontend/              # React web application
│   ├── .gcloudignore
│   ├── .gitignore
│   ├── Dockerfile
│   ├── README.md
│   ├── package.json
│   ├── tailwind.config.js
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   └── manifest.json
│   └── src/
│       ├── components/              # UI components
│       │   ├── ui/                  # shadcn/ui components
│       │   ├── home/                # Homepage sections
│       │   ├── BackToTop.jsx
│       │   ├── FairnessScore.js
│       │   ├── JobStatusTracker.jsx
│       │   ├── LanguageSelector.jsx
│       │   ├── RoleAwareChatAgent.jsx
│       │   └── NegotiationAssistant.js
│       ├── pages/                   # Main application pages
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Upload.jsx
│       │   ├── Results.jsx
│       │   ├── JobResults.jsx
│       │   ├── Dashboard.jsx
│       │   ├── ChatWithDocument.jsx
│       │   ├── About.jsx
│       │   ├── Contact.jsx
│       │   ├── FAQ.jsx
│       │   ├── Glossary.jsx
│       │   └── LawyerDirectory.jsx
│       ├── contexts/
│       │   └── AuthContext.jsx      # Firebase authentication
│       ├── firebase/
│       │   └── config.js            # Firebase configuration
│       ├── services/
│       │   └── firestoreService.js  # Firestore CRUD operations
│       ├── data/
│       │   └── lawyers.json         # Lawyer directory data
│       └── integrations/
│           └── Core.js
│
├── lexiguard-backend/               # FastAPI main backend
│   ├── .dockerignore
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   ├── Readme.md
│   ├── main.py                      # API entry point
│   ├── translation_utils.py         # Translation services
│   ├── requirements.txt
│   └── app.py
│
├── cloud-run-worker/                # Async job processor
│   ├── .env.example
│   ├── deploy.sh
│   ├── main.py                      # Worker entry point
│   ├── worker.py                    # Job processing logic
│   ├── gemini_analyzer.py           # AI analysis utilities
│   ├── dlp_processor.py             # PII redaction
│   └── requirements.txt
│
├── cloud-functions/                 # Serverless functions
│   └── pubsub-publisher/
│       ├── deploy.sh
│       ├── main.py                  # Pub/Sub publisher
│       └── requirements.txt
│
├── fastapi_app/                     # Alternative FastAPI implementation
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
│
├── flask_app/                       # Legacy Flask implementation
│   └── app.py
│
├── infrastructure/                  # Infrastructure setup
│   └── setup-pubsub.sh
│
├── lexiguard_sdk/                   # Python SDK
│   ├── __init__.py
│   ├── core.py
│   └── file_utils.py
│
└── shared/                          # Shared utilities
    ├── constants.py
    └── firestore_schemas.py
```

For **complete setup instructions, API documentation, and deployment guides**:
- 📖 **[Frontend README](./lexiguard-frontend/README.md)** – React app configuration, Firebase setup, features, and troubleshooting
- 📖 **[Backend README](./lexiguard-backend/README.md)** – FastAPI setup, Google Cloud integration, API reference, and deployment

---

## 🚀 Live Deployments

| Service | URL |
|---------|-----|
| **Frontend Application** | [lexiguard-frontend-372716482731.asia-south1.run.app](https://lexiguard-frontend-372716482731.asia-south1.run.app) |
| **Backend API** | [lexiguard-backend-372716482731.asia-south1.run.app](https://lexiguard-backend-372716482731.asia-south1.run.app) |
| **API Documentation** | [Interactive Swagger UI](https://lexiguard-fastapi-372716482731.asia-south1.run.app/docs) |

---

## 🛠️ Technology Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, TailwindCSS, shadcn/ui, Framer Motion, Firebase Auth |
| **Backend** | FastAPI, Google Gemini 2.5 Flash, Cloud DLP |
| **Database** | Cloud Firestore |
| **Storage & Processing** | Cloud Storage, Cloud Pub/Sub |
| **Translation & Email** | Cloud Translate API, Gmail SMTP, ReportLab |
| **Deployment** | Google Cloud Run, Cloud Functions |

---

## 👥 Team

- Dhriti Gandhi
- Krisha Gandhi
- Kavya Patel

---

## 📄 License

MIT License – See [LICENSE](./LICENSE) file for details

---

**Built with care to make legal documents accessible to everyone**

*Last Updated: November 2025*
