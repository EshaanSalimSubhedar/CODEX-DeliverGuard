# ======================= BACKEND (main.py) =======================

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

users = []
policies = []

API_KEY = "YOUR_OPENWEATHER_API_KEY"

class UserInput(BaseModel):
    name: str
    location: str
    zone: str

class PolicyInput(BaseModel):
    triggers: list
    type: str

class ClaimInput(BaseModel):
    user_id: int

# ---------------- DATA ----------------
def get_real_data(city):
    try:
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
        res = requests.get(url).json()

        return {
            "temperature": res["main"]["temp"],
            "rain": res.get("rain", {}).get("1h", 0),
            "aqi": 180
        }
    except:
        return {"temperature":35,"rain":5,"aqi":180}

# ---------------- RISK ----------------
def calculate_risk(data):
    return round((data["rain"]/10 + data["temperature"]/40 + data["aqi"]/300)/3,2)

# ---------------- REGISTER ----------------
@app.post("/register")
def register(user: UserInput):
    u = {"id": len(users)+1, **user.dict()}
    users.append(u)
    return {"user": u}

# ---------------- POLICY ----------------
@app.post("/create-policy/{user_id}")
def create_policy(user_id: int, policy: PolicyInput):

    plans = {
        "Basic": (40,3),
        "Standard": (50,4),
        "Premium": (60,5)
    }

    if policy.type in plans:
        premium,m = plans[policy.type]
    else:
        premium = 30 + len(policy.triggers)*15
        m = 3 + len(policy.triggers)

    p = {
        "user_id": user_id,
        "type": policy.type,
        "triggers": policy.triggers,
        "premium": premium,
        "multiplier": m
    }

    policies.append(p)
    return {"policy": p}

# ---------------- CLAIM ----------------
@app.post("/auto-claim")
def claim(inp: ClaimInput):

    user = next((u for u in users if u["id"]==inp.user_id), None)
    policy = next((p for p in policies if p["user_id"]==inp.user_id), None)

    if not user or not policy:
        return {"status":"error"}

    d = get_real_data(user["location"])
    r = calculate_risk(d)

    triggered = []

    if "Rain" in policy["triggers"] and d["rain"]>5:
        triggered.append("Rain")

    if "Heatwave" in policy["triggers"] and d["temperature"]>35:
        triggered.append("Heatwave")

    if "AQI" in policy["triggers"] and d["aqi"]>300:
        triggered.append("AQI")

    # ✅ FIX: NO TRIGGERS → NO PAYOUT
    if not triggered:
        return {
            "status":"no_claim",
            "location":user["location"],
            "triggers_hit":[],
            "risk_score":r,
            "payout":0,
            "message":"No triggers met"
        }

    # NORMAL PAYOUT
    payout = int(policy["premium"]*policy["multiplier"]*(1+r))

    return {
        "status":"approved",
        "location":user["location"],
        "triggers_hit":triggered,
        "risk_score":r,
        "payout":payout
    }