# 🛡️ TrustLayer-X

> **Real-Time Digital Authenticity & Scam Protection Platform.**

![Status](https://img.shields.io/badge/Status-Active%20Development-emerald)
![Security](https://img.shields.io/badge/Security-Audit%20Passed-blue)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Tailwind%20v4-61dafb)
![Backend](https://img.shields.io/badge/Backend-Express%20%2B%20MongoDB-339933)

**TrustLayer-X** is an enterprise-grade cybersecurity command center designed to detect and neutralize digital fraud. From "Digital Arrest" impersonation scams to voice-based vishing and deepfake synthetic media, TrustLayer-X provides a unified heuristic protection layer for the modern internet.

---

## 🏛️ System Architecture

TrustLayer-X follows a modular, three-tier architecture:

1. **Frontend (React 19)**: A professional, high-impact "Tech-Brutalist" dashboard built with Tailwind CSS v4 and Recharts for live threat intelligence.
2. **Backend (Express 5)**: A hardened Node.js API server featuring security headers (Helmet), rate limiting, and secure JWT-based authentication.
3. **ML Engine (Python)**: A heuristic-based neural pipeline for conversational analysis, phishing detection, and domain impersonation scanning.

---

## ⚡ Quick Start

### 1. Requirements

- Node.js (v18+)
- MongoDB (Running locally or via Atlas)
- Python 3.10+ (for ML Engine)

### 2. Installation

Clone the repository and install all dependencies using the root orchestrator:

```bash
git clone https://github.com/raghuvanshi-sec/FraudSentrix.git
cd FraudSentrix
npm run install:all
```

### 3. Environment Setup

Copy the configuration template and update your credentials:

```bash
cp .env.example trustlayerx-backend/.env
```

Ensure `MONGO_URI` and `JWT_SECRET` are properly configured in `trustlayerx-backend/.env`.

### 4. Deployment

Start both the dashboard and the secure backend simultaneously:

```bash
npm run dev
```

---

## 🧠 Threat Protection Suites

| Shield | Module | Description |
| :--- | :--- | :--- |
| 🛡️ | **Scam Detection** | Analyzes transcripts for "Digital Arrest" coercion scripts & bank impersonation. |
| 🎙️ | **Vishing & Deepfake** | Scans audio/video for synthetic artifacts and AI-generated social engineering. |
| 🎣 | **Phishing Alerts** | High-precision scanning of email bodies for malicious links and credential harvesting. |
| 🌐 | **Domain Check** | Real-time typosquatting detection and official identity verification. |
| 📄 | **Doc Verify** | Cryptographic integrity checks for sensitive digital documents. |

---

## 🔒 Security Posture

TrustLayer-X is built with a "Security-First" philosophy:

- **Hardened API**: Protected by `helmet` and `express-rate-limit`.
- **Zero-Trust Auth**: Secure JWT sessions with isolated salt/hash persistence.
- **Fail-Closed Logic**: Critical modules halt execution if security protocols are breached.

---

## 🤝 Roadmap & Contributing

Built with ❤️ by **Team CodeBlooded**
.

- [x] Unified Tech-Brutalist Design System
- [x] Professional SaaS Navigation & CTA Flows
- [x] Security Hardening & Audit Remediation
- [ ] Real-time WebSocket Threat Feeds
- [ ] Distributed Neural Core Implementation

---
*© 2026 FraudSentrix Ecosystem. Institutional Grade Protection for All.*
