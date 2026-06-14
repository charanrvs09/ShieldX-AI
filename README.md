# 🛡️ ShieldX AI
### AI-Powered Phishing, Scam & Threat Detection Platform

ShieldX AI is a full-stack cybersecurity platform designed to detect phishing messages, malicious URLs, and scam screenshots using Machine Learning, OCR, and threat intelligence techniques.

The platform helps users identify and prevent cyber threats in real time through AI-driven analysis and a modern threat monitoring dashboard.

---

## 🌐 Live Demo

### Frontend (Vercel)
🚀 https://shield-x-ai.vercel.app/

### Backend API (Render)
⚡ https://shieldx-ai.onrender.com

---

## 📸 Project Overview

ShieldX AI analyzes three major attack vectors:

### 📩 Message Scanner
Detects phishing SMS, emails, and scam messages using Machine Learning.

### 🔗 URL Scanner
Analyzes URLs for phishing indicators and suspicious patterns.

### 🖼️ Screenshot Scanner
Extracts text from screenshots and performs AI-based phishing detection.

### 📊 Threat Dashboard
Provides real-time monitoring, scan statistics, risk analysis, and recent activity tracking.

---

## ✨ Features

### 🤖 AI-Powered Threat Detection
- Machine Learning-based phishing classification
- Intelligent risk scoring
- Threat probability analysis

### 🔍 AI Threat Explanations
Provides human-readable explanations describing why content was flagged.

Example:

```text
Requests OTP information
Impersonates banking services
Attempts identity verification
Uses urgency tactics
```

### 📈 Live Dashboard Analytics

Tracks:

- Total Scans
- Threats Detected
- Safe Requests
- Detection Rate
- Threat Distribution
- Recent Activity

### 📜 Scan History

Stores:

- Scan Type
- Prediction
- Risk Score
- Timestamp

### 🔐 Route Protection

Protected dashboard access using authentication state management.

### ☁️ Cloud Deployment

- Frontend hosted on Vercel
- Backend hosted on Render

---

## 🏗️ System Architecture

```text
┌────────────────────┐
│     Frontend       │
│      Next.js       │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   FastAPI Backend  │
└─────────┬──────────┘
          │
 ┌────────┼────────┐
 ▼        ▼        ▼

Message   URL    Screenshot
Scanner Scanner  Scanner

 ▼        ▼        ▼

Machine Learning Model
+
OCR Engine

          │
          ▼

Threat Analysis Engine

          │
          ▼

Dashboard & Analytics
```

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- FastAPI
- Python
- Pydantic
- Uvicorn

### Machine Learning

- Scikit-Learn
- Joblib
- NLP-Based Threat Detection

### OCR

- EasyOCR
- OpenCV

### Deployment

- Vercel
- Render

### Version Control

- Git
- GitHub

---

## 🧠 Threat Detection Logic

ShieldX AI uses a hybrid detection approach:

### Machine Learning Classification

The model predicts whether content is:

```text
Safe
Scam
```

### Threat Intelligence Keywords

Examples:

```text
otp
verify
bank
account
password
click
urgent
login
payment
reward
winner
```

### Risk Calculation

```text
Risk Score =
ML Probability +
Threat Keyword Weighting
```

Maximum Risk Score:

```text
100%
```

---

## 📂 Project Structure

```text
ShieldX-AI
│
├── frontend
│   ├── app
│   ├── components
│   ├── public
│   └── styles
│
├── backend
│   ├── app
│   │   ├── models
│   │   ├── services
│   │   ├── utils
│   │   └── main.py
│   │
│   ├── uploads
│   └── requirements.txt
│
├── README.md
└── .gitignore
```

---

## 🚀 API Endpoints

### Analyze Message

```http
POST /analyze-text
```

Example:

```json
{
  "message": "Verify your bank account OTP immediately."
}
```

---

### Analyze URL

```http
POST /analyze-url
```

Example:

```json
{
  "url": "https://bit.ly/free-login-verify"
}
```

---

### Analyze Screenshot

```http
POST /analyze-image
```

Form Data:

```text
file=image.jpg
```

---

### Scan History

```http
GET /history
```

---

## 🔥 Real-World Threats Detected

✅ Banking Scams

✅ OTP Fraud

✅ Account Verification Scams

✅ Credential Harvesting

✅ Malicious Login Links

✅ Phishing URLs

✅ Fake Reward Schemes

✅ Social Engineering Attacks

---

## 🎯 Future Enhancements

- JWT Authentication
- User Accounts
- PostgreSQL Integration
- VirusTotal API Integration
- Email Threat Analysis
- Browser Extension
- Mobile Application
- Advanced Threat Intelligence Dashboard
- Real-Time Notifications

---

## 📊 Deployment Links

### Frontend

https://shield-x-ai.vercel.app/

### Backend

https://shieldx-ai.onrender.com

---

## 👨‍💻 Developer

**Ravilla Venkata Sai Charan**

B.Tech – Computer Science and Engineering  
GITAM University

GitHub: https://github.com/charanrvs09

---

## ⭐ Project Status

```text
STATUS: LIVE & DEPLOYED
```

✅ Frontend Hosted on Vercel

✅ Backend Hosted on Render

✅ Machine Learning Integrated

✅ OCR Integrated

✅ Threat Dashboard Operational

✅ Real-Time Threat Monitoring Active

---

### ⭐ If you found this project useful, consider giving it a star on GitHub!
