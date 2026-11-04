# 🧠 MINDSET-NER: AI-Based Cognitive Gaming & Memory Assistance Platform

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen?logo=github)](https://sudhanshushekhar-05.github.io/SIH/)

> **Smart India Hackathon (SIH 2026) Problem Statement: SIH26003**  
> *Empowering elderly dementia patients in the North Eastern Region (NER) through personalized AI-driven cognitive exercises, multilingual voice companion, digital memory preservation, and caregiver analytics.*

---

## 🌐 Live Deployments

- **GitHub Pages Demo**: [https://sudhanshushekhar-05.github.io/SIH/](https://sudhanshushekhar-05.github.io/SIH/)


---

## 📌 Executive Summary

**MINDSET-NER** is an end-to-end, multi-modal cognitive gaming, memory assistance, and caregiver monitoring ecosystem. Specifically tailored for elderly individuals coping with mild cognitive impairment (MCI) and early-stage dementia in North East India (NER), the platform blends **machine learning adaptive difficulty**, **culturally contextualized memory games**, an **interactive multilingual voice assistant ("Asha")**, and **real-time caregiver trend monitoring**.

---

## ✨ Key Features

### 🎮 1. Culturally Contextualized Cognitive Games
- **Objects Memory**: Recognize everyday tools, traditional NER artifacts, and household items.
- **Family Memory**: Identify family members, relationships, and special shared events.
- **Routine Recall**: Strengthen daily living habits, medicine timing, and meal routines.
- **Pattern Recognition**: Adaptive shape, color, and sequence matching games.
- **Local NER Memory**: Cultural games featuring Guwahati, Kamakhya Temple, Bihu festivals, Loktak Lake, traditional attire, and regional music.

### 🤖 2. ML-Driven Adaptive Difficulty Engine
- Uses **RandomForest Classification** to assess user performance in real-time.
- Dynamically scales difficulty levels (`Easy` ➡️ `Medium` ➡️ `Hard`) based on response latency, accuracy percentage, and mistake patterns.
- Ensures stress-free engagement without overwhelming or under-stimulating the user.

### 🎙️ 3. Multilingual Voice Companion ("Asha")
- Intelligent NLP intent classifier supporting **Hindi, English, and Regional dialects**.
- Hands-free voice assistance for medicine reminders, hydration checks, daily routine queries, personal memories, and starting games.
- Built-in speech synthesis (TTS) and speech-to-text (STT) capabilities.

### 📖 4. Digital Memory Book & Family Feed
- **Interactive Memory Book**: Store family profiles, last-met dates, audio cues, and custom prompt questions.
- **Caregiver & Family Post Feed**: Share photo moments, voice notes, and encouraging messages directly to the patient's device.
- **Mood Check-ins**: Simple one-tap mood tracking (`Good`, `Okay`, `Sad`, `Tired`).

### 📊 5. Caregiver Analytics & Early Warning System
- **Cognitive Trend Analyzer**: Monitors multi-day engagement metrics across memory, attention, routine recall, and pattern recognition.
- **Automated Alerts**: Flags sudden performance drops or missed routines for immediate caregiver attention.
- **Daily Briefing Report**: Summary of patient wellness, active reminders, and recent cognitive progress.

---

## 🏗️ Project Architecture

```
                                +------------------------------+
                                |      MINDSET-NER Clients     |
                                +--------------+---------------+
                                               |
                     +-------------------------+-------------------------+
                     |                                                   |
       +-------------v--------------+                     +--------------v-------------+
       |   Web Application (PWA)    |                     |   Flutter Mobile App       |
       |  (HTML5 / CSS3 / Vanilla JS)|                     |  (Android / iOS Cross-App) |
       +-------------+--------------+                     +--------------+-------------+
                     |                                                   |
                     +-------------------------+-------------------------+
                                               | HTTP REST APIs
                                +--------------v---------------+
                                |     FastAPI AI Backend       |
                                |     (Python 3.10+)           |
                                +--------------+---------------+
                                               |
       +---------------------------------------+---------------------------------------+
       |                                       |                                       |
+------v-----------------------+   +-----------v-------------------+   +---------------+---------------+
| ML Adaptive Difficulty Engine|   | Voice Companion NLP Engine    |   | Cognitive Trend Analyzer      |
| (Scikit-Learn RandomForest)  |   | (Intent Classification / NER) |   | (Early Warning & Analytics)   |
+------------------------------+   +-------------------------------+   +-------------------------------+
                                               |
                                +--------------v---------------+
                                |   SQLite Persistent Database |
                                |       (mindset_ner.db)       |
                                +------------------------------+
```

---

## 📁 Repository Structure

```
SIH/
├── backend/                        # FastAPI Python Backend & AI Engine
│   ├── ai_engine/                  # Core Artificial Intelligence Modules
│   │   ├── adaptive_difficulty.py  # ML Adaptive Difficulty Engine (RandomForest)
│   │   ├── nlp_intent.py           # Multilingual Voice Intent & Memory Engine
│   │   └── trend_analyzer.py       # Cognitive Performance & Trend Analysis Engine
│   ├── database.py                 # SQLite Database Schemas, Seeds, & Access Layer
│   ├── main.py                     # FastAPI Application Routes & Middleware
│   └── mindset_ner.db              # SQLite Database Instance
├── static/                         # Web Application Frontend (PWA)
│   ├── index.html                  # Responsive Web Dashboard Interface
│   ├── style.css                   # Custom UI Styling, Themes & Glassmorphism
│   └── app.js                      # Dynamic Interactivity & API Connectivity
├── flutter_app_structure/          # Cross-Platform Flutter Mobile Application
│   ├── lib/                        # Flutter Dart Source Code
│   └── pubspec.yaml                # Flutter Dependencies (TTS, STT, Charts, SQLite)
├── tests/                          # Automated Testing Suite
│   └── test_backend.py             # Pytest / Unittest Client Integration Tests
└── .gitignore                      # Git Exclusion Rules
```

---

## 🛠️ Technology Stack

| Layer | Technology / Framework |
|---|---|
| **Backend** | Python 3.10+, FastAPI, Uvicorn, Pydantic |
| **Machine Learning / AI** | Scikit-Learn (RandomForest), NumPy, Regex NLP Intent Engine |
| **Database** | SQLite3 |
| **Web Frontend** | HTML5, CSS3 (CSS Variables, Flexbox/Grid), Vanilla JavaScript |
| **Mobile App** | Flutter 3.x, Dart (`provider`, `http`, `sqflite`, `flutter_tts`, `speech_to_text`, `fl_chart`) |
| **Testing** | Pytest, Unittest, FastAPI TestClient |

---

## 🚀 Getting Started

### Prerequisites
- **Python 3.10+** installed
- **Git** installed
- *(Optional)* **Flutter SDK 3.x** for building the mobile app

---

### 1️⃣ Setting Up the Backend

```bash
# Clone the repository
git clone https://github.com/sudhanshushekhar-05/SIH.git
cd SIH

# (Optional) Create a virtual environment
python -m venv venv
# Windows activate:
venv\Scripts\activate
# Linux/macOS activate:
# source venv/bin/activate

# Install required backend dependencies
pip install fastapi uvicorn pydantic numpy scikit-learn httpx
```

### 2️⃣ Running the Backend Server

```bash
# Launch the FastAPI application
python -m uvicorn backend.main:app --reload --port 8000
```
- API Base URL: `http://localhost:8000`
- Interactive API Docs (Swagger UI): `http://localhost:8000/docs`
- ReDoc API Documentation: `http://localhost:8000/redoc`

---

### 3️⃣ Accessing the Web Frontend

Simply open `static/index.html` in any web browser, or serve it via python:

```bash
# Serving static files or accessing via FastAPI root
python -m http.server 3000 --directory static
```
Navigate to `http://localhost:3000` to interact with the web app interface.

---

### 4️⃣ Running Automated Tests

To run unit and integration tests across backend modules, adaptive engine, NLP intents, and caregiver analytics:

```bash
python -m unittest tests/test_backend.py
```
*Alternatively with pytest:*
```bash
pytest tests/
```

---

## 📡 API Endpoint Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System health check & regional status |
| `GET` | `/api/user/{user_id}` | Fetch user profile & cognitive baseline |
| `POST` | `/api/ai/adaptive-difficulty` | Evaluate game performance & get next difficulty level |
| `POST` | `/api/ai/voice-intent` | Multilingual NLP voice query & memory companion endpoint |
| `GET` | `/api/games/sessions/{user_id}` | Retrieve historical game session records |
| `POST` | `/api/games/session` | Save new game session performance |
| `GET` | `/api/memory-book/{user_id}` | Retrieve patient digital memory book entries |
| `POST` | `/api/memory-book` | Add new memory entry (family/place/event) |
| `GET` | `/api/caregiver/dashboard/{user_id}` | Fetch caregiver analytics, domain breakdown, & alerts |
| `GET` | `/api/caregiver/briefing/{user_id}` | Generate daily briefing report for caregivers |

---

## 👥 Target Beneficiaries & Impact

- **Elderly Patients**: Slow down cognitive decline through personalized, enjoyable, culturally resonant games & companion support.
- **Family & Caregivers**: Reduce stress with automated routine tracking, early performance decline warnings, and active daily briefings.
- **NER Healthcare Community**: Accessible, localized digital health tool catering to North Eastern Indian cultural context and regional memory landmarks.

---

## 📜 License

This project is developed for **Smart India Hackathon (SIH 2026)** under Problem Statement **SIH26003**.  
Licensed under the [MIT License](LICENSE).
