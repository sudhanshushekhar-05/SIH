# 🧠 MINDSET-NER: Complete Project Codebase Documentation

> **Smart India Hackathon (SIH 2026) | Problem Statement: SIH26003**  
> **Ministry:** Ministry of Development of North Eastern Region (MDoNER) & MoHFW  
> **Project Name:** MINDSET-NER (Multimodal Intelligent Network for Dementia Screening, Exercise & Therapy - North East Region)  
> **Live GitHub Repository:** [sudhanshushekhar-05/SIH](https://github.com/sudhanshushekhar-05/SIH)  
> **Live PWA Deployment:** [sudhanshushekhar-05.github.io/SIH](https://sudhanshushekhar-05.github.io/SIH/)  

---

## 📑 Table of Contents

1. [Executive Overview & Vision](#1-executive-overview--vision)
2. [High-Level System Architecture](#2-high-level-system-architecture)
3. [Repository File Taxonomy](#3-repository-file-taxonomy)
4. [Frontend Architecture & UI Subsystem](#4-frontend-architecture--ui-subsystem)
   - [Government Compliance (GIGW 3.0 & WCAG 2.1 AAA)](#government-compliance-gigw-30--wcag-21-aaa)
   - [Responsive Multi-Breakpoint Design](#responsive-multi-breakpoint-design)
   - [Continuous Right-to-Left Notice Marquee](#continuous-right-to-left-notice-marquee)
   - [Multilingual Localization Engine (7 Languages)](#multilingual-localization-engine-7-languages)
5. [Backend Architecture & API Subsystem](#5-backend-architecture--api-subsystem)
   - [FastAPI Server Core](#fastapi-server-core)
   - [Comprehensive API Endpoint Catalogue](#comprehensive-api-endpoint-catalogue)
6. [Machine Learning & AI Decision Pipelines](#6-machine-learning--ai-decision-pipelines)
   - [Model 1: Adaptive Game Difficulty (RandomForest Classifier)](#model-1-adaptive-game-difficulty-randomforest-classifier)
   - [Model 2: Multilingual Voice Intent Engine (TF-IDF + Logistic Regression)](#model-2-multilingual-voice-intent-engine-tf-idf--logistic-regression)
   - [Model 3: Longitudinal Cognitive Trend Analyzer](#model-3-longitudinal-cognitive-trend-analyzer)
7. [Database Schema & Data Models](#7-database-schema--data-models)
   - [SQLite Entity-Relationship Architecture](#sqlite-entity-relationship-architecture)
   - [Table Specifications](#table-specifications)
8. [Offline-First Sync Engine & Resiliency](#8-offline-first-sync-engine--resiliency)
9. [Installation, Development & Deployment](#9-installation-development--deployment)
10. [Automated Testing & Quality Assurance](#10-automated-testing--quality-assurance)

---

## 1. Executive Overview & Vision

**MINDSET-NER** is an end-to-end, offline-first assistive cognitive healthcare platform designed specifically for elderly individuals with Mild Cognitive Impairment (MCI) and early-stage dementia residing in the **8 North Eastern Region (NER) states of India** (Assam, Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, and Tripura).

### The Challenge
- Extreme geographical barriers (remote hilly terrains, zero/intermittent cellular connectivity).
- Diverse linguistic landscape (Assamese, Meitei/Manipuri, Mizo, Khasi, Bengali, Hindi, and English).
- Severe shortage of specialized geriatric neurologists and dementia day-care centers in rural NER districts.
- Need for non-pharmacological cognitive interventions that are culturally relatable and stigma-free.

### The Solution
- **Culturally Grounded Cognitive Games:** Traditional NER artifacts, Bihu rhythms, Loktak lake folklore, family recognition, and daily routine recall.
- **Bi-Directional ML Adaptive Engine:** Real-time RandomForest classification dynamically adjusting game difficulty to prevent frustration or boredom.
- **Multilingual Voice Companion ("Asha"):** Hands-free natural voice interaction with localized intent detection.
- **Offline-First SQLite Sync:** 100% operational in disconnected hill villages, synchronizing when connectivity is restored or via NavIC/satellite layer.
- **Caregiver & Doctor Portals:** Longitudinal cognitive trajectory dashboards, early warning anomaly flags, and GIGW 3.0 printable clinical reports.

---

## 2. High-Level System Architecture

```
+---------------------------------------------------------------------------------------+
|                                    CLIENT TIER                                        |
|                                                                                       |
|  +---------------------------------------------------------------------------------+  |
|  |                             MINDSET-NER Web App (PWA)                            |  |
|  |  • Pure Vanilla HTML5 / Modern CSS3 / Modular ES6 JavaScript                    |  |
|  |  • GIGW 3.0 & WCAG 2.1 AAA Accessibility (High Contrast, TTS, Dynamic Fonts)    |  |
|  |  • 7-Language Localization (Hindi, English, Assamese, Bengali, Meitei, Mizo,     |  |
|  |    Khasi)                                                                       |  |
|  |  • LocalStorage Offline Fallback Queue & IndexedDB SQLite Mirror                |  |
|  +---------------------------------------------------------------------------------+  |
+-------------------------------------------+-------------------------------------------+
                                            |
                                            | REST APIs (JSON / HTTPS)
                                            | [Fallback to Local Offline Engine]
                                            v
+---------------------------------------------------------------------------------------+
|                                  API GATEWAY TIER                                     |
|                                                                                       |
|  +---------------------------------------------------------------------------------+  |
|  |                            FastAPI Application (Python 3.10+)                   |  |
|  |  • Asynchronous Request Pipeline with CORS Middleware                          |  |
|  |  • Static Asset Serving & PWA Route Interception                                |  |
|  |  • Bulk Data Synchronization Endpoint (/api/sync)                               |  |
|  +---------------------------------------------------------------------------------+  |
+-------------------------------------------+-------------------------------------------+
                                            |
             +------------------------------+------------------------------+
             |                                                             |
             v                                                             v
+----------------------------+                               +----------------------------+
|     AI & ML PIPELINES      |                               |      PERSISTENCE TIER      |
|                            |                               |                            |
| • Adaptive Game Classifier |                               | • SQLite (mindset_ner.db)  |
|   (RandomForest - 100 trees|                               | • 9 Normalized Tables:     |
|   Difficulty: Easy/Med/Hard|                               |   - users                  |
|                            |                               |   - game_sessions          |
| • Asha Voice NLP Engine    |                               |   - reminders              |
|   (TF-IDF + Logistic Reg   |                               |   - personal_memories      |
|   7 Intent Classes)        |                               |   - cognitive_trends       |
|                            |                               |   - digital_memory_book    |
| • Cognitive Trend Analyzer |                               |   - mood_logs              |
|   (7-Day Baseline Sliding  |                               |   - family_posts           |
|   Window & Anomaly Detect) |                               |   - music_tracks           |
+----------------------------+                               +----------------------------+
```

---

## 3. Repository File Taxonomy

```
SIH/
├── index.html                  # Root standalone deployment file (GitHub Pages / Netlify)
├── start.bat                   # 1-click Windows launcher (starts FastAPI server & opens browser)
├── run.py                      # Python entry point for Uvicorn server execution
├── generate_data.py            # Synthetic cognitive dataset generator
├── train_model.py              # Adaptive game classifier training pipeline
├── train_intent_model.py       # Voice NLP intent model training pipeline
├── predict.py                  # CLI test utility for game difficulty prediction
├── predict_intent.py           # CLI test utility for voice intent queries
├── requirements.txt            # Production Python package dependencies
├── netlify.toml                # Netlify deployment configuration & cache-control headers
├── README.md                   # Public project overview, badges, and quick-start guide
├── CODEBASE.md                 # Complete project codebase reference documentation
│
├── backend/                    # Python FastAPI Backend Architecture
│   ├── main.py                 # FastAPI application, route handlers & API controllers
│   ├── database.py             # SQLite connection manager, schema DDL & mock data seeder
│   ├── mindset_ner.db          # Embedded SQLite database instance
│   └── ai_engine/              # Machine Learning Engine Modules
│       ├── adaptive_difficulty.py  # RandomForest game difficulty adaptation engine
│       ├── nlp_intent.py           # TF-IDF voice companion intent detection & TTS engine
│       └── trend_analyzer.py       # Longitudinal cognitive score & anomaly analyzer
│
├── static/                     # Frontend Static Web Application (PWA)
│   ├── index.html              # Main HTML5 portal structure (Role tabs, Games, Modals)
│   ├── style.css               # Comprehensive responsive design, GIGW themes & animations
│   ├── app.js                  # Core frontend state machine, game engine & API connectors
│   ├── translations.js         # Multilingual translation dictionary (7 NER languages)
│   ├── favicon.svg             # Vector brain emblem icon
│   └── favicon.ico             # Classic icon fallback
│
├── models/                     # Serialized Pre-Trained ML Artifacts
│   ├── adaptive_game_model.joblib # Trained RandomForestClassifier (accuracy: 100%)
│   └── intent_model.joblib        # Trained TF-IDF + LogisticRegression pipeline (95.08%)
│
├── data/                       # Training Data & Synthetic Corpus
│   ├── game_sessions.csv       # 2,142 simulated patient gameplay sessions
│   └── intent_phrases.csv      # Multilingual conversational voice phrases (7 categories)
│
├── tests/                      # Automated Test Suite
│   └── test_backend.py         # End-to-end FastAPI endpoint & ML validation test cases
│
└── flutter_app_structure/      # Mobile Companion Reference Structure
    ├── pubspec.yaml            # Flutter mobile application configuration
    └── lib/
        └── main.dart           # Flutter mobile app entry point
```

---

## 4. Frontend Architecture & UI Subsystem

The frontend is constructed using **clean Vanilla HTML5, Modern CSS3, and ES6 JavaScript** without heavy frameworks. This ensures instant load times (< 1.2s), 100% offline capability, zero external build dependencies, and complete runtime transparency.

### Government Compliance (GIGW 3.0 & WCAG 2.1 AAA)
- **High-Contrast Theme:** Instant dark-navy and high-contrast toggle (`.theme-high-contrast`) meeting 7:1 contrast ratios.
- **Dynamic Font Scaling:** Three font size tiers (Normal `1.0x`, Large `1.15x`, Extra Large `1.3x`) controlled via `#btn-font-dec`, `#btn-font-normal`, and `#btn-font-inc`.
- **Keyboard Navigation & ARIA:** Strict `role="tab"`, `aria-selected`, `role="region"`, and skip-to-content links (`#skip-to-content`).
- **Screen Reader Announcements:** Dynamic live region updates and speech synthesis audio confirmations.

### Responsive Multi-Breakpoint Design
Implemented inside [`static/style.css`](file:///c:/Users/sudha/OneDrive/Desktop/SIH/static/style.css):
- **Ultra-Small Phones (320px – 480px):** Single-column grid layouts, full-width touch cards, 48px minimum tap targets.
- **Tablets & Phablets (481px – 768px):** 2-column game selector grid, collapsible sidebar navigation.
- **Laptops & Desktops (1024px – 1440px):** Standard 4-column metrics cards, split testing labs, side-by-side caregiver charts.
- **Safe-Area Insets:** Native support for modern devices (`viewport-fit=cover`, `env(safe-area-inset-top)`).

### Continuous Right-to-Left Notice Marquee
Located in the `.gov-bulletin-bar`:
```css
.bulletin-content {
    display: inline-block;
    color: var(--gov-navy-dark);
    font-weight: 600;
    white-space: nowrap;
    padding-left: 100%;
    animation: marqueeScroll 28s linear infinite;
    will-change: transform;
}
```
- **Pause on Hover/Focus:** Hovering over the marquee freezes animation for effortless readability.
- **Accessible Control Button:** `#btn-pause-marquee` allows one-click pause/play with visual icon feedback and toast notifications.
- **Reduced Motion Support:** Respects user operating system preference (`@media (prefers-reduced-motion: reduce)`).

### Multilingual Localization Engine (7 Languages)
Implemented in [`static/translations.js`](file:///c:/Users/sudha/OneDrive/Desktop/SIH/static/translations.js) and wired through `changeLanguage()` in [`static/app.js`](file:///c:/Users/sudha/OneDrive/Desktop/SIH/static/app.js):
1. **Hindi (`hi`):** हिन्दी (Default national language)
2. **English (`en`):** Standard English
3. **Assamese (`as`):** অসমীয়া (Assam)
4. **Bengali (`bn`):** বাংলা (Tripura & Barak Valley)
5. **Meitei/Manipuri (`mni`):** মৈতৈলোন (Manipur)
6. **Mizo (`mzo`):** Mizo ṭawng (Mizoram)
7. **Khasi (`kha`):** Ka Ktien Khasi (Meghalaya)

All interactive modals (**AI Brain**, **NER Map**, **Satellite Layer**, and **Privacy Center**) dynamically adapt their titles, badges, metrics, test labs, and button labels in real time.

---

## 5. Backend Architecture & API Subsystem

Built with **FastAPI (Python 3.10+)**, the backend is designed to run locally on low-cost clinic hardware (e.g., Raspberry Pi 4 / mini PC) or centrally deployed in cloud environments.

### Comprehensive API Endpoint Catalogue

| HTTP Method | Route Endpoint | Purpose / Functionality | Key Request / Response Parameters |
|:---:|:---|:---|:---|
| `GET` | `/api/health` | Backend health check & active database status | `{"status": "healthy", "service": "MINDSET-NER"}` |
| `GET` | `/api/user/{user_id}` | Retrieve patient profile & caregiver link | `user_id`, `name`, `age`, `language`, `role` |
| `POST` | `/api/ai/adaptive-difficulty` | Evaluate gameplay & adapt difficulty | **Input:** `accuracy`, `response_time`, `mistake_count`, `current_difficulty`<br>**Output:** `next_difficulty`, `ai_reasoning`, `adaptation_params` |
| `POST` | `/api/ai/voice-intent` | Parse voice query intent & generate speech | **Input:** `user_id`, `query_text`<br>**Output:** `detected_intent`, `confidence`, `speech_response` |
| `GET` | `/api/caregiver/briefing/{user_id}` | Caregiver morning briefing summary | Today's routines, wellness status, active alerts |
| `GET` | `/api/caregiver/dashboard/{user_id}` | Caregiver dashboard metrics & charts | Engagement index, cognitive scores, recent games |
| `GET` | `/api/memory-book/{user_id}` | Retrieve Digital Memory Book moments | Family profiles, photos, audio URLs, prompts |
| `POST` | `/api/memory-book` | Add memory moment to patient profile | `title`, `relationship`, `category`, `image_url` |
| `POST` | `/api/mood/check-in` | Log daily patient emotional state | `mood_level` (`good`, `okay`, `sad`, `tired`), `notes` |
| `GET` | `/api/mood/trends/{user_id}` | 7-day mood history & trend overview | Timeline of mood logs & stability scores |
| `GET` | `/api/music/tracks` | Cognitive reminiscence audio tracks | Regional folk tracks, artist metadata, prompt questions |
| `GET` | `/api/family/posts/{user_id}` | Retrieve family connect feed items | Sender name, relationship, message, media |
| `POST` | `/api/family/posts` | Post supportive message from family | `sender_name`, `sender_relation`, `text_message` |
| `GET` | `/api/ai/model-info` | Metadata of trained ML model artifacts | Accuracy, tree count, dataset sample volume |
| `POST` | `/api/ai/retrain` | Live on-demand retraining of ML models | Re-fits scikit-learn pipelines on latest sessions |
| `GET` | `/api/ai/brain-analysis/{user_id}`| Multi-dimensional cognitive radar data | Memory, attention, pattern, and routine scores |
| `POST` | `/api/game/session` | Record completed game performance | Calculates scores and updates daily rolling trend |
| `GET` | `/api/reminders/{user_id}` | List scheduled medicine/water reminders | Time, frequency, title, completion status |
| `POST` | `/api/reminders` | Create new scheduled patient reminder | `title`, `type`, `time_scheduled`, `repeat_freq` |
| `PUT` | `/api/reminders/{id}/toggle` | Toggle reminder completion state | Updates status between `completed` and `pending` |
| `POST` | `/api/sync` | Bulk offline data synchronization | Ingests queued local game sessions & reminders |
| `GET` | `/api/doctor/longitudinal-report/{id}`| Clinical report for physician review | Multi-week trajectory, MMSE correlation, variance |

---

## 6. Machine Learning & AI Decision Pipelines

### Model 1: Adaptive Game Difficulty (RandomForest Classifier)
- **Module:** [`backend/ai_engine/adaptive_difficulty.py`](file:///c:/Users/sudha/OneDrive/Desktop/SIH/backend/ai_engine/adaptive_difficulty.py)
- **Model Artifact:** `models/adaptive_game_model.joblib`
- **Algorithm:** `RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42)`
- **Training Corpus:** 2,142 simulated elderly gameplay interactions (`data/game_sessions.csv`).
- **Feature Space:**
  - `accuracy` (0.0 – 1.0)
  - `response_time` (seconds)
  - `mistake_count` (integer count)
  - `current_difficulty` (encoded: `Easy=0`, `Medium=1`, `Hard=2`)
- **Output:** Predicted target difficulty (`Easy`, `Medium`, `Hard`) with heuristic clinical guardrails.
- **Feature Importances:**
  1. Current Difficulty: ~60.6%
  2. Latency / Reaction Speed: ~14.7%
  3. Mistake Count: ~12.7%
  4. Accuracy: ~12.0%

### Model 2: Multilingual Voice Intent Engine (TF-IDF + Logistic Regression)
- **Module:** [`backend/ai_engine/nlp_intent.py`](file:///c:/Users/sudha/OneDrive/Desktop/SIH/backend/ai_engine/nlp_intent.py)
- **Model Artifact:** `models/intent_model.joblib`
- **Algorithm:** Scikit-Learn `Pipeline([('tfidf', TfidfVectorizer(ngram_range=(1,2))), ('clf', LogisticRegression())])`
- **Intent Classes:**
  1. `MEDICINE_REMINDER` (Medication queries & scheduling)
  2. `HYDRATION_CHECK` (Drinking water reminders)
  3. `GAME_START` (Launch cognitive games)
  4. `FAMILY_MEMORY` (Photo & relative retrieval)
  5. `MUSIC_REQUEST` (Regional folk & reminiscence audio)
  6. `ROUTINE_QUERY` (Day schedule & daily agenda)
  7. `GENERAL_GREETING` (Friendly conversational companionship)
- **Accuracy:** **95.08%** test accuracy across Hindi, English, and Hinglish training corpus.

### Model 3: Longitudinal Cognitive Trend Analyzer
- **Module:** [`backend/ai_engine/trend_analyzer.py`](file:///c:/Users/sudha/OneDrive/Desktop/SIH/backend/ai_engine/trend_analyzer.py)
- **Methodology:** 7-Day Sliding Window Baseline with variance analysis.
- **Guardrails:** Strictly non-diagnostic; serves as an **Early Warning Indicator** to notify caregivers of significant cognitive drift.

---

## 7. Database Schema & Data Models

MINDSET-NER utilizes a normalized **SQLite3** relational database (`backend/mindset_ner.db`).

### SQLite Entity-Relationship Architecture

```
 +--------------------+       1:N       +------------------------+
 |       users        | <-------------+ |     game_sessions      |
 +--------------------+                 +------------------------+
 | PK user_id         |                 | PK session_id          |
 |    name            |                 | FK user_id             |
 |    age             |                 |    game_type           |
 |    language        |                 |    score, accuracy     |
 |    role            |                 |    response_time       |
 |    caregiver_id    |                 |    difficulty          |
 |    created_at      |                 |    timestamp           |
 +---------+----------+                 +------------------------+
           |
           | 1:N                        +------------------------+
           +--------------------------> |       reminders        |
           |                            +------------------------+
           |                            | PK reminder_id         |
           |                            | FK user_id             |
           |                            |    type, title, status |
           |                            |    time_scheduled      |
           |                            +------------------------+
           |
           | 1:N                        +------------------------+
           +--------------------------> |   personal_memories    |
           |                            +------------------------+
           |                            | PK memory_id           |
           |                            | FK user_id             |
           |                            |    category, label     |
           |                            |    value, image_url    |
           |                            +------------------------+
           |
           | 1:N                        +------------------------+
           +--------------------------> |  digital_memory_book   |
           |                            +------------------------+
           |                            | PK memory_id           |
           |                            | FK user_id             |
           |                            |    title, relationship |
           |                            |    last_met_date       |
           |                            |    question_prompts    |
           |                            +------------------------+
           |
           | 1:N                        +------------------------+
           +--------------------------> |    cognitive_trends    |
           |                            +------------------------+
           |                            | PK id                  |
           |                            | FK user_id, date       |
           |                            |    memory_score        |
           |                            |    attention_score     |
           |                            |    pattern_score       |
           |                            |    overall_engagement  |
           |                            +------------------------+
           |
           | 1:N                        +------------------------+
           +--------------------------> |       mood_logs        |
                                        +------------------------+
                                        | PK log_id              |
                                        | FK user_id             |
                                        |    date, mood_level    |
                                        |    mood_label, notes   |
                                        +------------------------+
```

---

## 8. Offline-First Sync Engine & Resiliency

To function flawlessly in remote hill villages where internet access is unavailable:
1. **Local State Mirroring:** The frontend automatically persists completed game scores, mood check-ins, and memory responses in `localStorage` when offline.
2. **Pending Sync Queue:** Any mutation performed offline is added to a persistent queue (`appState.offlineQueue`).
3. **Automatic Network Reconnection:** When the browser detects an `online` event (or when manually triggered via the **Offline Sync Drawer**), the client sends a batch payload to `/api/sync`.
4. **Data Integrity:** The backend processes batch records idempotently, updating daily aggregated scores and clinical reports without duplication.

---

## 9. Installation, Development & Deployment

### Prerequisites
- **Python:** 3.10, 3.11, 3.12, or 3.13
- **Modern Web Browser:** Google Chrome, Microsoft Edge, Firefox, or Safari

### Quick Start (Windows)
Double-click [`start.bat`](file:///c:/Users/sudha/OneDrive/Desktop/SIH/start.bat) in the project root:
```bat
@echo off
echo Starting MINDSET-NER Application Server...
py run.py
pause
```
*The launcher automatically detects the Python runtime, boots Uvicorn on `http://127.0.0.1:8000`, and opens the live portal in your default browser.*

### Manual Command-Line Setup
```bash
# 1. Clone repository
git clone https://github.com/sudhanshushekhar-05/SIH.git
cd SIH

# 2. Create virtual environment
python -m venv .venv
# Activate:
# Windows: .venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Start backend server
python run.py
```

### Static Web Hosting (GitHub Pages / Netlify)
The root [`index.html`](file:///c:/Users/sudha/OneDrive/Desktop/SIH/index.html) is completely standalone and configured to load frontend assets from `static/`. It can be hosted on any static web provider (GitHub Pages, Netlify, Vercel) while communicating seamlessly with local or remote FastAPI endpoints.

---

## 10. Automated Testing & Quality Assurance

The codebase includes an automated test suite located in [`tests/test_backend.py`](file:///c:/Users/sudha/OneDrive/Desktop/SIH/tests/test_backend.py):

```bash
# Run pytest test suite
pytest tests/test_backend.py -v
```

### Test Coverage Highlights:
- **Health & Readiness:** Verifies `/api/health` returns status code 200.
- **Adaptive AI Accuracy:** Validates that high performance transitions to `Hard` and low performance scales down to `Easy`.
- **NLP Intent Classification:** Tests voice query intent resolution for medicine reminders and family requests.
- **Database CRUD:** Validates reminder creation, toggle completion, and memory book insertions.
- **Sync Pipeline:** Validates bulk offline batch ingestion.

---

**MINDSET-NER — Developed for Smart India Hackathon 2026**  
*Empowering Caregivers, Supporting Doctors, Honoring Elders across North East India.*

