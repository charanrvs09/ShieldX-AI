from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import joblib

from app.utils.history import save_scan, get_history
from app.services.ocr_service import extract_text

app = FastAPI()

model = joblib.load("app/models/shieldx_model.pkl")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MessageRequest(BaseModel):
    message: str


class UrlRequest(BaseModel):
    url: str


@app.get("/")
def home():
    return {"message": "ShieldX AI Backend Running"}


@app.get("/history")
def history():
    return get_history()


@app.post("/analyze-text")
def analyze_text(data: MessageRequest):
    message = data.message.lower()

    prediction = model.predict([data.message])[0]
    probability = model.predict_proba([data.message])[0]

    risk = int(probability[1] * 100)

    phishing_keywords = [
        "otp",
        "verify",
        "bank",
        "account",
        "password",
        "click",
        "suspended",
        "urgent",
        "reward",
        "winner",
        "prize",
        "payment",
        "login"
    ]

    keyword_matches = sum(
        1 for keyword in phishing_keywords
        if keyword in message
    )

    risk += keyword_matches * 15
    risk = min(risk, 100)

    if prediction == 1 or keyword_matches >= 2:

        explanation = []

        if "otp" in message:
            explanation.append("Requests OTP information")

        if "bank" in message:
            explanation.append("Impersonates banking services")

        if "verify" in message:
            explanation.append("Attempts identity verification")

        if "click" in message:
            explanation.append("Contains suspicious action request")

        if "urgent" in message:
            explanation.append("Uses urgency tactics")

        if "password" in message:
            explanation.append("Requests sensitive credentials")

        if "login" in message:
            explanation.append("Attempts login credential harvesting")

        save_scan("Message", "Scam", risk)

        return {
            "prediction": "Scam",
            "risk": risk,
            "reason": "Phishing/spam indicators detected.",
            "explanation": explanation
        }

    save_scan("Message", "Safe", risk)

    return {
        "prediction": "Safe",
        "risk": risk,
        "reason": "Message appears legitimate.",
        "explanation": [
            "No phishing keywords detected",
            "No suspicious behavior found",
            "Message appears safe"
        ]
    }


@app.post("/analyze-url")
def analyze_url(data: UrlRequest):
    url = data.url.lower()

    risk = 0
    explanation = []

    if "bit.ly" in url or "tinyurl" in url:
        risk += 40
        explanation.append(
            "Uses URL shortener commonly seen in phishing attacks"
        )

    if "login" in url:
        risk += 20
        explanation.append(
            "Contains login-related keywords"
        )

    if "verify" in url:
        risk += 20
        explanation.append(
            "Attempts account verification"
        )

    if "account" in url:
        risk += 20
        explanation.append(
            "Targets account-related information"
        )

    if "secure" in url:
        risk += 20
        explanation.append(
            "Uses misleading security terminology"
        )

    risk = min(risk, 100)

    if risk >= 50:
        prediction = "Suspicious URL"
        reason = "Potential phishing indicators detected."
    else:
        prediction = "Safe URL"
        reason = "No major phishing indicators found."

        explanation = [
            "No suspicious URL patterns detected",
            "No phishing indicators identified"
        ]

    save_scan(
        "URL",
        prediction,
        risk
    )

    return {
        "prediction": prediction,
        "risk": risk,
        "reason": reason,
        "explanation": explanation
    }


@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text(file_path)

    prediction = model.predict([extracted_text])[0]
    probability = model.predict_proba([extracted_text])[0]

    risk = int(probability[1] * 100)

    phishing_keywords = [
        "otp",
        "verify",
        "bank",
        "account",
        "password",
        "click",
        "suspended",
        "urgent",
        "reward",
        "winner",
        "prize",
        "payment",
        "login"
    ]

    keyword_matches = sum(
        1 for keyword in phishing_keywords
        if keyword in extracted_text.lower()
    )

    risk += keyword_matches * 15
    risk = min(risk, 100)

    explanation = []

    if "otp" in extracted_text.lower():
        explanation.append(
            "OCR detected OTP request"
        )

    if "bank" in extracted_text.lower():
        explanation.append(
            "OCR detected banking-related content"
        )

    if "verify" in extracted_text.lower():
        explanation.append(
            "OCR detected verification request"
        )

    if "urgent" in extracted_text.lower():
        explanation.append(
            "OCR detected urgency language"
        )

    if "click" in extracted_text.lower():
        explanation.append(
            "OCR detected suspicious call-to-action"
        )

    if prediction == 1 or keyword_matches >= 2:
        result_prediction = "Scam Screenshot"
        reason = "OCR detected phishing/spam indicators."
    else:
        result_prediction = "Safe Screenshot"
        reason = "Screenshot appears legitimate."

        explanation = [
            "No phishing indicators detected",
            "Screenshot appears safe"
        ]

    save_scan(
        "Screenshot",
        result_prediction,
        risk
    )

    return {
        "prediction": result_prediction,
        "risk": risk,
        "reason": reason,
        "extracted_text": extracted_text,
        "explanation": explanation,
    }