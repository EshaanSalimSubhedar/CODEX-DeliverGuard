from fastapi import FastAPI
from pydantic import BaseModel
import random

app = FastAPI()

# -----------------------------
# Data Models
# -----------------------------
class UserInput(BaseModel):
    location: str

class ClaimInput(BaseModel):
    user_id: int
    trigger_type: str
    zone: str

# -----------------------------
# Mock Data (for demo)
# -----------------------------
def get_mock_data():
    return {
        "rain": random.randint(50, 120),      # mm
        "aqi": random.randint(100, 400),
        "temperature": random.randint(30, 45),
        "flood": random.choice([0, 1]),
        "curfew": random.choice([0, 1])
    }

# -----------------------------
# Risk Score Calculation
# -----------------------------
def calculate_risk(data):
    rain_risk = min(data["rain"] / 100, 1)
    aqi_risk = min(data["aqi"] / 300, 1)
    heat_risk = min(data["temperature"] / 40, 1)
    flood_risk = data["flood"]
    social_risk = data["curfew"]

    risk_score = (
            0.3 * rain_risk +
            0.2 * aqi_risk +
            0.2 * heat_risk +
            0.2 * flood_risk +
            0.1 * social_risk
    )
    return round(risk_score, 2)

# -----------------------------
# Premium Calculation
# -----------------------------
def calculate_premium(risk_score):
    return round(30 + (risk_score * 50), 2)

# -----------------------------
# Routes
# -----------------------------

@app.get("/")
def home():
    return {"message": "DeliverGuard API Running 🚀"}

# Get risk score + premium
@app.post("/risk-premium")
def get_risk_premium(user: UserInput):
    data = get_mock_data()
    risk_score = calculate_risk(data)
    premium = calculate_premium(risk_score)

    return {
        "location": user.location,
        "mock_data": data,
        "risk_score": risk_score,
        "weekly_premium": premium
    }

# Trigger check
@app.get("/check-trigger")
def check_trigger():
    data = get_mock_data()

    triggered = []
    if data["rain"] > 80:
        triggered.append("Rain")
    if data["aqi"] > 300:
        triggered.append("AQI")
    if data["temperature"] > 40:
        triggered.append("Heatwave")
    if data["flood"] == 1:
        triggered.append("Flood")
    if data["curfew"] == 1:
        triggered.append("Curfew")

    return {
        "data": data,
        "triggered_events": triggered
    }

# Claim simulation
@app.post("/claim")
def create_claim(claim: ClaimInput):
    # Simple fraud check (demo logic)
    if claim.trigger_type not in ["Rain", "AQI", "Heatwave", "Flood", "Curfew"]:
        return {"status": "Rejected ❌", "reason": "Invalid trigger"}

    return {
        "status": "Approved ✅",
        "user_id": claim.user_id,
        "trigger": claim.trigger_type,
        "zone": claim.zone,
        "payout": random.randint(200, 500)
    }

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)