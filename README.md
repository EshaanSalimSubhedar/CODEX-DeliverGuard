<h1 align="center">🛡 DeliverGuard</h1> <p align="center"> <b>Parametric Insurance Platform for Delivery Workers</b><br> Protecting income with automated, trigger-based payouts </p> <p align="center"> <img src="https://img.shields.io/badge/Frontend-React-blue?logo=react"> <img src="https://img.shields.io/badge/Backend-FastAPI-green?logo=fastapi"> <img src="https://img.shields.io/badge/Logic-Rule--Based-orange"> </p>
📌 Overview

DeliverGuard is a parametric insurance system that protects delivery workers from income loss using automated environmental triggers — eliminating manual claims.

🧩 Problem & Persona
🚨 Problem

Delivery workers face income loss due to:

🌧 Heavy Rain
🌫 High Pollution (AQI)
🌡 Heatwaves
🚫 Curfews / Restrictions

These disruptions reduce working hours, yet no automated insurance system compensates them instantly.

👤 Persona

Ravi — Delivery Partner (Chennai)

Daily earnings: ₹800–₹1000
Rain / AQI → fewer orders
Curfews → blocked routes

👉 Result: Unpredictable income loss

🔄 Workflow

User Registers
↓
Selects Policy (Predefined / Custom)
↓
Policy Activated
↓
System Monitors Triggers
↓
Trigger Matches Policy
↓
Claim Auto-Generated
↓
Payout Issued

💰 Premium Model
📊 Predefined Policies
Plan	Coverage	Price
Basic	Rain + AQI	₹40
Standard	Rain + AQI + Heatwave	₹55
Premium	All Triggers	₹70
🧩 Custom Policy

Premium = 30 + (15 × number_of_triggers)

👉 More flexibility → higher cost

⚡ Parametric Triggers
Trigger	Condition
🌧 Rainfall	> 80 mm
🌫 AQI	> 300
🌡 Temperature	> 40°C
🌊 Flood	Active
🚫 Curfew	Active

Key Insight: Claims are automatically triggered — no manual filing required.

📦 Policy System
🔹 Predefined Policies
Fixed coverage bundles
Lower cost
Easy selection
🔹 Custom Policies
User-selected triggers
Dynamic pricing
Higher payout potential
🔹 Claim Logic

if trigger in selected_policy:
  payout = base_value × policy_multiplier

⚙️ Tech Stack
Layer	Technology
🎨 Frontend	React.js
⚡ Backend	FastAPI (Python)
🧠 Logic	Rule-Based Parametric System
🌐 Data	Mock Data
🏗️ System Architecture

Frontend (React)
↓
Backend (FastAPI)
↓
Business Logic (Triggers + Pricing)
↓
Mock Data Simulation

🗺️ Key Features
📦 Policy Selection
Multiple predefined plans
Custom policy builder
⚡ Trigger-Based Automation
Real-time condition evaluation
Matches selected policy
💰 Automated Claims
Zero manual process
Instant payout generation
📜 Claim History
View past payouts
Track claims
🚧 Challenges
Designing realistic trigger thresholds
Balancing premium vs payout
Structuring flexible policies
Simulating real-world data
🏆 Accomplishments
Built complete insurance workflow
Implemented multiple policy types
Designed custom policy builder
Achieved automated claims
Developed clean UI
📈 Future Improvements
Real-time weather & AQI APIs
AI-based risk prediction
Fraud detection
Zone-based risk mapping
Mobile application
🏁 Conclusion

DeliverGuard transforms insurance from a manual, delayed process into an instant, automated protection system.

✔ Real-time payouts
✔ Flexible policies
✔ Zero-touch claims
✔ Built for gig workers

<p align="center">Built by Team CODEX</p>
