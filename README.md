# 🛡️ TrustLayerX

> **Combatting Digital Arrest Scams & Cyber Threats with Advanced Analytics**

![React Focus](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)
![Status](https://img.shields.io/badge/Status-Active%20Development-yellow)

**TrustLayerX** is a modern, premium cybersecurity dashboard and API backend designed to protect users from sophisticated digital threats, specifically targeting "digital arrest" impersonation scams, phishing attempts, domain spoofing, and document tampering.

It provides an enterprise-grade "Cyber Command Center" UI backed by a robust Node.js reporting structure.

---

## ⚡ Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (running locally or via Atlas)

### 1. Clone & Install

```bash
git clone https://github.com/raghuvanshi-sec/FraudSentrix.git
cd FraudSentrix

# Install dependencies for both Frontend and Backend automatically
npm run install:all
```

### 2. Environment Variables

Create a `.env` file in the `trustlayer-backend-main` directory:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/trustlayer
JWT_SECRET=your_super_secret_64_character_hex_string
```

### 3. Run the Development Servers

From the root `TrustLayerX` folder, start both the React frontend and Node backend simultaneously:

```bash
npm run dev
```

- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:3000`

---

## ✨ Core Features & Modules

### 1. The Cyber Dashboard (Frontend)

A highly professional, dark-themed React SPA using Tailwind CSS v4.

- **Tech-Noir Aesthetics:** Glassmorphism, dynamic scanner animations, and clear Gestalt principles.
- **Risk Color Coding:** Green (Safe), Yellow (Suspicious), Red (High Risk).
- **Top Navigation:** Sleek, responsive navigation bar.

### 2. Threat Analysis Suites

- 🎙️ **Scam Detection (Digital Arrest):** Analyzes conversational text transcripts for coercion, urgency cues, and impersonation scripts. Returns a calculated Risk Score and flags specific threat vectors.
- 🎣 **Phishing Analyzer:** Evaluates email or message bodies for malicious intent and tracking links.
- 🌐 **Domain Checker:** Analyzes domain reputation, identifies typosquatting, and checks TLS certificate validity.
- 📄 **Document Verification:** Generates cryptographic SHA-256 hashes of uploaded files to detect tampering against known safe registries.

### 3. Secure Backend API

- 🔒 **Production-Ready Schema:** User models enforce `firstName`, `lastName`, and strict password policies.
- 🛡️ **Data Layer Security:** Password hashing (bcrypt) is securely decoupled into Mongoose `pre('save')` hooks rather than living in the controller routes.
- 🔑 **JWT Authentication:** Stateful token generation with role-based infrastructure.

---

## 🏗️ Tech Stack

**Frontend:**

- React.js 19 (Vite)
- Tailwind CSS v4 (Custom Dark Theme Tokens)
- React Router v7
- Axios for API communication

**Backend:**

- Node.js & Express.js 5
- MongoDB & Mongoose
- JSON Web Tokens (JWT) & bcryptjs

---

## 📡 API Reference (Core)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user (`firstName`, `lastName`, `email`, `password`) |
| `POST` | `/api/auth/login` | Authenticate user and receive a JWT token |
| `POST` | `/api/scan/analyze` | Submit a text transcript for Scam/Digital Arrest threat modeling |

---

## 🤝 Contributing

TrustLayerX is built for security. We welcome contributions, especially regarding heuristic AI model improvements for the text analysis engine.

- Ensure all code conforms to the clean-code standards outlined in the repository.
- Submit pull requests to the `integration` branch.

*Built with ❤️ for a safer internet by Team CodeBlooded.*
