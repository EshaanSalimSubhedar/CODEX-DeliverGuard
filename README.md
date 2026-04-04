<h1 align="center">DeliverGuard</h1>
<p align="center">
  <b>Parametric Insurance Platform for Delivery Workers</b><br>
  Protecting income with automated trigger-based payouts
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?logo=react">
  <img src="https://img.shields.io/badge/Backend-FastAPI-green?logo=fastapi">
  <img src="https://img.shields.io/badge/Logic-Rule--Based-orange">
</p>

---

## 
> **DeliverGuard protects delivery workers from income loss using real-time triggers and automated payouts — no manual claims required.**

---

## 📑 Table of Contents
- [🧩 Problem & Persona](#-1-problem--persona)
- [🔄 Workflow](#-workflow)
- [💰 Premium Model & Triggers](#-2-premium-model--parametric-triggers)
- [📦 Policy System](#-3-policy-system)
- [⚙️ Tech Stack](#️-4-tech-stack)
- [🏗️ Architecture](#️-5-system-architecture)
- [🗺️ Features](#️-6-key-features)
- [🏁 Conclusion](#-7-conclusion)

---

## 🧩 1. Problem & Persona

### 🚨 Problem
Delivery workers face **income loss due to external disruptions** such as:
- 🌧 Heavy Rain  
- 🌫 High Pollution (AQI)  
- 🌡 Heatwaves  
- 🚫 Curfews / Restrictions  

These events reduce working hours, yet **no automated insurance system compensates them instantly**.

---

### 👤 Persona

**Name:** Ravi  
**Role:** Food Delivery Partner  
**Location:** Chennai  

**Scenario:**
- Daily earnings: ₹800–₹1000  
- Rain/AQI → fewer orders  
- Curfews → blocked routes  

👉 Result: **Unprotected income loss**

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
Claim Auto-Generated  
↓  
Payout Issued (Simulated)

---

## 💰 2. Premium Model & Parametric Triggers

### 📊 Pricing Logic

#### Predefined Policies (Bundled, Cheaper)

| Plan | Coverage | Price |
|------|--------|------|
| Basic | Rain + AQI | ₹40 |
| Standard | Rain + AQI + Heatwave | ₹55 |
| Premium | All Triggers | ₹70 |

---

#### 🧩 Custom Policy (Flexible, Higher Cost)

```python
Premium = 30 + (15 × number_of_triggers)
