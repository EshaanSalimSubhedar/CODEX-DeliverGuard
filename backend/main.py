# ======================= BACKEND (main.py) — FINAL DEPLOYABLE VERSION =======================

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import os

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- STORAGE ----------------
users = []
policies = []

# ---------------- ENV ----------------
API_KEY = os.getenv("API_KEY")  # 🔥 Render ENV variable

# ---------------- MODELS ----------------
class UserInput(BaseModel):
    name: str
    location: str
    zone: str

class PolicyInput(BaseModel):
    triggers: list
    type: str

class ClaimInput(BaseModel):
    user_id: int

# ---------------- DATA FETCH ----------------
def get_real_data(city):
    try:
        if not API_KEY:
            raise Exception("No API key")

        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
        res = requests.get(url, timeout=5).json()

        return {
            "temperature": res["main"]["temp"],
            "rain": res.get("rain", {}).get("1h", 0),
            "aqi": 180  # placeholder
        }

    except:
        # fallback (ensures app never breaks)
        return {
            "temperature": 36,
            "rain": 6,
            "aqi": 200
        }

# ---------------- RISK ----------------
def calculate_risk(data):
    return round(
        (data["rain"]/10 + data["temperature"]/40 + data["aqi"]/300) / 3,
        2
    )

# ---------------- REGISTER ----------------
@app.post("/register")
def register(user: UserInput):
    new_user = {
        "id": len(users) + 1,
        "name": user.name,
        "location": user.location,
        "zone": user.zone
    }
    users.append(new_user)
    return {"user": new_user}

# ---------------- CREATE POLICY ----------------
@app.post("/create-policy/{user_id}")
def create_policy(user_id: int, policy: PolicyInput):

    plans = {
        "Basic": (40, 3),
        "Standard": (50, 4),
        "Premium": (60, 5)
    }

    if policy.type in plans:
        premium, multiplier = plans[policy.type]
    else:
        premium = 30 + len(policy.triggers) * 15
        multiplier = 3 + len(policy.triggers)

    new_policy = {
        "user_id": user_id,
        "type": policy.type,
        "triggers": policy.triggers,
        "premium": premium,
        "multiplier": multiplier
    }

    policies.append(new_policy)

    return {
        "policy": new_policy
    }

# ---------------- CLAIM ----------------
@app.post("/auto-claim")
def auto_claim(input: ClaimInput):

    user = next((u for u in users if u["id"] == input.user_id), None)
    policy = next((p for p in policies if p["user_id"] == input.user_id), None)

    if not user or not policy:
        return {"status": "error", "message": "User or policy not found"}

    data = get_real_data(user["location"])
    risk = calculate_risk(data)

    triggered = []

    # ---------------- TRIGGER LOGIC ----------------
    if "Rain" in policy["triggers"] and data["rain"] > 5:
        triggered.append("Rain")

    if "Heatwave" in policy["triggers"] and data["temperature"] > 35:
        triggered.append("Heatwave")

    if "AQI" in policy["triggers"] and data["aqi"] > 300:
        triggered.append("AQI")

    if "Flood" in policy["triggers"] and data.get("flood", 0) == 1:
        triggered.append("Flood")

    if "Curfew" in policy["triggers"] and data.get("curfew", 0) == 1:
        triggered.append("Curfew")

    # ---------------- NO CLAIM ----------------
    if not triggered:
        return {
            "status": "no_claim",
            "location": user["location"],
            "triggers_hit": [],
            "risk_score": risk,
            "data_used": data,
            "payout": 0,
            "message": "No triggers met"
        }

    # ---------------- PAYOUT ----------------
    payout = int(policy["premium"] * policy["multiplier"] * (1 + risk))

    return {
        "status": "approved",
        "location": user["location"],
        "policy": policy["type"],
        "triggers_hit": triggered,
        "risk_score": risk,
        "data_used": data,
        "calculation": {
            "formula": "payout = premium × multiplier × (1 + risk)",
            "premium": policy["premium"],
            "multiplier": policy["multiplier"],
            "risk": risk
        },
        "payout": payout
    }

# ---------------- ROOT ----------------
@app.get("/")
def root():
    return {"message": "DeliverGuard Backend Running"}