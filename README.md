<h1 align="center">🛡 DeliverGuard</h1>

<p align="center">
  <b>Parametric Insurance Platform for Delivery Workers</b><br>
  Protecting income with automated, trigger-based payouts
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?logo=react">
  <img src="https://img.shields.io/badge/Backend-FastAPI-green?logo=fastapi">
  <img src="https://img.shields.io/badge/Logic-Rule--Based-orange">
</p>

---

## 📌 Overview

> **DeliverGuard is a parametric insurance system that protects delivery workers from income loss using automated environmental triggers — eliminating manual claims.**

---

## 📑 Table of Contents

- [🧩 Problem & Persona](#-problem--persona)
- [🔄 Workflow](#-workflow)
- [💰 Premium Model & Parametric Triggers](#-premium-model--parametric-triggers)
- [📦 Policy System](#-policy-system)
- [⚙️ Tech Stack](#️-tech-stack)
- [🏗️ System Architecture](#️-system-architecture)
- [🗺️ Key Features](#️-key-features)
- [🚧 Challenges](#-challenges)
- [🏆 Accomplishments](#-accomplishments)
- [📈 Future Improvements](#-future-improvements)
- [🏁 Conclusion](#-conclusion)

---

## 🧩 Problem & Persona

### 🚨 Problem

Delivery workers face **income loss due to external disruptions** such as:

- 🌧 Heavy Rain  
- 🌫 High Pollution (AQI)  
- 🌡 Heatwaves  
- 🚫 Curfews / Restrictions  

These conditions reduce working hours, yet there is **no automated insurance system** that compensates them in real time.

---

### 👤 Persona

**Name:** Ravi  
**Role:** Food Delivery Partner  
**Location:** Chennai  

**Scenario:**
- Daily earnings: ₹800–₹1000  
- Rain or AQI spikes → fewer orders  
- Curfews → restricted delivery zones  

👉 Result: **Unpredictable and unprotected income loss**

---

## 🔄 Workflow
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
Claim Automatically Generated
↓
Payout Issued (Simulated)

---

## 💰 Premium Model & Parametric Triggers

### 📊 Predefined Policies (Bundled & Cheaper)

| Plan | Coverage | Price |
|------|--------|------|
| Basic | Rain + AQI | ₹40 |
| Standard | Rain + AQI + Heatwave | ₹55 |
| Premium | All Triggers | ₹70 |

---

### 🧩 Custom Policy (Flexible, Higher Cost)

```python
Premium = 30 + (15 * number_of_triggers)
⚡ Parametric Triggers
Trigger	Condition
🌧 Rainfall	> 80 mm
🌫 AQI	> 300
🌡 Temperature	> 40°C
🌊 Flood	Active
🚫 Curfew	Active

Key Insight: Claims are triggered automatically — no manual filing required.

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
    payout = base_value * policy_multiplier
⚙️ Tech Stack
Layer	Technology
🎨 Frontend	React.js
⚡ Backend	FastAPI (Python)
🧠 Logic	Rule-Based Parametric System
🌐 Data	Mock Data (Simulated Conditions)
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
Matches selected policy coverage
💰 Automated Claims
Zero manual process
Instant payout generation
📜 Claim History
View past claims
Track payouts
🚧 Challenges
Designing realistic trigger thresholds
Balancing premium vs payout logic
Creating flexible yet simple policy structures
Simulating real-world conditions using mock data
🏆 Accomplishments
Built a complete end-to-end insurance workflow
Implemented multiple policy types
Designed a custom policy builder
Achieved automated claim generation
Developed a clean, user-friendly UI
📈 Future Improvements
Integration with real-time weather & AQI APIs
AI-based risk prediction models
Fraud detection system
Zone-based risk mapping
Mobile-first application
🏁 Conclusion

DeliverGuard transforms insurance from a manual, delayed process into an instant, automated protection system.

✔ Real-time trigger-based payouts
✔ Flexible policy customization
✔ Zero-touch claims
✔ Built for the gig economy
