from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import joblib

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
        return {
            "prediction": "Scam",
            "risk": risk,
            "reason": "Phishing/spam indicators detected."
        }

    return {
        "prediction": "Safe",
        "risk": risk,
        "reason": "Message appears legitimate."
    }


@app.post("/analyze-url")
def analyze_url(data: UrlRequest):
    url = data.url.lower()

    suspicious_keywords = [
        "bit.ly",
        "tinyurl",
        "free",
        "login",
        "verify",
        "update",
        "secure",
        "account",
    ]

    matches = sum(
        1 for keyword in suspicious_keywords
        if keyword in url
    )

    risk = min(matches * 20, 100)

    if risk >= 50:
        prediction = "Suspicious URL"
        reason = "Potential phishing indicators detected."
    else:
        prediction = "Safe URL"
        reason = "No major phishing indicators found."

    return {
        "prediction": prediction,
        "risk": risk,
        "reason": reason,
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

    if prediction == 1 or keyword_matches >= 2:
        result_prediction = "Scam Screenshot"
        reason = "OCR detected phishing/spam indicators."
    else:
        result_prediction = "Safe Screenshot"
        reason = "Screenshot appears legitimate."

    return {
        "prediction": result_prediction,
        "risk": risk,
        "reason": reason,
        "extracted_text": extracted_text,
    }