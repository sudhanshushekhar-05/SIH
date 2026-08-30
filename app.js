/**
 * MINDSET-NER — Main Application JavaScript Engine (v2.0 Production Upgrade)
 * AI Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in NER
 * SIH Problem Statement ID: SIH26003
 */

const API_BASE = window.location.origin;

// Application State
const appState = {
    role: 'elderly', // elderly, caregiver, doctor
    lang: 'hi',
    nerMode: true,
    isOffline: false,
    currentDifficulty: 'Medium',
    todayScore: 78,
    user_id: 'p001',
    activeGameType: null,
    gameTimer: null,
    gameStartTime: null,
    offlineQueue: [],
    streak: 7,
    activeDmbIndex: 0,
    reminders: [
        { reminder_id: 'r001', type: 'medicine', title: 'Morning BP & Memory Supplement', time_scheduled: '09:00 AM', status: 'completed' },
        { reminder_id: 'r002', type: 'hydration', title: 'Drink 1 Glass of Water', time_scheduled: '11:00 AM', status: 'pending' },
        { reminder_id: 'r003', type: 'medicine', title: 'Afternoon Medication (Pill B)', time_scheduled: '02:00 PM', status: 'pending' },
        { reminder_id: 'r004', type: 'activity', title: 'Light Walk & Memory Game Session', time_scheduled: '05:00 PM', status: 'pending' }
    ],
    digitalMemories: [
        { memory_id: 'dmb001', category: 'family', title: 'Ananya Sharma', relationship: 'Daughter', last_met_date: 'Last Sunday', image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', q1: 'Who is this person?', q2: 'What is her name?', q3: 'When did you last see her?' },
        { memory_id: 'dmb002', category: 'family', title: 'Rahul Sharma', relationship: 'Son', last_met_date: '2 weeks ago', image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', q1: 'Who is this in the photograph?', q2: 'What is his name?', q3: 'Where does he live?' },
        { memory_id: 'dmb003', category: 'place', title: 'Guwahati Home & Garden', relationship: 'Home Place', last_met_date: 'Living here since 1985', image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400', q1: 'Which familiar place is this?', q2: 'Where is your home located?', q3: 'What is your favorite memory here?' },
        { memory_id: 'dmb004', category: 'food', title: 'Masor Tenga & Assam Rice', relationship: 'Favorite Dish', last_met_date: 'Yesterday lunch', image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', q1: 'What food is shown in this picture?', q2: 'What is your favorite regional dish?', q3: 'Who cooked this for you?' }
    ],
    familyPosts: [
        { post_id: 'fp001', sender_name: 'Ananya (Daughter)', sender_relation: 'Daughter', media_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', text_message: 'Good morning Papa! ❤️ Wishing you a wonderful morning. Looking forward to visiting this weekend!' },
        { post_id: 'fp002', sender_name: 'Aarav (Grandson)', sender_relation: 'Grandson', media_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', text_message: 'Dada ji! I won 1st prize in school drawing today! 🎉 Sending you big hugs!' }
    ],
    musicTracks: [
        { track_id: 'mt001', title: 'Assamese Folk Bihu Flute', artist_region: 'Assam Traditional', audio_url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3', question_prompt: '“क्या आपको यह बिहू संगीत याद है?” (Do you remember this Bihu melody?)' },
        { track_id: 'mt002', title: 'Classical Bamboo Flute Raga', artist_region: 'NER Classical', audio_url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a8c8a8.mp3', question_prompt: '“यह शांतिदायक संगीत आपको कैसा लग रहा है?” (How does this music feel?)' }
    ]
};

// Initializer
document.addEventListener('DOMContentLoaded', () => {
    console.log("MINDSET-NER App Initialized (v2.0)");
    renderReminders();
    renderDigitalMemoryBook();
    loadFamilyPosts();
    loadMusicTracks();
    fetchCaregiverDashboardData();
    fetchCaregiverBriefing();
    initSpeechSynthesis();
});

// --- Navigation & Multilingual Switcher ---
function switchRole(newRole) {
    appState.role = newRole;
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.app-view').forEach(view => view.classList.remove('active'));

    document.getElementById(`btn-role-${newRole}`).classList.add('active');
    document.getElementById(`view-${newRole}`).classList.add('active');

    if (newRole === 'caregiver') {
        fetchCaregiverDashboardData();
        fetchCaregiverBriefing();
    }
}

function switchElderlyTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'none');

    document.getElementById(`tab-${tabName}-btn`).classList.add('active');
    document.getElementById(`elderly-tab-${tabName}`).style.display = 'block';

    if (tabName === 'memorybook') renderDigitalMemoryBook();
    if (tabName === 'family') loadFamilyPosts();
    if (tabName === 'music') loadMusicTracks();
}

function changeLanguage(langCode) {
    appState.lang = langCode;
    const titleMap = {
        'hi': 'AI साथी आशा (Asha Companion)',
        'en': 'AI Companion Asha',
        'as': 'AI সংগী আশা (Asha)',
        'bn': 'AI সঙ্গী আশা (Asha)',
        'mni': 'AI Companion Asha (Meitei)',
        'mzo': 'AI Thian Asha (Mizo)',
        'kha': 'AI Lok Asha (Khasi)'
    };
    document.getElementById('companion-name-title').innerText = titleMap[langCode] || 'AI Asha Companion';
    speakText(`भाषा बदल दी गई है। (Language changed)`);
}

function toggleTheme() {
    document.body.classList.toggle('theme-dark');
}

function toggleNerMode() {
    appState.nerMode = !appState.nerMode;
    const badge = document.getElementById('ner-badge');
    if (appState.nerMode) {
        badge.innerText = "🌸 NER Content: ON";
        badge.style.background = "linear-gradient(135deg, #d97706, #b45309)";
    } else {
        badge.innerText = "🌐 NER Content: OFF";
        badge.style.background = "#64748b";
    }
}

// --- Judging Modals & Offline Drawer Simulator ---
function openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.add('active');
}

function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove('active');
}

function openOfflineDrawer() {
    document.getElementById('off-queue-count').innerText = `${appState.offlineQueue.length} records`;
    const title = document.getElementById('off-drawer-status-title');
    if (appState.isOffline) {
        title.innerText = "🟠 Current Status: OFFLINE MODE";
        title.style.color = "#d97706";
    } else {
        title.innerText = "🟢 Current Status: ONLINE";
        title.style.color = "#16a34a";
    }
    openModal('modal-offline-drawer');
}

function toggleOfflineMode() {
    appState.isOffline = !appState.isOffline;
    const pill = document.getElementById('offline-pill');
    const text = document.getElementById('network-text');
    
    if (appState.isOffline) {
        pill.classList.add('offline');
        text.innerText = "Offline Mode";
        document.getElementById('off-drawer-status-title').innerText = "🟠 Current Status: OFFLINE MODE";
        speakText("ऑफ़लाइन मोड चालू हो गया है। आपके गेम और डिजिटल मेमोरी बुक अभी भी काम करेंगे।");
    } else {
        pill.classList.remove('offline');
        text.innerText = "Online";
        document.getElementById('off-drawer-status-title').innerText = "🟢 Current Status: ONLINE";
        speakText("इंटरनेट कनेक्ट हो गया है। डेटा सिंक्रनाइज़ किया जा रहा है।");
        
        // Show animated progress bar
        const progressWrap = document.getElementById('sync-progress-wrap');
        const progressFill = document.getElementById('sync-progress-fill');
        if (progressWrap && progressFill) {
            progressWrap.style.display = 'block';
            let width = 0;
            const interval = setInterval(() => {
                width += 20;
                progressFill.style.width = `${width}%`;
                if (width >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        progressWrap.style.display = 'none';
                        syncOfflineQueue();
                    }, 500);
                }
            }, 200);
        } else {
            syncOfflineQueue();
        }
    }
}

// --- Voice Companion Engine ---
function initSpeechSynthesis() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {};
    }
}

function speakText(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = appState.lang === 'en' ? 'en-US' : 'hi-IN';
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    
    const bubbleText = document.getElementById('speech-text');
    if (bubbleText) bubbleText.innerText = `“${text}”`;

    window.speechSynthesis.speak(utterance);
}

function speakCurrentText() {
    const bubbleText = document.getElementById('speech-text');
    if (bubbleText) {
        speakText(bubbleText.innerText.replace(/“|”/g, ''));
    }
}

function sendQuickQuery(queryText) {
    if (appState.isOffline) {
        let response = "नमस्ते! मैं आपकी AI साथी आशा हूँ। ";
        if (queryText.includes("दवाई")) response = "आपकी अगली दवाई दोपहर 2:00 बजे है।";
        else if (queryText.includes("बेटी")) response = "आपकी बेटी का नाम अनन्या (Ananya) है।";
        else if (queryText.includes("दिनचर्या")) response = "आज 11 बजे आपका विलेज मार्केट गेम और शाम 5 बजे सैर का समय है।";
        else if (queryText.includes("पानी")) response = "आपको अब 1 गिलास ताज़ा पानी पीना चाहिए।";
        speakText(response);
        return;
    }

    fetch(`${API_BASE}/api/ai/voice-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: appState.user_id, query_text: queryText })
    })
    .then(res => res.json())
    .then(data => {
        if (data.speech_response) {
            speakText(data.speech_response);
        }
    })
    .catch(err => {
        console.warn("API offline fallback", err);
        speakText("आपकी दवाई का समय 2:00 बजे है।");
    });
}

function listenVoiceCommand() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        speakText("माइक्रोफोन उपलब्ध नहीं है। क्विक बटन का प्रयोग करें।");
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = appState.lang === 'en' ? 'en-US' : 'hi-IN';
    recognition.interimResults = false;

    const micBtn = document.getElementById('mic-trigger-btn');
    micBtn.innerHTML = "🎙️ Listening... (सुन रहा हूँ)";
    micBtn.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        sendQuickQuery(transcript);
        micBtn.innerHTML = "<i class='fa-solid fa-microphone'></i> 🎤 Talk to MINDSET";
        micBtn.style.background = "linear-gradient(135deg, #2563eb, #1d4ed8)";
    };

    recognition.onerror = () => {
        micBtn.innerHTML = "<i class='fa-solid fa-microphone'></i> 🎤 Talk to MINDSET";
        micBtn.style.background = "linear-gradient(135deg, #2563eb, #1d4ed8)";
    };

    recognition.start();
}

// --- Cognitive Games Arena ---

function startSelectedGame(gameType) {
    appState.activeGameType = gameType;
    document.getElementById('game-selector-grid').style.display = 'none';
    document.getElementById('active-game-arena').style.display = 'flex';
    document.getElementById('ai-adaptation-card').style.display = 'none';

    const stage = document.getElementById('game-stage-container');
    const title = document.getElementById('game-title');
    appState.gameStartTime = Date.now();

    if (gameType === 'market') {
        title.innerText = "🌳 Village Market Challenge (उत्तर पूर्वी बाज़ार खेल)";
        runMarketGame(stage);
    } else if (gameType === 'local_ner') {
        title.innerText = "🌸 Local NER Cultural Memory (उत्तर-पूर्वी स्थान)";
        runLocalNerGame(stage);
    } else if (gameType === 'family') {
        title.innerText = "👩‍👧 Family Memory Recognition (पारिवारिक पहचान)";
        runFamilyMemoryGame(stage);
    } else if (gameType === 'routine') {
        title.innerText = "🌅 Daily Routine Recall (दिनचर्या का क्रम)";
        runRoutineRecallGame(stage);
    } else if (gameType === 'pattern') {
        title.innerText = "🔴 Pattern Recognition (पैटर्न समझें)";
        runPatternGame(stage);
    }
}

function exitGameArena() {
    if (appState.gameTimer) clearInterval(appState.gameTimer);
    document.getElementById('active-game-arena').style.display = 'none';
    document.getElementById('game-selector-grid').style.display = 'grid';
}

// GAME 1: Village Market Challenge (10s preview market stall -> items vanish -> recall)
function runMarketGame(stage) {
    const marketItems = [
        { icon: "🍎", name: "Apple (सेब)" },
        { icon: "🥭", name: "Mango (आम)" },
        { icon: "🥛", name: "Milk (दूध)" },
        { icon: "🌾", name: "Rice (चावल)" },
        { icon: "🍵", name: "Assam Tea (चाय)" }
    ];

    stage.innerHTML = `
        <div style="text-align:center; width: 100%;">
            <h3 style="font-size: 1.6rem; color: #d97706; margin-bottom: 0.5rem;">🌳 उत्तर-पूर्वी बाज़ार में ५ वस्तुएँ रखें (Memorize Market Stall Items):</h3>
            <div style="display:flex; justify-content:center; gap: 1.5rem; font-size: 3.8rem; background: #fef3c7; padding: 1.5rem; border-radius: 20px; border: 3px solid #f59e0b; margin: 1rem 0;">
                ${marketItems.map(i => `<div>${i.icon}<div style="font-size:1rem; font-weight:800; color:#92400e;">${i.name.split(' ')[0]}</div></div>`).join('')}
            </div>
            <p style="font-size: 1.3rem; font-weight: 800; color: #dc2626;">⏱️ 10 सेकंड में ये वस्तुएँ बाज़ार की टोकरी में छिप जाएँगी...</p>
        </div>
    `;

    speakText("विलेज मार्केट की इन 5 वस्तुओं को ध्यान से देखिए। 10 सेकंड बाद आपको इन्हें ढूँढना है।");

    let count = 10;
    const timerDisplay = document.getElementById('game-timer-display');
    timerDisplay.innerText = `⏱️ 00:${count < 10 ? '0' + count : count}`;

    appState.gameTimer = setInterval(() => {
        count--;
        timerDisplay.innerText = `⏱️ 00:${count < 10 ? '0' + count : count}`;
        if (count <= 0) {
            clearInterval(appState.gameTimer);
            showMarketQuestion(stage, marketItems);
        }
    }, 1000);
}

function showMarketQuestion(stage, marketItems) {
    const target = marketItems[0]; // Apple
    const choices = [
        target,
        { icon: "🏀", name: "Basketball" },
        { icon: "🚗", name: "Car" },
        { icon: "👟", name: "Shoe" }
    ].sort(() => Math.random() - 0.5);

    stage.innerHTML = `
        <div style="text-align:center; width: 100%;">
            <div style="font-size: 4rem; margin-bottom: 0.5rem;">🧺 🧺 🧺 🧺 🧺</div>
            <h3 style="font-size: 1.6rem; margin-bottom: 1.5rem; color: #1e40af;">बाज़ार में इनमें से कौन सी वस्तु रखी गई थी? (Which item was in the market stall?)</h3>
            <div class="option-buttons-row">
                ${choices.map(c => `<button class="option-btn" onclick="submitGameAnswer('${c.name === target.name ? 'correct' : 'wrong'}', '${target.name}')">${c.icon} ${c.name}</button>`).join('')}
            </div>
        </div>
    `;
    speakText("बाज़ार में इनमें से कौन सी वस्तु रखी गई थी?");
}

// GAME 2: Local NER Cultural Memory
function runLocalNerGame(stage) {
    const item = { name: "कामाख्या मंदिर (Kamakhya Temple, Assam)", icon: "🛕", hint: "असम का प्रसिद्ध तीर्थ स्थल" };

    stage.innerHTML = `
        <div style="text-align:center;">
            <div style="font-size: 5rem; margin-bottom: 0.5rem;">${item.icon}</div>
            <h3 style="font-size: 1.8rem; color: #d97706; margin-bottom: 0.5rem;">${item.name}</h3>
            <p style="font-size: 1.2rem; font-weight: 700; margin-bottom: 1.5rem;">${item.hint}</p>
            <h4 style="font-size: 1.4rem; margin-bottom: 1rem;">यह उत्तर-पूर्वी क्षेत्र की कौन सी प्रसिद्ध धरोहर है?</h4>
            <div class="option-buttons-row">
                <button class="option-btn" onclick="submitGameAnswer('correct', '${item.name}')">🛕 कामाख्या मंदिर (Assam)</button>
                <button class="option-btn" onclick="submitGameAnswer('wrong', '')">🏔️ कंचनजंगा (Sikkim)</button>
            </div>
        </div>
    `;
    speakText("उत्तर-पूर्वी सांस्कृतिक धरोहर पहचानिए।");
}

// GAME 3: Family Memory Recognition
function runFamilyMemoryGame(stage) {
    const fam = appState.digitalMemories[0] || { title: 'Ananya', relationship: 'Daughter', image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400' };
    
    stage.innerHTML = `
        <div style="text-align:center;">
            <img src="${fam.image_url}" style="width:160px; height:160px; border-radius:50%; object-fit:cover; border:4px solid #2563eb; margin-bottom:1rem;">
            <h3 style="font-size: 1.6rem; margin-bottom: 1rem;">यह आपके परिवार का कौन सा सदस्य है?</h3>
            <div class="option-buttons-row">
                <button class="option-btn" onclick="submitGameAnswer('correct', '${fam.title}')">👩 ${fam.relationship} ${fam.title}</button>
                <button class="option-btn" onclick="submitGameAnswer('wrong', '')">👩‍⚕️ नर्न्स (Nurse)</button>
            </div>
        </div>
    `;
    speakText("चित्र में दिख रहे अपने पारिवारिक सदस्य को पहचानिए।");
}

// GAME 4: Routine Recall
function runRoutineRecallGame(stage) {
    stage.innerHTML = `
        <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">सुबह उठने के बाद सही क्रम क्या है?</h3>
        <p style="font-size: 1.2rem; font-weight: 600; color: #475569; margin-bottom: 1.5rem;">1. जागना 🌅 → 2. ब्रुश 🪥 → 3. दवाई 💊</p>
        <div class="option-buttons-row">
            <button class="option-btn" onclick="submitGameAnswer('correct', 'Routine')">✅ जागना → ब्रुश → दवाई</button>
            <button class="option-btn" onclick="submitGameAnswer('wrong', '')">❌ दवाई → सोना → जागना</button>
        </div>
    `;
    speakText("दिनचर्या का सही क्रम चुनें।");
}

// GAME 5: Pattern Recognition
function runPatternGame(stage) {
    stage.innerHTML = `
        <h3 style="font-size: 1.6rem; margin-bottom: 1rem;">इस पैटर्न को पूरा करें:</h3>
        <div style="font-size: 3.5rem; margin-bottom: 1.5rem;">🔴  🔵  🔴  🔵  ❓</div>
        <div class="option-buttons-row">
            <button class="option-btn" onclick="submitGameAnswer('correct', 'Red')">🔴 लाल (Red Circle)</button>
            <button class="option-btn" onclick="submitGameAnswer('wrong', '')">🟢 हरा (Green Circle)</button>
        </div>
    `;
    speakText("पैटर्न का अगला रंग चुनिए।");
}

// Answer Submission & Visual AI Adaptation Card Update
function submitGameAnswer(result, detail) {
    const elapsed = Math.max(2.5, (Date.now() - appState.gameStartTime) / 1000.0);
    const isCorrect = (result === 'correct');
    const accuracy = isCorrect ? 95.0 : 45.0;
    const mistakes = isCorrect ? 0 : 2;

    const payload = {
        accuracy: accuracy,
        response_time: elapsed,
        mistake_count: mistakes,
        current_difficulty: appState.currentDifficulty
    };

    if (isCorrect) {
        speakText("बहुत बढ़िया! उत्तर बिल्कुल सही है।");
    } else {
        speakText("कोई बात नहीं! फिर से प्रयास करेंगे।");
    }

    if (!appState.isOffline) {
        fetch(`${API_BASE}/api/ai/adaptive-difficulty`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            appState.currentDifficulty = data.next_difficulty;
            document.getElementById('current-diff-display').innerText = `AI Level: ${data.next_difficulty} (Adaptive)`;
            
            const aiCard = document.getElementById('ai-adaptation-card');
            document.getElementById('ai-val-acc').innerText = `${accuracy}%`;
            document.getElementById('ai-val-speed').innerText = `${elapsed.toFixed(1)}s`;
            
            if (data.adaptation_params) {
                document.getElementById('ai-val-next').innerText = `Objects: ${data.adaptation_params.objects_before} → ${data.adaptation_params.objects_after} | ${data.adaptation_params.difficulty_transition}`;
            }
            document.getElementById('ai-reason-text').innerText = `🤖 ${data.ai_reasoning}`;
            aiCard.style.display = 'block';

            saveSessionLog(appState.activeGameType, isCorrect ? 95 : 45, accuracy, elapsed, appState.currentDifficulty);
        })
        .catch(err => {
            console.warn("Offline adaptive fallback", err);
            saveSessionLog(appState.activeGameType, isCorrect ? 95 : 45, accuracy, elapsed, appState.currentDifficulty);
        });
    } else {
        saveSessionLog(appState.activeGameType, isCorrect ? 95 : 45, accuracy, elapsed, appState.currentDifficulty);
    }
}

function saveSessionLog(gameType, score, accuracy, responseTime, diff) {
    const session = {
        session_id: `s_${Date.now()}`,
        user_id: appState.user_id,
        game_type: gameType,
        score: score,
        accuracy: accuracy,
        response_time: responseTime,
        difficulty: diff,
        mistake_count: score > 50 ? 0 : 2
    };

    if (appState.isOffline) {
        appState.offlineQueue.push(session);
        localStorage.setItem('mindset_offline_queue', JSON.stringify(appState.offlineQueue));
    } else {
        fetch(`${API_BASE}/api/game/session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(session)
        }).catch(err => console.warn("Session log save failed", err));
    }
}

// --- Digital Memory Book Engine ⭐ Signature Feature ---
function renderDigitalMemoryBook() {
    const grid = document.getElementById('dmb-grid-container');
    const showcase = document.getElementById('dmb-active-card');
    if (!grid || !showcase) return;

    if (appState.digitalMemories.length === 0) return;

    const current = appState.digitalMemories[appState.activeDmbIndex] || appState.digitalMemories[0];

    // Active Card AI Prompt Q&A Showcase
    showcase.innerHTML = `
        <img src="${current.image_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'}" class="dmb-showcase-img" alt="${current.title}">
        <h3 style="font-size: 1.8rem; color: #d97706; margin-top: 0.5rem;">${current.title} (${current.relationship})</h3>
        <p style="font-size: 1.1rem; color: #64748b; font-weight: 700;">Last Met / Memory Note: ${current.last_met_date || 'Recent'}</p>
        
        <div style="background: white; padding: 1.2rem; border-radius: 16px; border: 2px solid #f59e0b; width: 100%; margin-top: 1rem;">
            <h4 style="font-size: 1.3rem; margin-bottom: 0.8rem; color: #1e40af;">🤖 AI Memory Prompt Exercise:</h4>
            <p style="font-size: 1.4rem; font-weight: 800; margin-bottom: 1rem;">“${current.q1 || 'Who is this in the photograph?'}”</p>
            <div class="option-buttons-row">
                <button class="option-btn" onclick="answerDmbPrompt('correct', '${current.title}')">👩 ${current.title}</button>
                <button class="option-btn" onclick="answerDmbPrompt('wrong', '')">❓ अनजान (Unknown)</button>
            </div>
        </div>
    `;

    // Thumbnails Grid
    grid.innerHTML = appState.digitalMemories.map((m, idx) => `
        <div class="dmb-card-thumb ${idx === appState.activeDmbIndex ? 'active-thumb' : ''}" onclick="selectDmbCard(${idx})">
            <img src="${m.image_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'}" alt="${m.title}">
            <div class="dmb-thumb-body">
                <h4 style="font-size: 1.1rem; font-weight: 800; color: #d97706;">${m.title}</h4>
                <p style="font-size: 0.95rem; font-weight: 700; color: #475569;">${m.relationship}</p>
            </div>
        </div>
    `).join('');
}

function selectDmbCard(index) {
    appState.activeDmbIndex = index;
    renderDigitalMemoryBook();
    const item = appState.digitalMemories[index];
    if (item) speakText(`स्मृति कार्ड: ${item.title}`);
}

function answerDmbPrompt(result, text) {
    if (result === 'correct') {
        speakText(`बहुत बढ़िया! यह आपकी ${text} हैं। कितनी सुंदर यादें हैं!`);
    } else {
        speakText(`कोई बात नहीं! यह आपकी ${appState.digitalMemories[appState.activeDmbIndex].title} की तस्वीर है।`);
    }
}

function handleCreateMemoryBook(event) {
    event.preventDefault();
    const cat = document.getElementById('dmb-category').value;
    const title = document.getElementById('dmb-title').value;
    const rel = document.getElementById('dmb-rel').value;
    const url = document.getElementById('dmb-url').value;

    const newMem = {
        memory_id: `dmb_${Date.now()}`,
        category: cat,
        title: title,
        relationship: rel,
        last_met_date: 'Recently added',
        image_url: url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
        q1: `Who is this ${rel}?`,
        q2: `What is their name?`,
        q3: `When did you last see them?`
    };

    appState.digitalMemories.unshift(newMem);
    renderDigitalMemoryBook();
    alert("Digital Memory Book card added successfully!");
    document.getElementById('add-dmb-form').reset();
}

// --- Memory Through Music Engine 🎵 ---
function loadMusicTracks() {
    const track = appState.musicTracks[0];
    if (!track) return;

    document.getElementById('music-track-title').innerText = track.title;
    document.getElementById('music-track-region').innerText = track.artist_region;
    document.getElementById('music-prompt-question').innerText = track.question_prompt;
    
    const audioEl = document.getElementById('reminiscence-audio');
    if (audioEl && audioEl.src !== track.audio_url) {
        audioEl.src = track.audio_url;
    }
}

function respondMusicMemory(type) {
    if (type === 'yes') {
        speakText("यह बहुत सुंदर अनुभव है! संगीत पुरानी मधुर यादों को ताजा करता है।");
    } else {
        const audioEl = document.getElementById('reminiscence-audio');
        if (audioEl) audioEl.play();
        speakText("संगीत फिर से प्ले किया जा रहा है।");
    }
}

// --- Family Connect Feed Engine 👨‍👩‍👧 ---
function loadFamilyPosts() {
    const feed = document.getElementById('family-feed-list');
    if (!feed) return;

    feed.innerHTML = appState.familyPosts.map(p => `
        <div class="family-post-card">
            <img src="${p.media_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'}" class="family-post-avatar" alt="${p.sender_name}">
            <div>
                <h4 style="font-size: 1.2rem; color: #d97706;">${p.sender_name}</h4>
                <p style="font-size: 1.15rem; font-weight: 700; margin: 0.4rem 0;">“${p.text_message}”</p>
                <button class="voice-reply-btn" onclick="replyFamilyVoice('${p.sender_name}')">🎙️ Voice Reply to ${p.sender_name.split(' ')[0]}</button>
            </div>
        </div>
    `).join('');
}

function replyFamilyVoice(sender) {
    speakText(`${sender} को आपका वॉयस संदेश भेज दिया गया है: प्यार और आशीर्वाद!`);
}

// --- Daily Mood Check-In Engine 😊 ---
function submitMoodCheckIn(level, label) {
    const box = document.getElementById('mood-feedback-box');
    const text = document.getElementById('mood-feedback-text');
    if (box && text) {
        text.innerText = `धन्यवाद! आपका मूड (${label}) रिकॉर्ड कर लिया गया है।`;
        box.style.display = 'block';
    }
    speakText(`आज आपका मूड ${label} दर्ज किया गया है। अपना ध्यान रखें!`);

    if (!appState.isOffline) {
        fetch(`${API_BASE}/api/mood/check-in`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: appState.user_id, mood_level: level, mood_label: label })
        }).catch(err => console.warn("Mood check-in save fallback", err));
    }
}

// --- Reminders Controller ---
function renderReminders() {
    const listEl = document.getElementById('elderly-reminders-list');
    if (!listEl) return;

    listEl.innerHTML = appState.reminders.map(r => `
        <div class="reminder-item ${r.status === 'completed' ? 'completed' : ''}">
            <div class="reminder-info">
                <h4>${r.type === 'medicine' ? '💊' : (r.type === 'hydration' ? '💧' : '🚶')} ${r.title}</h4>
                <p>समय (Time): <strong>${r.time_scheduled}</strong></p>
            </div>
            <button class="check-btn" onclick="toggleReminderDone('${r.reminder_id}')">
                ${r.status === 'completed' ? '✓ पुरा हुआ (Done)' : 'Mark Done'}
            </button>
        </div>
    `).join('');
}

function toggleReminderDone(remId) {
    const rem = appState.reminders.find(r => r.reminder_id === remId);
    if (rem) {
        rem.status = rem.status === 'completed' ? 'pending' : 'completed';
        renderReminders();
        speakText(rem.status === 'completed' ? `${rem.title} पूर्ण हो गया है!` : `रिमाइंडर रिसेट हो गया।`);
    }
}

// --- Caregiver Daily Briefing & Dashboard Sync ---
function fetchCaregiverBriefing() {
    fetch(`${API_BASE}/api/caregiver/briefing/${appState.user_id}`)
        .then(res => res.json())
        .then(data => {
            if (data.engagement_pct) {
                document.getElementById('b-eng').innerText = `${data.engagement_pct}%`;
                document.getElementById('b-med').innerText = `${data.medicine_status} Done`;
                document.getElementById('b-mood').innerText = data.mood_summary || '😊 Positive';
                document.getElementById('b-rec-text').innerText = data.recommendation;
            }
        })
        .catch(err => console.warn("Daily briefing fetch error", err));
}

function fetchCaregiverDashboardData() {
    fetch(`${API_BASE}/api/caregiver/dashboard/${appState.user_id}`)
        .then(res => res.json())
        .then(data => {
            if (data.analytics && data.analytics.domain_breakdown) {
                const db = data.analytics.domain_breakdown;
                document.getElementById('val-memory').innerText = `${db.memory}%`;
                document.getElementById('bar-memory').style.width = `${db.memory}%`;
                document.getElementById('val-attention').innerText = `${db.attention}%`;
                document.getElementById('bar-attention').style.width = `${db.attention}%`;
                document.getElementById('val-pattern').innerText = `${db.pattern_recognition}%`;
                document.getElementById('bar-pattern').style.width = `${db.pattern_recognition}%`;
                document.getElementById('val-routine').innerText = `${db.routine_recall}%`;
                document.getElementById('bar-routine').style.width = `${db.routine_recall}%`;
            }
        })
        .catch(err => console.warn("Caregiver dashboard fetch error", err));
}

// --- Offline Queue Synchronization ---
function syncOfflineQueue() {
    const raw = localStorage.getItem('mindset_offline_queue');
    if (!raw) return;
    const queue = JSON.parse(raw);
    if (queue.length === 0) return;

    fetch(`${API_BASE}/api/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game_sessions: queue })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Synced items:", data);
        localStorage.removeItem('mindset_offline_queue');
        appState.offlineQueue = [];
        document.getElementById('off-queue-count').innerText = "0 records";
        alert("✓ All offline game sessions synchronized successfully!");
    })
    .catch(err => console.warn("Sync failed, retrying later", err));
}

// --- Doctor Clinical Report Export ---
function exportClinicalReport() {
    const reportData = {
        patient_id: appState.user_id,
        patient_name: "Ramesh Sharma",
        age: 74,
        organization: "MDoNER — SIH26003",
        date_generated: new Date().toISOString(),
        cognitive_engagement_score: 78,
        domain_scores: {
            memory: 82.0,
            attention: 74.0,
            pattern_recognition: 89.0,
            routine_recall: 71.0
        },
        ai_recommendation: "Patient exhibits stable cognitive engagement with high pattern recognition. Continuous voice companion memory prompts recommended.",
        compliance: "Medication adherence: 90% | Hydration check: 85%"
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Clinical_Cognitive_Report_p001.json`;
    a.click();
    URL.revokeObjectURL(url);
}

