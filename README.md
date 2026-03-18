<h1 align="center">🚀 DeliverGuard</h1>
<p align="center">
  <b>AI-Powered Parametric Insurance for Delivery Workers</b><br>
  Protecting income with real-time disruption intelligence
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?logo=react">
  <img src="https://img.shields.io/badge/Backend-FastAPI-green?logo=fastapi">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-blue?logo=postgresql">
</p>

---

## 
> **DeliverGuard protects delivery workers from income loss using real-time triggers, AI-driven risk scoring, and automated payouts.**

---

## Table of Contents
- [🧩 Problem & Persona](#-1-problem--persona)
- [🔄 Workflow](#-workflow)
- [💰 Premium Model & Triggers](#-2-premium-model--parametric-triggers)
- [🧠 AI/ML Integration](#-3-aiml-integration)
- [⚙️ Tech Stack](#️-4-tech-stack)
- [🏗️ Architecture](#️-5-system-architecture)
- [🗺️ Features](#️-6-key-features)
- [📅 Development Plan](#-7-development-plan)
- [🏁 Conclusion](#-8-conclusion)

---

## 1. Problem & Persona

### 🚨 Problem
Delivery workers face **income loss due to external disruptions** such as:
- 🌧 Heavy Rain  
- 🌫 High Pollution (AQI)  
- 🌡 Heatwaves  
- 🚫 Curfews / Zone Restrictions  

These events reduce working hours, yet **no real-time insurance solution exists**.

---

### 👤 Persona

**Name:** Ravi  
**Role:** Food Delivery Partner  
**Location:** Chennai  

**Scenario:**
- Daily earnings: ₹800–₹1000  
- Rain/AQI → fewer orders  
- Curfews → blocked routes  

Result: **Unprotected income loss**

---

## 🔄 Workflow

User → Select Location → Zone Assigned  
↓  
Risk Engine → Premium Calculation  
↓  
Policy Activated  
↓  
Real-Time Trigger Monitoring  
↓  
Claim Auto-Generated  
↓  
Fraud Detection  
↓  
Payout (Simulated)

---

## 2. Premium Model & Parametric Triggers

### Risk-Based Weekly Premium

```python
# Risk Score Calculation
Risk_Score = (
    0.3 * Rain_Risk +
    0.2 * AQI_Risk +
    0.2 * Heat_Risk +
    0.2 * Flood_Risk +
    0.1 * Social_Risk
)

Premium = 30 + (Risk_Score * 50)
```

| Risk Level | Premium |
|-----------|--------|
| 🟢 Low | ₹40/week |
| 🟡 Medium | ₹55/week |
| 🔴 High | ₹70/week |

---

### Parametric Triggers

| Trigger | Condition |
|--------|----------|
| 🌧 Rainfall | > 80 mm |
| 🌫 AQI | > 300 |
| 🌡 Temperature | > 40°C |
| 🌊 Flood Alert | Active |
| 🚫 Curfew | Zone restricted |

> **Key Insight:** Claims are triggered automatically — no manual filing required.

---

## 3. AI/ML Integration

### Risk Prediction
- Predicts disruption probability per zone  
- Inputs:
  - Weather data  
  - AQI  
  - Historical trends  
- Model: **Linear Regression**

---

### Fraud Detection

**Model:** Isolation Forest  

Detects:
- 📍 GPS spoofing  
- ❌ Claims from unaffected zones  
- 🔁 Duplicate claims  
- 🌤 Weather mismatch  

> Example: Rain claim + no rainfall → **rejected**

---

## 4. Tech Stack

| Layer | Technology |
|------|-----------|
| 🎨 Frontend | React.js + Tailwind CSS |
| ⚡ Backend | FastAPI (Python) |
| 🗄 Database | PostgreSQL |
| 🤖 AI/ML | scikit-learn, pandas, numpy |
| 🌐 APIs | OpenWeatherMap, AQICN |
| 💳 Payments | Razorpay / Stripe (sandbox) |

---

## 5. System Architecture

Frontend (React)  
↓  
Backend (FastAPI)  
↓  
PostgreSQL Database  
↓  
External APIs (Weather, AQI)  
↓  
AI Models (Risk + Fraud Detection)

---

## 6. Key Features

### Delivery Zone Risk Map
- Interactive heatmap  
- Shows:
  - Risk levels  
  - Active disruptions  
  - Premium suggestions  

---

### Multi-Trigger Monitoring
- Tracks:
  - Weather  
  - Pollution  
  - Heat  
  - Social disruptions  

---

### Automated Claims
- Zero manual process  
- Instant trigger-based payouts  

---

### Fraud Protection
- AI-based anomaly detection  
- Ensures claim authenticity  

---

## 7. Conclusion

DeliverGuard is a **smart, scalable, AI-powered insurance platform** that:

✔ Protects delivery workers from income loss  
✔ Uses real-time disruption data  
✔ Automates claims and payouts  
✔ Ensures fraud-resistant validation  

> DeliverGuard brings efficiency, transparency, and financial security to the gig economy.

---

<p align="center">Built By Team CODEX</p>
