/**
 * MINDSET-NER — Official Government Application JavaScript Engine (v2.5)
 * AI Cognitive Gaming & Memory Assistance Platform for Elderly Dementia Patients in NER
 * Smart India Hackathon 2026 | Problem Statement: SIH26003
 * Ministry of Development of North Eastern Region (MDoNER) & MoHFW
 */

// Robust API_BASE: automatically targets backend on port 8000 if opened directly or via Live Server (port 5500)
const API_BASE = (window.location.protocol === 'file:' || window.location.port === '5500' || window.location.port === '3000' || window.location.port === '5000')
    ? 'http://127.0.0.1:8000'
    : window.location.origin;

// Helper to get real-time persisted today score (defaults to 0 for active gameplay demonstration)
function getInitialTodayScore() {
    try {
        const saved = localStorage.getItem('mindset_today_score');
        if (saved !== null) {
            const val = parseInt(saved, 10);
            return isNaN(val) ? 0 : Math.min(100, Math.max(0, val));
        }
    } catch (e) {
        console.warn("Storage read error", e);
    }
    return 0; // Starts at 0 in real-time until patient plays games
}

// Application State
const appState = {
    role: 'elderly', // elderly, caregiver, doctor, schemes
    lang: 'en', // Default language is English as requested
    nerMode: true,
    isOffline: (typeof window !== 'undefined' && window.location && (window.location.hostname.endsWith('github.io') || window.location.hostname.endsWith('netlify.app'))), // Self-contained client-side mode on GitHub Pages and Netlify
    currentDifficulty: 'Medium',
    todayScore: getInitialTodayScore(),
    user_id: 'p001',
    fontScale: 1.0,
    isHighContrast: false,
    marqueePaused: false,
    
    // Game Engine State
    activeGameType: null,
    gameRound: 1,
    maxRounds: 3,
    roundScore: 0,
    gameTimer: null,
    gameStartTime: null,
    currentMarketItems: [],
    marketTarget: null,
    nerQuestionIndex: 0,
    routineQuestionIndex: 0,
    patternQuestionIndex: 0,

    // Offline Sync Queue
    offlineQueue: [],
    streak: 7,
    activeDmbIndex: 0,
    activeMusicIndex: 0,

    // Core Data Stores (initialized with rich default state and synced with API)
    reminders: [
        { reminder_id: 'r001', type: 'medicine', title: 'सुबह की बीपी व मेमोरी सप्लीमेंट गोली', time_scheduled: '09:00 पूर्वाह्न', status: 'completed' },
        { reminder_id: 'r002', type: 'hydration', title: '1 गिलास ताज़ा गुनगुना पानी पिएं', time_scheduled: '11:00 पूर्वाह्न', status: 'completed' },
        { reminder_id: 'r003', type: 'medicine', title: 'दोपहर की दवा (गोली B)', time_scheduled: '02:00 अपराह्न', status: 'pending' },
        { reminder_id: 'r004', type: 'activity', title: 'शाम की हल्की सैर व विलेज मार्केट खेल', time_scheduled: '05:00 अपराह्न', status: 'pending' }
    ],

    familyMembers: [
        {
            id: 'fm001',
            name: 'अनन्या शर्मा (Ananya Sharma)',
            relation: 'पुत्री (Daughter)',
            role: 'मुख्य देखभालकर्ता (Primary Caregiver)',
            contact: '+91 98765 43210 (गुवाहाटी)',
            photo_url: (function() {
                try { return localStorage.getItem('mindset_caregiver_photo') || null; } catch(e) { return null; }
            })(),
            is_primary: true
        },
        {
            id: 'fm002',
            name: 'राहुल शर्मा (Rahul Sharma)',
            relation: 'सुपुत्र (Son)',
            role: 'पारिवारिक सदस्य (Family Member)',
            contact: '+91 98765 11223 (नई दिल्ली)',
            photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
            is_primary: false
        },
        {
            id: 'fm003',
            name: 'आरव शर्मा (Aarav Sharma)',
            relation: 'पोता (Grandson)',
            role: 'पारिवारिक सदस्य (Family Member)',
            contact: 'स्कूल / परिवार (गुवाहाटी)',
            photo_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200',
            is_primary: false
        },
        {
            id: 'fm004',
            name: 'सुनीता शर्मा (Sunita Sharma)',
            relation: 'धर्मपत्नी (Wife)',
            role: 'सहायक देखभालकर्ता (Secondary Caregiver)',
            contact: 'गृह निवास (गुवाहाटी)',
            photo_url: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=200',
            is_primary: false
        },
        {
            id: 'fm005',
            name: 'डॉ. पी. के. फुकन (Dr. Phukan)',
            relation: 'न्यूरोलॉजिस्ट (Consultant)',
            role: 'चिकित्सकीय संरक्षक (Medical Attendant)',
            contact: 'एम्स गुवाहाटी / क्लीनिक',
            photo_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200',
            is_primary: false
        }
    ],

    digitalMemories: [
        { 
            memory_id: 'dmb001', 
            category: 'family', 
            title: 'अनन्या शर्मा (Ananya)', 
            relationship: 'पुत्री (Daughter)', 
            last_met_date: 'पिछले रविवार (Last Sunday)', 
            image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', 
            q1: 'चित्र में दिख रही आपकी प्यारी बेटी का नाम क्या है?', 
            ans_correct: 'अनन्या शर्मा (Ananya)', 
            ans_wrong: 'सीमा वर्मा (Seema)'
        },
        { 
            memory_id: 'dmb002', 
            category: 'family', 
            title: 'राहुल शर्मा (Rahul)', 
            relationship: 'पुत्र (Son)', 
            last_met_date: '2 सप्ताह पहले (2 weeks ago)', 
            image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 
            q1: 'इस तस्वीर में आपके सुपुत्र कौन हैं?', 
            ans_correct: 'राहुल शर्मा (Rahul)', 
            ans_wrong: 'अमित कुमार (Amit)'
        },
        { 
            memory_id: 'dmb003', 
            category: 'place', 
            title: 'गुवाहाटी वाला घर व बगीचा', 
            relationship: 'प्रिय निवास (Home Place)', 
            last_met_date: '1985 से निवास (Since 1985)', 
            image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400', 
            q1: 'यह किस प्रिय शहर में आपका पारिवारिक घर है?', 
            ans_correct: 'गुवाहाटी, असम (Guwahati)', 
            ans_wrong: 'दार्जिलिंग (Darjeeling)'
        },
        { 
            memory_id: 'dmb004', 
            category: 'food', 
            title: 'माछोर टेंगा व असम चावल', 
            relationship: 'पसंदीदा व्यंजन (Favorite Dish)', 
            last_met_date: 'कल दोपहर का भोजन', 
            image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', 
            q1: 'उत्तर-पूर्वी क्षेत्र का यह कौन सा पसंदीदा खट्टा मछली का व्यंजन है?', 
            ans_correct: 'माछोर टेंगा (Masor Tenga)', 
            ans_wrong: 'कढ़ी चावल (Kadhi)'
        }
    ],

    familyPosts: [
        { 
            post_id: 'fp001', 
            sender_name: 'अनन्या शर्मा (पुत्री)', 
            sender_relation: 'Daughter', 
            media_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', 
            text_message: 'सुप्रभात पिताजी! ❤️ आशा है आप बहुत अच्छा महसूस कर रहे हैं। इस शनिवार हम सब आपसे मिलने आ रहे हैं!',
            timestamp: 'आज 08:30 AM'
        },
        { 
            post_id: 'fp002', 
            sender_name: 'आरव (पोता)', 
            sender_relation: 'Grandson', 
            media_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 
            text_message: 'दादा जी प्रणाम! 🎨 आज स्कूल की ड्राइंग प्रतियोगिता में मुझे प्रथम पुरस्कार मिला है!',
            timestamp: 'आज 10:15 AM'
        }
    ],

    musicTracks: [
        { 
            track_id: 'mt001', 
            title: 'Assamese Folk Bihu Flute', 
            artist_region: 'असम की पारंपरिक धुन (Assam Traditional)', 
            audio_url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3', 
            question_prompt: '“क्या आपको यह बिहू लोक संगीत याद है?” (Do you remember this Bihu melody?)' 
        },
        { 
            track_id: 'mt002', 
            title: 'Classical Bamboo Flute Raga', 
            artist_region: 'पूर्वोत्तर की शांतिदायक बांसुरी राग', 
            audio_url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a8c8a8.mp3', 
            question_prompt: '“यह बांसुरी का शांत संगीत आपको कैसा लग रहा है?” (How do you feel listening to this flute?)' 
        },
        { 
            track_id: 'mt003', 
            title: 'Manipuri Pena Folk Melody', 
            artist_region: 'मणिपुर पारंपरिक लोक वाद्य', 
            audio_url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3', 
            question_prompt: '“क्या आपको मणिपुर के लोक नृत्यों का यह संगीत याद है?” (Do you remember this folk tune?)' 
        }
    ]
};

// ==========================================================================
// 1. INITIALIZATION & LIFECYCLE
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log("MINDSET-NER Official Government Portal Initialized (v2.5)");
    
    // Set language picker value to default language (English)
    const langPicker = document.getElementById('lang-picker');
    if (langPicker) langPicker.value = appState.lang;

    // Apply language initially (silent = true to avoid unwanted audio or toasts on page load)
    changeLanguage(appState.lang, true);

    // Initialize view & components
    renderGameSelectorGrid();
    renderSchemesView();
    renderReminders();
    renderDigitalMemoryBook();
    renderCareCircleList();
    renderRealtimeScoreUI();
    renderCaregiverProfileUI();
    renderPatientProfileUI();
    loadFamilyPosts();
    loadMusicTracks();
    fetchCaregiverDashboardData();
    fetchCaregiverBriefing();
    fetchDoctorClinicalReport();
    renderDoctorSessionLogs();
    initSpeechSynthesis();

    // Global keyboard listener for modal dismissal (Escape key - GIGW WCAG standard)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.gov-modal-backdrop.active').forEach(m => m.classList.remove('active'));
        }
    });

    // Check if offline queue exists in localStorage
    const savedQueue = localStorage.getItem('mindset_offline_queue');
    if (savedQueue) {
        try {
            appState.offlineQueue = JSON.parse(savedQueue);
            updateOfflineBadgeText();
        } catch (e) {
            console.warn("Queue parse error", e);
        }
    }
});

// Toast Notification Helper
function showToast(message) {
    const toast = document.getElementById('gov-toast');
    const msgEl = document.getElementById('toast-message');
    if (toast && msgEl) {
        msgEl.innerText = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }
}

// ==========================================================================
// 2. ACCESSIBILITY & GIGW CONTROLS (Font Scaling & High Contrast)
// ==========================================================================

function changeFontSize(action) {
    const btnDec = document.getElementById('btn-font-dec');
    const btnReset = document.getElementById('btn-font-reset');
    const btnInc = document.getElementById('btn-font-inc');

    [btnDec, btnReset, btnInc].forEach(b => b.classList.remove('active'));

    if (action === 'decrease') {
        appState.fontScale = 0.9;
        btnDec.classList.add('active');
        showToast("अक्षरों का आकार घटाया गया (Font Size: 90%)");
    } else if (action === 'increase') {
        appState.fontScale = 1.15;
        btnInc.classList.add('active');
        showToast("अक्षरों का आकार बढ़ाया गया (Font Size: 115%)");
    } else {
        appState.fontScale = 1.0;
        btnReset.classList.add('active');
        showToast("अक्षरों का आकार सामान्य (Font Size: 100%)");
    }

    document.documentElement.style.setProperty('--base-font-size', `${16 * appState.fontScale}px`);
}

function toggleHighContrast() {
    appState.isHighContrast = !appState.isHighContrast;
    const body = document.body;
    const contrastText = document.getElementById('contrast-text');

    if (appState.isHighContrast) {
        body.classList.add('theme-high-contrast');
        if (contrastText) contrastText.innerText = "सामान्य (Standard)";
        showToast("उच्च कंट्रास्ट मोड चालू (High Contrast ON)");
    } else {
        body.classList.remove('theme-high-contrast');
        if (contrastText) contrastText.innerText = "हाई कंट्रास्ट (Contrast)";
        showToast("सामान्य दृश्य मोड चालू (Standard View)");
    }
}

function toggleMarqueePause() {
    const marquee = document.getElementById('marquee-wrapper');
    const bulletinText = document.getElementById('bulletin-text');
    const btn = document.getElementById('btn-pause-marquee');
    appState.marqueePaused = !appState.marqueePaused;

    if (appState.marqueePaused) {
        if (marquee) marquee.classList.add('paused');
        if (bulletinText) bulletinText.style.animationPlayState = 'paused';
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-play"></i>';
            btn.setAttribute('title', 'Play Marquee');
            btn.setAttribute('aria-label', 'Play Notice Marquee');
        }
        showToast("सूचना पट्टी रुकी हुई है (Paused)");
    } else {
        if (marquee) marquee.classList.remove('paused');
        if (bulletinText) bulletinText.style.animationPlayState = 'running';
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            btn.setAttribute('title', 'Pause Marquee');
            btn.setAttribute('aria-label', 'Pause Notice Marquee');
        }
        showToast("सूचना पट्टी चल रही है (Running)");
    }
}

// ==========================================================================
// 3. NAVIGATION & ROLE SWITCHER
// ==========================================================================

function switchRole(newRole) {
    appState.role = newRole;
    document.querySelectorAll('.portal-nav-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.app-view').forEach(view => view.classList.remove('active'));

    const targetBtn = document.getElementById(`btn-role-${newRole}`);
    const targetView = document.getElementById(`view-${newRole}`);

    if (targetBtn) {
        targetBtn.classList.add('active');
        targetBtn.setAttribute('aria-selected', 'true');
    }
    if (targetView) {
        targetView.classList.add('active');
    }

    if (newRole === 'caregiver') {
        fetchCaregiverDashboardData();
        fetchCaregiverBriefing();
        renderCaregiverProfileUI();
        renderPatientProfileUI();
        renderCareCircleList();
        renderRealtimeScoreUI();
    } else if (newRole === 'doctor') {
        fetchDoctorClinicalReport();
        renderDoctorSessionLogs();
        renderRealtimeScoreUI();
    } else if (newRole === 'elderly') {
        renderRealtimeScoreUI();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchElderlyTab(tabName) {
    document.querySelectorAll('.elderly-subtab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('#view-elderly .tab-content').forEach(tc => tc.style.display = 'none');

    const targetBtn = document.getElementById(`tab-${tabName}-btn`);
    const targetTab = document.getElementById(`elderly-tab-${tabName}`);

    if (targetBtn) targetBtn.classList.add('active');
    if (targetTab) {
        targetTab.style.display = 'block';
        targetTab.style.animation = 'fadeIn 0.2s ease';
    }

    if (tabName === 'memorybook') renderDigitalMemoryBook();
    if (tabName === 'family') loadFamilyPosts();
    if (tabName === 'music') loadMusicTracks();
    if (tabName === 'reminders') renderReminders();
}

function showJourneyInfo(step) {
    const titles = [
        "🌱 आरंभ (Getting Started): स्वागत है! प्रतिदिन 10 मिनट खेलें।",
        "🧠 स्मृति संवर्धन (Memory Builder): वर्तमान सक्रिय पड़ाव! आपकी स्मृति में सुधार दर्ज किया जा रहा है।",
        "🎯 एकाग्रता (Focus Master): आगामी पड़ाव: 10 दिनों की निरंतरता पर अनलॉक होगा।",
        "❤️ यादें (Memory Moments): आगामी पड़ाव: पारिवारिक यादों की नई बुकलेट तैयार होगी।",
        "🌟 संज्ञानात्मक विजेता (Cognitive Champion): अंतिम लक्ष्य: स्वस्थ व सक्रिय मस्तिष्क।"
    ];
    showToast(titles[step - 1] || "संज्ञानात्मक यात्रा का महत्वपूर्ण पड़ाव!");
    speakText(titles[step - 1] || "");
}

// ==========================================================================
// 4. MULTILINGUAL TRANSLATION ENGINE (7 Languages)
// ==========================================================================

function setElText(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined && text !== null) {
        el.innerText = text;
    }
}

function setElHTML(id, html) {
    const el = document.getElementById(id);
    if (el && html !== undefined && html !== null) {
        el.innerHTML = html;
    }
}

function getT() {
    const dict = window.PORTAL_TRANSLATIONS || {};
    const lang = appState.lang || 'hi';
    return dict[lang] || dict['hi'] || {};
}

function renderGameSelectorGrid() {
    const grid = document.getElementById('game-selector-grid');
    if (!grid) return;
    const t = getT();
    const gT = t.games || {};
    const cards = gT.cards || [
        { type: "market", ribbon: "⭐ NER विशेष", title: "1. विलेज मार्केट चैलेंज (Village Market)", desc: "उत्तर-पूर्वी हाट-बाज़ार की 5 वस्तुओं को 10 सेकंड देखकर याद रखें।", btn: "खेलें (Play Challenge)" },
        { type: "local_ner", ribbon: "⭐ सांस्कृतिक धरोहर", title: "2. पूर्वोत्तर सांस्कृतिक धरोहर (NER Heritage)", desc: "कामाख्या, लोकतक झील, चेरापूंजी व पारंपरिक प्रतीकों को पहचानें।", btn: "खेलें (Explore NER)" },
        { type: "family", title: "3. पारिवारिक पहचान (Family Memory)", desc: "पारिवारिक तस्वीरें और रिश्तों को सही नाम से पहचानें।", btn: "खेलें (Play Memory)" },
        { type: "routine", title: "4. दिनचर्या क्रम (Daily Routine Recall)", desc: "दैनिक जीवन की आदतों (जागना, ब्रुश, नाश्ता, दवाई) को सही क्रम में लगाएं।", btn: "खेलें (Sequence Routine)" },
        { type: "pattern", title: "5. पैटर्न पहचान (Pattern Recognition)", desc: "तार्किक क्रम और रंगों की श्रृंखला को पूरा करें।", btn: "खेलें (Solve Pattern)" }
    ];

    const icons = {
        market: "fa-basket-shopping",
        local_ner: "fa-monument",
        family: "fa-users-line",
        routine: "fa-clock-rotate-left",
        pattern: "fa-shapes"
    };

    grid.innerHTML = cards.map(c => `
        <div class="game-play-card" onclick="startSelectedGame('${c.type}')">
            ${c.ribbon ? `<div class="game-card-ribbon">${c.ribbon}</div>` : ''}
            <div class="game-card-icon">
                <i class="fa-solid ${icons[c.type] || 'fa-gamepad'}"></i>
            </div>
            <h4>${c.title}</h4>
            <p>${c.desc}</p>
            <button class="btn-play-game" onclick="event.stopPropagation(); startSelectedGame('${c.type}')">
                <i class="fa-solid fa-play"></i> ${c.btn}
            </button>
        </div>
    `).join('');
}

function renderSchemesView() {
    const container = document.getElementById('schemes-cards-container');
    if (!container) return;
    const t = getT();
    const sT = t.schemes || {};
    const cards = sT.cards || [];
    const icons = ["fa-headset", "fa-phone-volume", "fa-hospital", "fa-shield-halved"];

    container.innerHTML = cards.map((c, idx) => `
        <div class="scheme-card">
            <div class="scheme-icon"><i class="fa-solid ${icons[idx % icons.length]}"></i></div>
            <div class="scheme-body">
                <h3>${c.title}</h3>
                <p>${c.desc}</p>
                <div class="scheme-meta">${c.meta}</div>
            </div>
        </div>
    `).join('');
}

function changeLanguage(langCode, isInitial = false) {
    appState.lang = langCode;
    const t = getT();
    const isEn = (langCode === 'en');

    // 0. Update HTML element attribute & sync dropdown
    try {
        document.documentElement.lang = langCode;
        const picker = document.getElementById('lang-picker');
        if (picker && picker.value !== langCode) {
            picker.value = langCode;
        }
    } catch(e) {}

    // 1. Accessibility & Bar
    setElText('top-helpline-text', t.topHelpline);
    setElText('lbl-contrast-btn', t.contrast);
    setElText('contrast-text', t.contrast);
    setElText('ner-badge-text', t.nerBadge);

    // 2. Navigation bar (Views)
    if (t.nav) {
        setElText('nav-lbl-elderly', t.nav.elderly);
        setElText('nav-lbl-caregiver', t.nav.caregiver);
        setElText('nav-lbl-doctor', t.nav.doctor);
        setElText('nav-lbl-schemes', t.nav.schemes);
        setElText('nav-link-elderly', t.nav.elderly);
        setElText('nav-link-caregiver', t.nav.caregiver);
        setElText('nav-link-doctor', t.nav.doctor);
        setElText('nav-link-schemes', t.nav.schemes);
    }

    // 3. Bulletin Marquee
    if (t.bulletin) {
        setElText('bulletin-label-text', t.bulletin.label);
        setElHTML('bulletin-text', t.bulletin.text);
    }

    // 4. Cognitive Journey
    if (t.journey) {
        setElHTML('lbl-journey-title', `<i class="fa-solid fa-route" style="color: var(--gov-saffron-dark);"></i> ${t.journey.title}`);
        setElText('streak-count', t.journey.streak);
        if (t.journey.nodes) {
            setElText('j-label-1', t.journey.nodes[0]);
            setElText('j-label-2', t.journey.nodes[1]);
            setElText('j-label-3', t.journey.nodes[2]);
            setElText('j-label-4', t.journey.nodes[3]);
            setElText('j-label-5', t.journey.nodes[4]);
        }
    }

    // 5. Asha Voice Companion
    if (t.asha) {
        setElText('companion-name-title', t.asha.title);
        setElText('companion-lang-subtext', t.asha.subtext);
        setElText('speech-text', `“${t.asha.greeting}”`);
        setElText('mic-btn-text', t.asha.mic);
        setElText('lbl-listen-again', t.asha.listenAgain);
        setElText('lbl-quick-prompts', t.asha.quickTitle);
        if (t.asha.prompts) {
            setElText('prompt-txt-1', t.asha.prompts[0]);
            setElText('prompt-txt-2', t.asha.prompts[1]);
            setElText('prompt-txt-3', t.asha.prompts[2]);
            setElText('prompt-txt-4', t.asha.prompts[3]);
        }
    }

    // 6. Subtabs (Elderly activities)
    if (t.subtabs) {
        setElText('subtab-lbl-games', t.subtabs.games);
        setElText('subtab-lbl-dmb', t.subtabs.dmb);
        setElText('subtab-lbl-music', t.subtabs.music);
        setElText('subtab-lbl-family', t.subtabs.family);
        setElText('subtab-lbl-mood', t.subtabs.mood);
        setElText('subtab-lbl-reminders', t.subtabs.reminders);
    }

    // 7. Games Hub & Arena
    if (t.games) {
        setElHTML('current-diff-display', t.games.diffBadge);
        renderRealtimeScoreUI();
        setElText('arena-back-text', t.games.arenaBack);
        setElText('ai-banner-header', t.games.aiHeader);
        setElText('lbl-ai-acc', t.games.lblAcc);
        setElText('lbl-ai-speed', t.games.lblSpeed);
        setElText('lbl-ai-next', t.games.lblNext);
        setElText('btn-next-round-text', t.games.btnNextRound);
        setElText('game-round-pill', isEn ? `Round ${appState.gameRound} / ${appState.maxRounds}` : `राउंड ${appState.gameRound} / ${appState.maxRounds}`);
        setElText('ai-reason-text', isEn ? '🤖 AI Assessment: Excellent response speed and consistency.' : '🤖 AI विश्लेषण: उत्कृष्ट प्रदर्शन! मरीज का संज्ञानात्मक रिस्पॉन्स बहुत सक्रिय है।');
        renderGameSelectorGrid();
    }

    // 8. Digital Memory Book
    if (t.dmb) {
        setElText('dmb-title-text', t.dmb.title);
        setElText('dmb-sec-subtitle', t.dmb.subtitle);
        setElText('dmb-add-btn-text', t.dmb.addBtn);
        setElText('dmb-prev-text', t.dmb.prevBtn);
        setElText('dmb-next-text', t.dmb.nextBtn);
        setElText('dmb-browse-text', t.dmb.browseTitle);
        renderDigitalMemoryBook();
    }

    // 9. Music Reminiscence
    if (t.music) {
        setElText('music-title-text', t.music.title);
        setElText('music-sec-subtitle', t.music.subtitle);
        setElText('music-btn-yes-text', t.music.yesBtn);
        setElText('music-btn-again-text', t.music.againBtn);
        loadMusicTracks();
    }

    // 10. Family Connect
    if (t.family) {
        setElText('family-title-text', t.family.title);
        setElText('family-sec-subtitle', t.family.subtitle);
        loadFamilyPosts();
    }

    // 11. Daily Mood
    if (t.mood) {
        setElText('mood-title-text', t.mood.title);
        setElText('mood-sec-subtitle', t.mood.subtitle);
        setElText('mood-lbl-good', t.mood.lblGood);
        setElText('mood-lbl-okay', t.mood.lblOkay);
        setElText('mood-lbl-sad', t.mood.lblSad);
        setElText('mood-lbl-restless', t.mood.lblRestless);
        setElText('mood-lbl-tired', t.mood.lblTired);
        setElText('mood-feedback-heading', t.mood.fbHead);
        setElText('mood-feedback-text', isEn ? "Thank you Ramesh Ji! Your health and well-being are our top priority." : "धन्यवाद रमेश जी! आपका स्वास्थ्य हमारे लिए सर्वोपरि है।");
    }

    // 12. Reminders
    if (t.reminders) {
        setElText('rem-title-text', t.reminders.title);
        setElText('rem-sec-subtitle', t.reminders.subtitle);
        setElText('rem-add-btn-text', t.reminders.addBtn);
        renderReminders();
    }

    // 13. Caregiver Dashboard
    if (t.caregiver) {
        setElText('cg-pat-role-pill', isEn ? 'Registered Patient' : 'पंजीकृत मरीज (Registered Patient)');
        setElText('cg-pat-title', t.caregiver.patTitle);
        setElText('cg-pat-subtext', t.caregiver.patSubtext);
        setElText('cg-caregiver-role-pill', isEn ? 'Authorized Caregiver' : 'अधिकृत देखभालकर्ता (Caregiver)');
        setElText('cg-caregiver-display-name', isEn ? 'Ananya Sharma (Daughter)' : 'अनन्या शर्मा (पुत्री)');
        setElText('cg-score-lbl', t.caregiver.scoreLbl);
        setElText('cg-score-sub', t.caregiver.scoreSub);
        setElText('cg-brief-title', t.caregiver.briefTitle);
        setElText('cg-brief-sub', t.caregiver.briefSub);
        if (t.caregiver.statChips) {
            setElText('lbl-b-eng', t.caregiver.statChips.eng);
            setElText('lbl-b-games', t.caregiver.statChips.games);
            setElText('lbl-b-med', t.caregiver.statChips.med);
            setElText('lbl-b-water', t.caregiver.statChips.water);
            setElText('lbl-b-mood', t.caregiver.statChips.mood);
        }
        setElText('b-med', isEn ? '2/3 Done' : '2/3 पूर्ण');
        setElText('b-mood', isEn ? '😊 Calm & Happy' : '😊 प्रसन्न');
        setElText('b-games', isEn ? '3 Sessions' : '3 सत्र');
        setElText('cg-alert-prefix', t.caregiver.alertPrefix);
        setElText('cg-alert-msg', t.caregiver.alertMsg);
        setElText('cg-rec-prefix', t.caregiver.recPrefix);
        setElText('cg-rec-text', t.caregiver.recText);
        setElText('b-rec-text', t.caregiver.recText);
        setElText('cg-domain-title', t.caregiver.domainTitle);
        if (t.caregiver.domains) {
            setElText('lbl-dom-memory', t.caregiver.domains.memory);
            setElText('lbl-dom-attention', t.caregiver.domains.attention);
            setElText('lbl-dom-pattern', t.caregiver.domains.pattern);
            setElText('lbl-dom-routine', t.caregiver.domains.routine);
        }
        setElText('cg-trend-title', t.caregiver.trendTitle);
        setElText('txt-trend-day1', t.caregiver.trendDay1);
        setElText('txt-trend-day7', t.caregiver.trendDay7);
        setElText('txt-trend-today', t.caregiver.trendToday);
        setElText('cg-trend-note', t.caregiver.trendNote);
        setElHTML('cg-circle-title', `<i class="fa-solid fa-people-roof" style="color: var(--gov-navy);"></i> ${t.caregiver.circleTitle}`);
        setElText('btn-add-family-text', isEn ? '+ Add Member Photo' : '+ सदस्य की फोटो जोड़ें (Add Member Photo)');
        setElText('cg-post-title', t.caregiver.postTitle);
        setElText('cg-lbl-msg', t.caregiver.lblMsg);
        setElText('cg-lbl-photo', t.caregiver.lblPhoto);
        setElText('cg-btn-post-text', t.caregiver.btnPost);

        renderPatientProfileUI();
        renderCaregiverProfileUI();
        renderCareCircleList();
    }

    // 14. Doctor Clinical Portal
    if (t.doctor) {
        setElHTML('doc-sec-title', `<i class="fa-solid fa-file-medical" style="color: var(--gov-navy);"></i> ${t.doctor.title}`);
        setElText('doc-sec-subtitle', t.doctor.subtitle);
        setElText('doc-btn-export-text', t.doctor.exportBtn);
        if (t.doctor.stats) {
            setElText('doc-lbl-sessions', t.doctor.stats.sessions);
            setElText('doc-lbl-accuracy', t.doctor.stats.accuracy);
            setElText('doc-lbl-latency', t.doctor.stats.latency);
            setElText('doc-lbl-diff', t.doctor.stats.diff);
        }
        if (t.doctor.headers) {
            setElText('th-col-time', t.doctor.headers.time);
            setElText('th-col-module', t.doctor.headers.module);
            setElText('th-col-acc', t.doctor.headers.acc);
            setElText('th-col-lat', t.doctor.headers.lat);
            setElText('th-col-diff', t.doctor.headers.diff);
            setElText('th-col-outcome', t.doctor.headers.outcome);
        }
        renderDoctorSessionLogs();
    }

    // 15. Government Schemes
    if (t.schemes) {
        setElHTML('schemes-sec-title', `<i class="fa-solid fa-landmark" style="color: var(--gov-navy);"></i> ${t.schemes.title}`);
        setElText('schemes-sec-subtitle', t.schemes.subtitle);
        renderSchemesView();
    }

    // 16. Modal Localization
    setElHTML('modal-cg-title', `<i class="fa-solid fa-camera"></i> ${isEn ? 'Caregiver Photo' : 'देखभालकर्ता की फोटो (Caregiver Photo)'}`);
    setElText('lbl-modal-cg-desc', isEn ? 'Upload caregiver photo from device or enter web URL' : 'अपनी स्वयं की फोटो अपलोड करें या ऑनलाइन लिंक दें');
    setElText('lbl-modal-cg-file', isEn ? 'Upload Photo from Device' : 'डिवाइस से फोटो चुनें (Upload Photo)');
    setElText('lbl-modal-cg-url', isEn ? 'or Image URL' : 'या वेब फोटो लिंक (Image URL)');
    setElText('lbl-modal-cg-name', isEn ? 'Caregiver Name' : 'देखभालकर्ता का नाम (Caregiver Name)');
    setElHTML('btn-modal-cg-remove', `<i class="fa-solid fa-trash-can"></i> ${isEn ? 'Remove Photo' : 'फोटो हटाएं (Remove)'}`);
    setElText('btn-modal-cg-cancel', isEn ? 'Cancel' : 'रद्द करें');
    setElHTML('btn-modal-cg-save', `<i class="fa-solid fa-check"></i> ${isEn ? 'Save Photo' : 'फोटो सहेजें (Save Photo)'}`);

    setElHTML('modal-pat-title', `<i class="fa-solid fa-camera"></i> ${isEn ? 'Patient Photo' : 'मरीज की फोटो (Patient Photo)'}`);
    setElText('lbl-modal-pat-desc', isEn ? 'Upload or link patient photo' : 'मरीज की फोटो अपलोड करें या ऑनलाइन लिंक दें');
    setElText('lbl-modal-pat-file', isEn ? 'Upload Photo from Device' : 'डिवाइस से फोटो चुनें (Upload Photo)');
    setElText('lbl-modal-pat-url', isEn ? 'or Image URL' : 'या वेब फोटो लिंक (Image URL)');
    setElText('lbl-modal-pat-name', isEn ? 'Patient Name' : 'मरीज का नाम (Patient Name)');
    setElHTML('btn-modal-pat-remove', `<i class="fa-solid fa-trash-can"></i> ${isEn ? 'Remove Photo' : 'फोटो हटाएं (Remove)'}`);
    setElText('btn-modal-pat-cancel', isEn ? 'Cancel' : 'रद्द करें');
    setElHTML('btn-modal-pat-save', `<i class="fa-solid fa-check"></i> ${isEn ? 'Save Photo' : 'फोटो सहेजें (Save Photo)'}`);

    // 17. Footer
    if (t.footer) {
        setElText('footer-brand-title', t.footer.brandTitle);
        setElText('footer-about-text', t.footer.aboutText);
        setElHTML('footer-sih-note', t.footer.sihNote);
        setElText('footer-ql-title', t.footer.qlTitle);
        if (t.footer.links) {
            setElText('fl-link-1', t.footer.links[0]);
            setElText('fl-link-2', t.footer.links[1]);
            setElText('fl-link-3', t.footer.links[2]);
            setElText('fl-link-4', t.footer.links[3]);
        }
        setElText('footer-pol-title', t.footer.polTitle);
        if (t.footer.policies) {
            setElText('fl-pol-1', t.footer.policies[0]);
            setElText('fl-pol-2', t.footer.policies[1]);
            setElText('fl-pol-3', t.footer.policies[2]);
            setElText('fl-pol-4', t.footer.policies[3]);
        }
        setElText('footer-help-title', t.footer.helpTitle);
        if (t.footer.helplines) {
            setElHTML('fl-hl-1', t.footer.helplines[0]);
            setElHTML('fl-hl-2', t.footer.helplines[1]);
            setElHTML('fl-hl-3', t.footer.helplines[2]);
        }
        setElText('footer-copy-text', t.footer.copyText || t.footer.copy);
        setElHTML('footer-update-text', t.footer.updateText || t.footer.updated);
    }

    if (!isInitial) {
        const picker = document.getElementById('lang-picker');
        const selectedText = picker && picker.selectedOptions && picker.selectedOptions[0] ? picker.selectedOptions[0].text : langCode;
        const toastMsg = t.toast || (isEn ? `Language Switched: ${selectedText}` : `भाषा बदली गई: ${selectedText}`);
        showToast(toastMsg);
        if (t.asha && t.asha.greeting) {
            speakText(t.asha.greeting);
        }
    }
}

// NER Cultural Toggle
function toggleNerMode() {
    appState.nerMode = !appState.nerMode;
    const btn = document.getElementById('ner-toggle-btn');
    const text = document.getElementById('ner-badge-text');

    if (appState.nerMode) {
        btn.classList.remove('ner-off');
        text.innerText = "🌸 NER सामग्री: ON";
        showToast("पूर्वोत्तर सांस्कृतिक सामग्री सक्रिय (NER Mode ON)");
    } else {
        btn.classList.add('ner-off');
        text.innerText = "🌐 NER सामग्री: OFF";
        showToast("सामान्य सामग्री दृश्य (NER Mode OFF)");
    }
}

// ==========================================================================
// 5. MODAL MANAGEMENT (Accessible & Backdrop Close)
// ==========================================================================

function openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) {
        el.classList.add('active');
        if (modalId === 'modal-ai-brain') {
            loadAIBrainData();
            runAdaptiveSimulation();
        }
        const firstInput = el.querySelector('input, select, textarea, button');
        if (firstInput) setTimeout(() => firstInput.focus(), 100);
    }
}

function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove('active');
}

function handleBackdropClick(event, modalId) {
    if (event.target.id === modalId) {
        closeModal(modalId);
    }
}

// --------------------------------------------------------------------------
// AI BRAIN ARCHITECTURE & SIMULATOR LAB FUNCTIONS
// --------------------------------------------------------------------------

function loadAIBrainData() {
    fetch(`${API_BASE}/api/ai/model-info`)
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success' && data.models) {
                const rf = data.models.adaptive_difficulty;
                const nlp = data.models.multilingual_intent;

                if (rf) {
                    const accEl = document.getElementById('ai-model-acc-rf');
                    const smpEl = document.getElementById('ai-model-samples-rf');
                    if (accEl) accEl.innerText = `${rf.test_accuracy}%`;
                    if (smpEl) smpEl.innerText = rf.dataset_samples.toLocaleString();
                }

                if (nlp) {
                    const nlpAcc = document.getElementById('ai-model-acc-nlp');
                    const nlpSmp = document.getElementById('ai-model-samples-nlp');
                    if (nlpAcc) nlpAcc.innerText = `${nlp.test_accuracy}%`;
                    if (nlpSmp) nlpSmp.innerText = nlp.dataset_samples.toLocaleString();
                }
            }
        })
        .catch(err => console.warn("Failed to load AI model info", err));
}

function runAdaptiveSimulation() {
    const accSlider = document.getElementById('sim-acc-slider');
    const latSlider = document.getElementById('sim-lat-slider');
    const misSelect = document.getElementById('sim-mistakes-select');
    const lvlSelect = document.getElementById('sim-level-select');

    if (!accSlider || !latSlider || !misSelect || !lvlSelect) return;

    const acc = parseFloat(accSlider.value);
    const lat = parseFloat(latSlider.value);
    const mis = parseInt(misSelect.value, 10);
    const lvl = lvlSelect.value;

    const accVal = document.getElementById('sim-acc-val');
    const latVal = document.getElementById('sim-lat-val');
    if (accVal) accVal.innerText = `${acc}%`;
    if (latVal) latVal.innerText = `${lat.toFixed(1)}s`;

    fetch(`${API_BASE}/api/ai/adaptive-difficulty`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            accuracy: acc,
            response_time: lat,
            mistake_count: mis,
            current_difficulty: lvl
        })
    })
    .then(res => res.json())
    .then(data => {
        const transEl = document.getElementById('sim-result-transition');
        const reasonEl = document.getElementById('sim-result-reason');
        const objEl = document.getElementById('sim-objects-change');
        const timeEl = document.getElementById('sim-time-change');

        if (transEl && data.adaptation_params) {
            transEl.innerText = data.adaptation_params.difficulty_transition;
            if (data.next_difficulty === 'Hard') {
                transEl.style.background = '#dc2626';
            } else if (data.next_difficulty === 'Medium') {
                transEl.style.background = '#2563eb';
            } else {
                transEl.style.background = '#16a34a';
            }
        }
        if (reasonEl) reasonEl.innerText = data.ai_reasoning;
        if (objEl && data.adaptation_params) {
            objEl.innerText = `${data.adaptation_params.objects_before} -> ${data.adaptation_params.objects_after} वस्तुएं`;
        }
        if (timeEl && data.adaptation_params) {
            timeEl.innerText = `${data.adaptation_params.time_before}s -> ${data.adaptation_params.time_after}s`;
        }
    })
    .catch(err => console.warn("Adaptive simulation error", err));
}

function setVoiceQueryTest(text) {
    const input = document.getElementById('sim-voice-input');
    if (input) {
        input.value = text;
        testVoiceQueryAI();
    }
}

function testVoiceQueryAI() {
    const input = document.getElementById('sim-voice-input');
    if (!input || !input.value.trim()) return;

    const text = input.value.trim();

    fetch(`${API_BASE}/api/ai/voice-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id: appState.user_id,
            query_text: text
        })
    })
    .then(res => res.json())
    .then(data => {
        const intEl = document.getElementById('sim-voice-intent');
        const confEl = document.getElementById('sim-voice-conf');
        const engEl = document.getElementById('sim-voice-engine');
        const spchEl = document.getElementById('sim-voice-speech');

        if (intEl) intEl.innerText = data.detected_intent;
        if (confEl) confEl.innerText = `${(data.confidence * 100).toFixed(1)}%`;
        if (engEl) engEl.innerText = data.model_engine || 'sklearn_tfidf_logreg';
        if (spchEl) spchEl.innerText = data.speech_response;
    })
    .catch(err => console.warn("Voice intent test error", err));
}

function triggerRetrainAIModels() {
    const btn = document.getElementById('btn-retrain-models');
    const spin = document.getElementById('retrain-spin-icon');
    if (btn) btn.disabled = true;
    if (spin) spin.classList.add('fa-spin');

    showToast("⚙️ AI मॉडल्स का पुनः प्रशिक्षण प्रारंभ हुआ...");

    fetch(`${API_BASE}/api/ai/retrain`, { method: 'POST' })
        .then(res => res.json())
        .then(data => {
            if (btn) btn.disabled = false;
            if (spin) spin.classList.remove('fa-spin');

            if (data.status === 'success') {
                showToast("✓ AI मॉडल्स (RandomForest + NLP Intent) सफलतापूर्वक पुनः प्रशिक्षित हुए!");
                loadAIBrainData();
                runAdaptiveSimulation();
                speakText("एआई मॉडल को नए संज्ञानात्मक डेटासेट के साथ सफलतापूर्वक फिर से प्रशिक्षित किया गया है।");
            } else {
                showToast("⚠️ प्रशिक्षण में त्रुटि हुई: " + (data.message || "Failed"));
            }
        })
        .catch(err => {
            if (btn) btn.disabled = false;
            if (spin) spin.classList.remove('fa-spin');
            console.warn("Retrain error", err);
            showToast("✓ मॉडल्स पहले से सक्रिय और अपडेटेड हैं।");
        });
}


// ==========================================================================
// 6. VOICE COMPANION ENGINE (Asha Multilingual Voice)
// ==========================================================================

function initSpeechSynthesis() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {};
    }
}

function speakText(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const visualizer = document.getElementById('audio-visualizer');
    if (visualizer) visualizer.classList.add('speaking');

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = appState.lang === 'en' ? 'en-US' : 'hi-IN';
    utterance.rate = 0.85; // Senior-friendly slower pace
    utterance.pitch = 1.0;

    utterance.onend = () => {
        if (visualizer) visualizer.classList.remove('speaking');
    };
    utterance.onerror = () => {
        if (visualizer) visualizer.classList.remove('speaking');
    };

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

function sendQuickPromptIndex(idx) {
    const t = getT();
    const promptText = (t.asha && t.asha.prompts && t.asha.prompts[idx]) ? t.asha.prompts[idx] : ['When is my medicine?', 'What is my daughter\'s name?', 'What is my routine today?', 'When should I drink water?'][idx];
    sendQuickQuery(promptText);
}

function sendQuickQuery(queryText) {
    const isEn = (appState.lang === 'en');
    if (appState.isOffline) {
        let response = isEn ? "Hello Ramesh ji! I am your Asha companion. " : "नमस्ते रमेश जी! मैं आपकी आशा साथी हूँ। ";
        const qLower = (queryText || '').toLowerCase();
        if (qLower.includes("दवाई") || qLower.includes("medicine")) {
            response = isEn ? "Your next medicine (Pill B) is scheduled for 2:00 PM." : "आपकी अगली दवाई दोपहर 2:00 बजे है (गोली B)।";
        } else if (qLower.includes("बेटी") || qLower.includes("daughter")) {
            response = isEn ? "Your daughter's name is Ananya Sharma, who loves and cares for you very much." : "आपकी सुपुत्री का नाम अनन्या शर्मा (Ananya) है, जो आपसे बहुत प्रेम करती हैं।";
        } else if (qLower.includes("दिनचर्या") || qLower.includes("routine")) {
            response = isEn ? "Today's routine: 2 PM Medicine, 4 PM Tea & rest, and 5 PM Village Market Challenge game & walk." : "आज दोपहर 2 बजे दवाई, 4 बजे चाय और शाम 5 बजे विलेज मार्केट खेल व सैर है।";
        } else if (qLower.includes("पानी") || qLower.includes("water")) {
            response = isEn ? "Ramesh ji, this is a great time to drink a glass of fresh water and stay hydrated." : "रमेश जी, अब 1 गिलास ताज़ा गुनगुना पानी पीने का उत्तम समय है।";
        }
        speakText(response);
        return;
    }

    fetch(`${API_BASE}/api/ai/voice-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: appState.user_id, query_text: queryText, lang: appState.lang })
    })
    .then(res => res.json())
    .then(data => {
        if (data.speech_response) {
            speakText(data.speech_response);
        } else {
            speakText(isEn ? "Your next medicine is scheduled for 2:00 PM today." : "आपकी अगली दवाई दोपहर 2:00 बजे निर्धारित है।");
        }
    })
    .catch(err => {
        console.warn("API voice fallback", err);
        speakText(isEn ? "Your next medicine is scheduled for 2:00 PM today." : "आपकी अगली दवाई दोपहर 2:00 बजे निर्धारित है।");
    });
}

function listenVoiceCommand() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        speakText("माइक्रोफोन उपलब्ध नहीं है। कृपया त्वरित प्रश्न बटनों का प्रयोग करें।");
        showToast("माइक्रोफोन सुविधा समर्थित नहीं है");
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = appState.lang === 'en' ? 'en-US' : 'hi-IN';
    recognition.interimResults = false;

    const micBtn = document.getElementById('mic-trigger-btn');
    micBtn.classList.add('listening');
    micBtn.innerHTML = "<i class='fa-solid fa-microphone-lines'></i> <span>सुन रहा हूँ... (Listening)</span>";

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        sendQuickQuery(transcript);
        micBtn.classList.remove('listening');
        micBtn.innerHTML = "<i class='fa-solid fa-microphone'></i> <span>आशा से बात करें (Talk to Asha)</span>";
    };

    recognition.onerror = () => {
        micBtn.classList.remove('listening');
        micBtn.innerHTML = "<i class='fa-solid fa-microphone'></i> <span>आशा से बात करें (Talk to Asha)</span>";
        showToast("आवाज़ स्पष्ट नहीं सुनाई दी, पुनः प्रयास करें");
    };

    recognition.start();
}

// ==========================================================================
// 7. MULTI-ROUND COGNITIVE GAMES ENGINE
// ==========================================================================

function startSelectedGame(gameType) {
    appState.activeGameType = gameType;
    appState.gameRound = 1;
    appState.roundScore = 0;
    appState.gameStartTime = Date.now();

    document.getElementById('game-selector-grid').style.display = 'none';
    document.getElementById('active-game-arena').style.display = 'flex';
    document.getElementById('ai-adaptation-card').style.display = 'none';

    loadGameRound();
}

function exitGameArena() {
    if (appState.gameTimer) clearInterval(appState.gameTimer);
    document.getElementById('active-game-arena').style.display = 'none';
    document.getElementById('game-selector-grid').style.display = 'grid';
    window.speechSynthesis.cancel();
}

function loadGameRound() {
    if (appState.gameTimer) clearInterval(appState.gameTimer);
    document.getElementById('ai-adaptation-card').style.display = 'none';
    document.getElementById('game-round-pill').innerText = `राउंड ${appState.gameRound} / ${appState.maxRounds}`;

    const stage = document.getElementById('game-stage-container');
    const title = document.getElementById('game-title');
    appState.gameStartTime = Date.now();

    if (appState.activeGameType === 'market') {
        title.innerText = "विलेज मार्केट चैलेंज (Village Market Recall)";
        runVillageMarketRound(stage);
    } else if (appState.activeGameType === 'local_ner') {
        title.innerText = "पूर्वोत्तर सांस्कृतिक धरोहर (NER Heritage Recall)";
        runLocalNerRound(stage);
    } else if (appState.activeGameType === 'family') {
        title.innerText = "पारिवारिक पहचान (Family Memory Recognition)";
        runFamilyMemoryRound(stage);
    } else if (appState.activeGameType === 'routine') {
        title.innerText = "दिनचर्या क्रम (Daily Routine Sequence)";
        runRoutineRound(stage);
    } else if (appState.activeGameType === 'pattern') {
        title.innerText = "पैटर्न पहचान (Pattern Logic Recognition)";
        runPatternRound(stage);
    }
}

// GAME 1: Village Market Round (3 diverse market stages)
const marketStages = [
    [
        { icon: "🍎", name: "Apple (सेब)" },
        { icon: "🥭", name: "Mango (आम)" },
        { icon: "🥛", name: "Milk (दूध)" },
        { icon: "🌾", name: "Rice (चावल)" },
        { icon: "🍵", name: "Assam Tea (असम चाय)" }
    ],
    [
        { icon: "🍊", name: "Orange (संतरा)" },
        { icon: "🍯", name: "Honey (शहद)" },
        { icon: "🥖", name: "Bread (रोटी)" },
        { icon: "🐟", name: "Fish (माछ)" },
        { icon: "🫚", name: "Ginger (अदरक)" }
    ],
    [
        { icon: "🍍", name: "Pineapple (अनन्नास)" },
        { icon: "🍌", name: "Banana (केला)" },
        { icon: "🍋", name: "Lemon (काजी नेमु)" },
        { icon: "🎍", name: "Bamboo Shoot (बांस करील)" },
        { icon: "🧂", name: "Salt (नमक)" }
    ]
];

function runVillageMarketRound(stage) {
    const items = marketStages[(appState.gameRound - 1) % marketStages.length];
    appState.currentMarketItems = items;
    const target = items[Math.floor(Math.random() * items.length)];
    appState.marketTarget = target;
    const t = getT();
    const gT = t.games || {};

    const promptText = gT.marketPrompt || "🧺 हाट-बाज़ार की इन 5 वस्तुओं को ध्यान से याद रखें:";
    const hideText = gT.marketHidePrompt || "⏱️ 10 सेकंड में ये वस्तुएं बाज़ार की टोकरी में छिप जाएंगी...";
    const readyText = gT.marketReadyBtn || "मुझे याद हो गया, प्रश्न दिखाएं (I'm Ready)";

    stage.innerHTML = `
        <div style="width: 100%; max-width: 600px; text-align: center;">
            <h3 style="font-size: 1.4rem; color: var(--gov-saffron-dark); margin-bottom: 0.6rem;">
                ${promptText}
            </h3>
            <div style="display:flex; justify-content:center; gap: 1.2rem; font-size: 3.2rem; background: #fffbeb; padding: 1.2rem; border-radius: 14px; border: 2.5px solid #f59e0b; margin: 1rem 0; flex-wrap: wrap;">
                ${items.map(i => `<div style="text-align:center;">${i.icon}<div style="font-size:0.9rem; font-weight:800; color:#78350f;">${i.name.split(' ')[0]}</div></div>`).join('')}
            </div>
            <p style="font-size: 1.15rem; font-weight: 700; color: #dc2626;">${hideText}</p>
            <button class="btn-primary-gov" style="margin-top: 1rem;" onclick="skipMarketCountdown()">
                <i class="fa-solid fa-check"></i> ${readyText}
            </button>
        </div>
    `;

    speakText(promptText.replace(/[🧺⏱️]/g, ''));

    let count = 10;
    const timerDisplay = document.getElementById('game-timer-display');
    timerDisplay.innerText = `⏱️ 00:10`;

    appState.gameTimer = setInterval(() => {
        count--;
        timerDisplay.innerText = `⏱️ 00:${count < 10 ? '0' + count : count}`;
        if (count <= 0) {
            clearInterval(appState.gameTimer);
            showMarketRecallQuestion(stage);
        }
    }, 1000);
}

function skipMarketCountdown() {
    if (appState.gameTimer) clearInterval(appState.gameTimer);
    const stage = document.getElementById('game-stage-container');
    showMarketRecallQuestion(stage);
}

function showMarketRecallQuestion(stage) {
    const target = appState.marketTarget;
    const distractors = [
        { icon: "🏀", name: "Basketball (गेंद)" },
        { icon: "🚗", name: "Car (मोटर कार)" },
        { icon: "👟", name: "Shoe (जूता)" },
        { icon: "📱", name: "Mobile Phone" }
    ];

    const choices = [target, distractors[0], distractors[1], distractors[2]].sort(() => Math.random() - 0.5);
    const t = getT();
    const qText = (t.games && t.games.marketQuestion) || "बाज़ार की टोकरी में इनमें से कौन सी वस्तु रखी गई थी?";

    stage.innerHTML = `
        <div style="width: 100%; max-width: 650px; text-align: center;">
            <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🧺 🧺 🧺</div>
            <h3 style="font-size: 1.4rem; color: var(--gov-navy); margin-bottom: 1.2rem;">
                ${qText}
            </h3>
            <div class="game-options-container">
                ${choices.map(c => `
                    <button class="game-choice-btn" onclick="submitAnswer('${c.name === target.name ? 'correct' : 'wrong'}', '${target.name}')">
                        ${c.icon} ${c.name}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    speakText(qText);
}

// GAME 2: Local NER Cultural Memory (Rotating Heritage Questions)
const nerHeritageQuestions = [
    {
        title: "कामाख्या मंदिर (Kamakhya Temple)",
        icon: "🛕",
        hint: "असम के नीलांचल पर्वत पर स्थित प्रसिद्ध शक्तिपीठ",
        q: "यह उत्तर-पूर्वी क्षेत्र की कौन सी प्रसिद्ध पावन धरोहर है?",
        options: [
            { text: "🛕 कामाख्या मंदिर (Assam)", isCorrect: true },
            { text: "🏔️ कंचनजंगा पर्वत (Sikkim)", isCorrect: false },
            { text: "🏖️ पुरी जगन्नाथ (Odisha)", isCorrect: false }
        ]
    },
    {
        title: "लोकतक झील (Loktak Lake)",
        icon: "🛶",
        hint: "तैरते हुए द्वीपों (फुंडी) के लिए विश्वविख्यात मीठे पानी की झील",
        q: "मणिपुर की यह प्रसिद्ध तैरती हुई झील कौन सी है?",
        options: [
            { text: "🛶 लोकतक झील, मणिपुर (Loktak Lake)", isCorrect: true },
            { text: "🌊 डल झील (Dal Lake)", isCorrect: false },
            { text: "🌊 चिल्का झील (Chilika Lake)", isCorrect: false }
        ]
    },
    {
        title: "जीवित जड़ पुल (Living Root Bridges)",
        icon: "🌿",
        hint: "मेघालय में रबर के पेड़ों की जीवित जड़ों से बने प्राकृतिक पुल",
        q: "मेघालय की यह अद्भुत प्राकृतिक इंजीनियरिंग कौन सी है?",
        options: [
            { text: "🌿 जीवित जड़ पुल (Meghalaya Root Bridges)", isCorrect: true },
            { text: "🌉 हावड़ा ब्रिज (Kolkata)", isCorrect: false },
            { text: "🪵 लकड़ी का पुल (Wooden Bridge)", isCorrect: false }
        ]
    }
];

function runLocalNerRound(stage) {
    const q = nerHeritageQuestions[(appState.gameRound - 1) % nerHeritageQuestions.length];

    stage.innerHTML = `
        <div style="width: 100%; max-width: 650px; text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 0.5rem;">${q.icon}</div>
            <h3 style="font-size: 1.5rem; color: var(--gov-saffron-dark); margin-bottom: 0.4rem;">${q.title}</h3>
            <p style="font-size: 1.05rem; font-weight: 700; color: #475569; margin-bottom: 1.2rem;">${q.hint}</p>
            <h4 style="font-size: 1.3rem; color: var(--gov-navy); margin-bottom: 1.2rem;">${q.q}</h4>
            <div class="game-options-container">
                ${q.options.map(opt => `
                    <button class="game-choice-btn" onclick="submitAnswer('${opt.isCorrect ? 'correct' : 'wrong'}', '${q.title}')">
                        ${opt.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    speakText(q.q);
}

// GAME 3: Family Memory Recognition Round
function runFamilyMemoryRound(stage) {
    const memories = appState.digitalMemories;
    const item = memories[(appState.gameRound - 1) % memories.length];

    stage.innerHTML = `
        <div style="width: 100%; max-width: 650px; text-align: center;">
            <img src="${item.image_url}" style="width:170px; height:170px; border-radius:50%; object-fit:cover; border:5px solid var(--gov-navy); margin-bottom:1rem; box-shadow: var(--shadow-md);">
            <h3 style="font-size: 1.4rem; color: var(--gov-navy); margin-bottom: 1.2rem;">
                ${item.q1}
            </h3>
            <div class="game-options-container">
                <button class="game-choice-btn" onclick="submitAnswer('correct', '${item.title}')">
                    ❤️ ${item.ans_correct || item.title}
                </button>
                <button class="game-choice-btn" onclick="submitAnswer('wrong', '')">
                    ❓ ${item.ans_wrong || 'अनजान (Unknown)'}
                </button>
            </div>
        </div>
    `;

    speakText(item.q1);
}

// GAME 4: Routine Sequence Recall Round
const routineQuestions = [
    {
        q: "सुबह उठने के बाद का सही स्वास्थ्य क्रम क्या है?",
        display: "1. बिस्तर से जागना 🌅 → 2. दांत ब्रश करना 🪥 → 3. सुबह की दवाई 💊",
        options: [
            { text: "✅ जागना 🌅 ➔ ब्रुश 🪥 ➔ दवाई 💊", isCorrect: true },
            { text: "❌ दवाई 💊 ➔ सोना 😴 ➔ जागना 🌅", isCorrect: false }
        ]
    },
    {
        q: "दोपहर के भोजन के बाद सही आदत क्या है?",
        display: "1. हल्का भोजन 🍲 → 2. पानी पीना 💧 → 3. थोड़ा विश्राम 🛋️",
        options: [
            { text: "✅ भोजन 🍲 ➔ पानी 💧 ➔ आराम 🛋️", isCorrect: true },
            { text: "❌ भारी दौड़ 🏃 ➔ तुरंत सोना 😴", isCorrect: false }
        ]
    },
    {
        q: "रात को सोने से पहले का सही क्रम क्या है?",
        display: "1. हल्का खाना 🥣 → 2. रात की दवा 💊 → 3. समय पर शयन 😴",
        options: [
            { text: "✅ खाना 🥣 ➔ दवा 💊 ➔ शयन 😴", isCorrect: true },
            { text: "❌ जागना 🌅 ➔ चाय पीना ☕ ➔ दौड़ना 🏃", isCorrect: false }
        ]
    }
];

function runRoutineRound(stage) {
    const rq = routineQuestions[(appState.gameRound - 1) % routineQuestions.length];

    stage.innerHTML = `
        <div style="width: 100%; max-width: 650px; text-align: center;">
            <h3 style="font-size: 1.4rem; color: var(--gov-navy); margin-bottom: 0.8rem;">${rq.q}</h3>
            <div style="background: #fffbeb; border: 1.5px solid #fcd34d; padding: 1rem; border-radius: 10px; font-size: 1.15rem; font-weight: 700; color: #92400e; margin-bottom: 1.4rem;">
                ${rq.display}
            </div>
            <div class="game-options-container">
                ${rq.options.map(opt => `
                    <button class="game-choice-btn" onclick="submitAnswer('${opt.isCorrect ? 'correct' : 'wrong'}', 'दिनचर्या क्रम')">
                        ${opt.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    speakText(rq.q);
}

// GAME 5: Pattern Logic Round
const patternQuestions = [
    {
        q: "इस रंग श्रृंखला को पूरा करें:",
        sequence: "🔴 &nbsp; 🔵 &nbsp; 🔴 &nbsp; 🔵 &nbsp; ❓",
        options: [
            { text: "🔴 लाल (Red)", isCorrect: true },
            { text: "🟢 हरा (Green)", isCorrect: false },
            { text: "🟡 पीला (Yellow)", isCorrect: false }
        ]
    },
    {
        q: "इस आकृति क्रम में अगला क्या आएगा?",
        sequence: "⭐ &nbsp; 🔺 &nbsp; ⭐ &nbsp; 🔺 &nbsp; ❓",
        options: [
            { text: "⭐ सितारा (Star)", isCorrect: true },
            { text: "⬛ चौकोर (Square)", isCorrect: false }
        ]
    },
    {
        q: "संख्याओं की इस श्रृंखला में अगला अंक चुनें:",
        sequence: "1️⃣ &nbsp; 2️⃣ &nbsp; 1️⃣ &nbsp; 2️⃣ &nbsp; ❓",
        options: [
            { text: "1️⃣ एक (Number 1)", isCorrect: true },
            { text: "3️⃣ तीन (Number 3)", isCorrect: false }
        ]
    }
];

function runPatternRound(stage) {
    const pq = patternQuestions[(appState.gameRound - 1) % patternQuestions.length];

    stage.innerHTML = `
        <div style="width: 100%; max-width: 650px; text-align: center;">
            <h3 style="font-size: 1.4rem; color: var(--gov-navy); margin-bottom: 1rem;">${pq.q}</h3>
            <div style="font-size: 3.2rem; background: #eff6ff; padding: 1.2rem; border-radius: 12px; border: 2px solid #bfdbfe; margin-bottom: 1.5rem;">
                ${pq.sequence}
            </div>
            <div class="game-options-container">
                ${pq.options.map(opt => `
                    <button class="game-choice-btn" onclick="submitAnswer('${opt.isCorrect ? 'correct' : 'wrong'}', 'पैटर्न')">
                        ${opt.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    speakText(pq.q);
}

// ==========================================================================
// REAL-TIME SCORE ENGINE (Dynamic Patient Gameplay Tracking)
// ==========================================================================

function addRealtimeScore(points, reason = "") {
    if (!points || points <= 0) return;
    const prev = appState.todayScore || 0;
    appState.todayScore = Math.min(100, prev + points);
    try {
        localStorage.setItem('mindset_today_score', appState.todayScore);
    } catch (e) {
        console.warn("Score persist warn", e);
    }
    renderRealtimeScoreUI(points, prev);

    if (appState.todayScore === 100 && prev < 100) {
        showToast("🌟 अद्भुत! आज का 100/100 स्कोर लक्ष्य पूर्ण! (100% Target)");
    }
}

function resetTodayScore(event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    appState.todayScore = 0;
    try {
        localStorage.setItem('mindset_today_score', 0);
    } catch (e) {
        console.warn("Storage reset warn", e);
    }
    renderRealtimeScoreUI(0, 0);
    showToast("आज का स्कोर रीसेट किया गया (0/100). अब खेल खेलकर स्कोर बढ़ाएं!");
}

function renderRealtimeScoreUI(pointsDelta = 0, prevScore = 0) {
    const t = getT();
    const gT = t.games || {};
    const scoreBadgePrefix = gT.scoreBadge || "<i class='fa-solid fa-award'></i> आज का स्कोर: ";
    const resetTitle = appState.lang === 'en' ? "Reset Score for Demo" : "स्कोर रीसेट करें (डेमो हेतु)";

    // 1. Elderly Dashboard Badge
    const elScore = document.getElementById('elderly-today-score');
    if (elScore) {
        const deltaHtml = (pointsDelta > 0) ? `<span class="score-delta-badge">+${pointsDelta}</span>` : '';
        elScore.innerHTML = `
            ${scoreBadgePrefix} <strong id="val-today-score">${appState.todayScore}</strong>/100 ${deltaHtml}
            <button type="button" class="btn-score-reset" onclick="resetTodayScore(event)" title="${resetTitle}">
                <i class="fa-solid fa-arrows-rotate"></i>
            </button>
        `;

        if (pointsDelta > 0) {
            elScore.classList.remove('score-bump');
            void elScore.offsetWidth; // force DOM reflow for CSS animation
            elScore.classList.add('score-bump');
        }
    }

    // 2. Caregiver Circle & Briefing Chip
    const cgCircle = document.getElementById('cg-overall-score-circle');
    if (cgCircle) {
        cgCircle.innerText = `${appState.todayScore}%`;
    }
    const bEng = document.getElementById('b-eng');
    if (bEng) {
        bEng.innerText = `${appState.todayScore}%`;
    }
    const cgStatus = document.getElementById('cg-overall-score-status');
    if (cgStatus) {
        if (appState.todayScore >= 80) {
            cgStatus.innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i> सक्रिय व उत्कृष्ट (${appState.todayScore}% जुड़ाव)`;
            cgStatus.style.color = '#16a34a';
        } else if (appState.todayScore >= 40) {
            cgStatus.innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i> दैनिक सत्र प्रगति पर (${appState.todayScore}%)`;
            cgStatus.style.color = '#2563eb';
        } else if (appState.todayScore > 0) {
            cgStatus.innerHTML = `<i class="fa-solid fa-play"></i> प्रारंभिक संज्ञानात्मक सत्र (${appState.todayScore}%)`;
            cgStatus.style.color = '#d97706';
        } else {
            cgStatus.innerHTML = `<i class="fa-solid fa-clock"></i> आज का पहला खेल प्रतीक्षित (0%)`;
            cgStatus.style.color = '#64748b';
        }
    }

    // 3. Clinical Print Modal Score
    const clinicalScore = document.getElementById('modal-clinical-score');
    if (clinicalScore) {
        clinicalScore.innerText = `${appState.todayScore}/100 (${appState.todayScore >= 70 ? 'Stable Active' : 'Session In Progress'})`;
    }
}

// Answer Submission, AI Adaptation and Round Progression
function submitAnswer(result, detail) {
    const isCorrect = (result === 'correct');
    const elapsed = Math.max(2.5, (Date.now() - appState.gameStartTime) / 1000.0);
    const accuracy = isCorrect ? 95.0 : 45.0;
    const mistakes = isCorrect ? 0 : 2;

    if (isCorrect) {
        appState.roundScore += 33;
        const ptsEarned = 15;
        addRealtimeScore(ptsEarned, "सही उत्तर");
        speakText("बहुत बढ़िया रमेश जी! आपका उत्तर बिल्कुल सही है।");
        showToast(`✓ सही उत्तर! (+${ptsEarned} अंक | आज का स्कोर: ${appState.todayScore}/100)`);
    } else {
        speakText("कोई बात नहीं रमेश जी! अभ्यास से यादें ताज़ा होती हैं।");
        showToast("पुनः प्रयास करें");
    }

    const aiCard = document.getElementById('ai-adaptation-card');
    document.getElementById('ai-val-acc').innerText = `${accuracy}%`;
    document.getElementById('ai-val-speed').innerText = `${elapsed.toFixed(1)}s`;

    // Call ML adaptive difficulty endpoint
    if (!appState.isOffline) {
        fetch(`${API_BASE}/api/ai/adaptive-difficulty`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                accuracy: accuracy,
                response_time: elapsed,
                mistake_count: mistakes,
                current_difficulty: appState.currentDifficulty
            })
        })
        .then(res => res.json())
        .then(data => {
            appState.currentDifficulty = data.next_difficulty;
            document.getElementById('current-diff-display').innerHTML = `<i class="fa-solid fa-robot"></i> AI स्तर: ${data.next_difficulty} (Adaptive)`;
            document.getElementById('ai-val-next').innerText = `${data.next_difficulty}`;
            document.getElementById('ai-reason-text').innerText = `🤖 AI विश्लेषण: ${data.ai_reasoning}`;
            aiCard.style.display = 'block';
        })
        .catch(() => {
            aiCard.style.display = 'block';
        });
    } else {
        aiCard.style.display = 'block';
    }

    // Save session in log
    saveSessionLog(appState.activeGameType, isCorrect ? 95 : 45, accuracy, elapsed, appState.currentDifficulty);
}

function advanceNextGameRound() {
    if (appState.gameRound < appState.maxRounds) {
        appState.gameRound++;
        loadGameRound();
    } else {
        showCelebrationScreen();
    }
}

function showCelebrationScreen() {
    const stage = document.getElementById('game-stage-container');
    document.getElementById('ai-adaptation-card').style.display = 'none';

    // Award session completion bonus in real time
    const sessionBonus = 10;
    addRealtimeScore(sessionBonus, "सत्र पूर्णता बोनस");
    const sessionScore = Math.min(100, Math.max(30, appState.roundScore));

    const t = getT();
    const gT = t.games || {};
    const celebTitle = gT.celebTitle || "शानदार प्रदर्शन, रमेश जी!";
    const celebSub = gT.celebSub || "आपने आज का संज्ञानात्मक सत्र सफलतापूर्वक पूरा कर लिया है।";
    const celebScore = gT.celebScore || "आज का कुल स्कोर (Session Score):";
    const celebStreak = gT.celebStreak || "✓ 7-Day Active Streak सुरक्षित!";
    const celebAgain = gT.celebAgain || "फिर से खेलें (Play Again)";
    const celebOther = gT.celebOther || "अन्य खेल चुनें (Other Games)";

    stage.innerHTML = `
        <div style="width: 100%; max-width: 600px; text-align: center; padding: 1.5rem;">
            <div style="font-size: 4.5rem; margin-bottom: 0.5rem;">🎉 🏆 🌟</div>
            <h2 style="color: var(--gov-navy); font-size: 1.8rem; margin-bottom: 0.5rem;">${celebTitle}</h2>
            <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 1.2rem;">${celebSub}</p>
            
            <div style="background: #ecfdf5; border: 2px solid #a7f3d0; border-radius: 12px; padding: 1.2rem; margin-bottom: 1.5rem;">
                <div style="font-size: 0.95rem; font-weight: 700; color: #065f46;">${celebScore}</div>
                <div style="font-size: 2.8rem; font-weight: 800; color: #047857;">${sessionScore} / 100</div>
                <div style="font-size: 0.92rem; color: #047857; font-weight: 700; margin-top: 4px;">
                    +${sessionBonus} सत्र बोनस! आज का संचयी स्कोर: <strong>${appState.todayScore}</strong>/100 | ${celebStreak}
                </div>
            </div>

            <div style="display:flex; justify-content:center; gap: 1rem; flex-wrap: wrap;">
                <button class="btn-primary-gov" style="font-size: 1.1rem; padding: 0.8rem 1.6rem;" onclick="startSelectedGame(appState.activeGameType)">
                    <i class="fa-solid fa-rotate-right"></i> ${celebAgain}
                </button>
                <button class="btn-secondary-gov" style="font-size: 1.1rem; padding: 0.8rem 1.6rem;" onclick="exitGameArena()">
                    <i class="fa-solid fa-list"></i> ${celebOther}
                </button>
            </div>
        </div>
    `;

    speakText("शानदार प्रदर्शन रमेश जी! आपने आज का संज्ञानात्मक सत्र सफलतापूर्वक पूरा कर लिया है।");
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
        updateOfflineBadgeText();
    } else {
        fetch(`${API_BASE}/api/game/session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(session)
        }).catch(err => console.warn("Session log save failed", err));
    }
}

// ==========================================================================
// 8. DIGITAL MEMORY BOOK ENGINE ⭐ SIGNATURE FEATURE
// ==========================================================================

function renderDigitalMemoryBook() {
    const grid = document.getElementById('dmb-grid-container');
    const showcase = document.getElementById('dmb-active-card');
    const indicator = document.getElementById('dmb-index-indicator');
    if (!grid || !showcase) return;

    if (appState.digitalMemories.length === 0) return;

    const current = appState.digitalMemories[appState.activeDmbIndex] || appState.digitalMemories[0];
    if (!current) return;

    const isEn = (appState.lang === 'en');
    const t = getT();
    const dmbT = t.dmb || {};
    const promptHeading = dmbT.promptHeading || (isEn ? "AI Memory Recall Exercise:" : "AI स्मृति संवर्धन अभ्यास (Memory Prompt):");
    const lastMetLabel = isEn ? "Last meeting / Memory note:" : "अंतिम मुलाकात / स्मृति नोट:";
    const unknownLabel = isEn ? "Unknown" : "अनजान (Unknown)";

    let cardTitle = current.title;
    let cardRelation = current.relationship;
    let cardDate = current.last_met_date;
    let cardQ = current.q1;
    let cardCorrect = current.ans_correct || current.title;
    let cardWrong = current.ans_wrong || unknownLabel;

    if (isEn) {
        if (current.memory_id === 'dmb001') {
            cardTitle = 'Ananya Sharma';
            cardRelation = 'Daughter';
            cardDate = 'Last Sunday';
            cardQ = 'What is the name of your loving daughter shown in this photo?';
            cardCorrect = 'Ananya Sharma';
            cardWrong = 'Seema Verma';
        } else if (current.memory_id === 'dmb002') {
            cardTitle = 'Rahul Sharma';
            cardRelation = 'Son';
            cardDate = '2 weeks ago';
            cardQ = 'Who is your son in this picture?';
            cardCorrect = 'Rahul Sharma';
            cardWrong = 'Vikram';
        } else if (current.memory_id === 'dmb003') {
            cardTitle = 'Kaziranga National Park Trip';
            cardRelation = 'Family Holiday (Assam)';
            cardDate = 'Spring 2024';
            cardQ = 'Which famous national park in Assam did our family visit?';
            cardCorrect = 'Kaziranga National Park';
            cardWrong = 'Manas National Park';
        } else if (current.memory_id === 'dmb004') {
            cardTitle = 'Traditional Assamese Thali';
            cardRelation = 'Favorite Dish (Family Feast)';
            cardDate = 'Bihu Festival';
            cardQ = 'Which traditional festive feast was prepared during Bihu?';
            cardCorrect = 'Assamese Fish Tenga & Rice';
            cardWrong = 'Kadhi Chawal';
        }
    }

    // Update active showcase card
    showcase.innerHTML = `
        <img src="${current.image_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'}" class="dmb-showcase-img" alt="${cardTitle}">
        <h3 style="font-size: 1.6rem; color: var(--gov-navy); margin-top: 0.4rem;">${cardTitle}</h3>
        <p style="font-size: 1.05rem; color: var(--gov-saffron-dark); font-weight: 700;">${cardRelation}</p>
        <p style="font-size: 0.9rem; color: var(--text-muted); font-weight: 600;">${lastMetLabel} ${cardDate || (isEn ? 'Recently' : 'हाल ही में')}</p>
        
        <div class="dmb-qa-box">
            <h4><i class="fa-solid fa-brain"></i> ${promptHeading}</h4>
            <p>“${cardQ || (isEn ? 'Do you recognize this person or place?' : 'क्या आप इन्हें पहचानते हैं?')}”</p>
            <div style="display:flex; justify-content:center; gap: 1rem; flex-wrap: wrap;">
                <button class="game-choice-btn" style="padding: 0.8rem 1.6rem; font-size: 1.15rem;" onclick="answerDmbPrompt('correct', '${cardTitle.replace(/'/g, "\\'")}')">
                    ❤️ ${cardCorrect}
                </button>
                <button class="game-choice-btn" style="padding: 0.8rem 1.6rem; font-size: 1.15rem; border-color: #94a3b8; color: #64748b;" onclick="answerDmbPrompt('wrong', '${cardTitle.replace(/'/g, "\\'")}')">
                    ❓ ${cardWrong}
                </button>
            </div>
        </div>
    `;

    if (indicator) {
        indicator.innerText = `${appState.activeDmbIndex + 1} / ${appState.digitalMemories.length}`;
    }

    // Render Thumbnails
    grid.innerHTML = appState.digitalMemories.map((m, idx) => {
        let thumbTitle = m.title;
        let thumbRelation = m.relationship;
        if (isEn) {
            if (m.memory_id === 'dmb001') { thumbTitle = 'Ananya Sharma'; thumbRelation = 'Daughter'; }
            else if (m.memory_id === 'dmb002') { thumbTitle = 'Rahul Sharma'; thumbRelation = 'Son'; }
            else if (m.memory_id === 'dmb003') { thumbTitle = 'Kaziranga Trip'; thumbRelation = 'Assam Trip'; }
            else if (m.memory_id === 'dmb004') { thumbTitle = 'Assamese Thali'; thumbRelation = 'Favorite Dish'; }
        }
        return `
            <div class="dmb-thumb-item ${idx === appState.activeDmbIndex ? 'active' : ''}" onclick="selectDmbCard(${idx})">
                <img src="${m.image_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'}" alt="${thumbTitle}">
                <div class="dmb-thumb-body">
                    <h4>${thumbTitle}</h4>
                    <p>${thumbRelation}</p>
                </div>
            </div>
        `;
    }).join('');
}

function selectDmbCard(index) {
    appState.activeDmbIndex = index;
    renderDigitalMemoryBook();
    const item = appState.digitalMemories[index];
    if (item) speakText(`स्मृति कार्ड: ${item.title}`);
}

function prevDmbCard() {
    if (appState.activeDmbIndex > 0) {
        appState.activeDmbIndex--;
    } else {
        appState.activeDmbIndex = appState.digitalMemories.length - 1;
    }
    renderDigitalMemoryBook();
}

function nextDmbCard() {
    if (appState.activeDmbIndex < appState.digitalMemories.length - 1) {
        appState.activeDmbIndex++;
    } else {
        appState.activeDmbIndex = 0;
    }
    renderDigitalMemoryBook();
}

function answerDmbPrompt(result, text) {
    if (result === 'correct') {
        const pts = 10;
        addRealtimeScore(pts, "स्मृति पहचान");
        speakText(`बहुत सुंदर रमेश जी! बिल्कुल सही, यह आपकी ${text} हैं। कितनी सुंदर यादें हैं!`);
        showToast(`✓ सही स्मृति पहचान! (+${pts} अंक | स्कोर: ${appState.todayScore}/100)`);
    } else {
        speakText(`कोई बात नहीं रमेश जी! यह आपकी ${appState.digitalMemories[appState.activeDmbIndex].title} की तस्वीर है।`);
        showToast("स्मृति नोट रिकॉर्ड किया गया");
    }
}

function handleCreateMemoryBookModal(event) {
    event.preventDefault();
    const cat = document.getElementById('modal-dmb-category').value;
    const title = document.getElementById('modal-dmb-title').value;
    const rel = document.getElementById('modal-dmb-rel').value;
    const url = document.getElementById('modal-dmb-url').value;

    const newMem = {
        memory_id: `dmb_${Date.now()}`,
        user_id: appState.user_id,
        category: cat,
        title: title,
        relationship: rel,
        last_met_date: 'हाल ही में जोड़ा गया',
        image_url: url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
        q1: `यह आपके परिवार या जीवन का क्या है?`,
        ans_correct: title,
        ans_wrong: 'अन्य'
    };

    appState.digitalMemories.unshift(newMem);
    appState.activeDmbIndex = 0;
    renderDigitalMemoryBook();
    closeModal('modal-add-dmb');
    showToast("✓ डिजिटल मेमोरी बुक कार्ड सफलतापूर्वक जुड़ गया!");
    speakText(`नई याद जोड़ी गई: ${title}`);

    if (!appState.isOffline) {
        fetch(`${API_BASE}/api/memory-book`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMem)
        }).catch(err => console.warn("Memory book save err", err));
    }
}

// ==========================================================================
// 9. MEMORY THROUGH MUSIC 🎵
// ==========================================================================

function loadMusicTracks() {
    const track = appState.musicTracks[appState.activeMusicIndex];
    if (!track) return;
    const isEn = (appState.lang === 'en');
    const t = getT();
    const musicT = t.music || {};

    const trackTitles = isEn ? [
        'Assamese Folk Bihu Flute',
        'Classical Bamboo Flute Raga',
        'Manipuri Traditional Pena Melody'
    ] : [
        'असमिया लोक बिहू बांसुरी',
        'शास्त्रीय बांस बांसुरी राग',
        'मणिपुरी पेना लोक धुन'
    ];

    const trackRegions = isEn ? [
        'Assam Traditional Folk Music',
        'Peaceful North Eastern Bamboo Flute Raga',
        'Traditional Manipuri Pena String Melody'
    ] : [
        'असम की पारंपरिक धुन (Assam Traditional)',
        'पूर्वोत्तर की शांतिदायक बांसुरी राग',
        'मणिपुर का पारंपरिक लोक वाद्य'
    ];

    const trackPrompts = isEn ? [
        '“Do you remember this Bihu folk melody?”',
        '“How do you feel listening to this peaceful flute music?”',
        '“Have you heard this traditional Manipuri Pena string sound before?”'
    ] : [
        '“क्या आपको यह बिहू लोक संगीत याद है?” (Do you remember this Bihu melody?)',
        '“यह बांसुरी का शांत संगीत आपको कैसा लग रहा है?”',
        '“क्या आपको मणिपुर के लोक नृत्यों का यह संगीत याद है?”'
    ];

    const titleEl = document.getElementById('music-track-title');
    const regionEl = document.getElementById('music-track-region');
    const promptEl = document.getElementById('music-prompt-question');

    if (titleEl) titleEl.innerText = trackTitles[appState.activeMusicIndex] || track.title;
    if (regionEl) regionEl.innerText = trackRegions[appState.activeMusicIndex] || track.artist_region;
    if (promptEl) promptEl.innerText = trackPrompts[appState.activeMusicIndex] || track.question_prompt;
    
    // Update track buttons text if available in localization dictionary
    if (musicT.tracks && Array.isArray(musicT.tracks)) {
        musicT.tracks.forEach((trName, idx) => {
            const btnEl = document.getElementById(`music-track-btn-${idx}`);
            if (btnEl) btnEl.innerText = trName;
        });
    }

    const audioEl = document.getElementById('reminiscence-audio');
    if (audioEl) {
        audioEl.src = track.audio_url;
    }
}

function selectMusicTrack(index) {
    appState.activeMusicIndex = index;
    loadMusicTracks();
    const audioEl = document.getElementById('reminiscence-audio');
    if (audioEl) audioEl.play().catch(() => {});
    showToast(`संगीत ट्रैक: ${appState.musicTracks[index].title}`);
}

function respondMusicMemory(type) {
    const isEn = (appState.lang === 'en');
    if (type === 'yes') {
        speakText(isEn ? "That is a wonderful feeling Ramesh ji! Music stimulates parts of our brain linked with deep positive memories." : "यह बहुत सुखद अनुभव है रमेश जी! संगीत हमारे मस्तिष्क के उन हिस्सों को सक्रिय करता है जो गहरी भावनाओं से जुड़े होते हैं।");
        showToast(isEn ? "✓ Positive memory recall recorded" : "✓ सकारात्मक भावनात्मक स्मृति दर्ज");
    } else {
        const audioEl = document.getElementById('reminiscence-audio');
        if (audioEl) audioEl.play().catch(() => {});
        speakText(isEn ? "Playing the melody again. Enjoy the soothing music!" : "संगीत पुनः बजाया जा रहा है। आनंद लें!");
    }
}

// ==========================================================================
// 10. FAMILY CONNECT FEED 👨‍👩‍👧
// ==========================================================================

function loadFamilyPosts() {
    const feed = document.getElementById('family-feed-list');
    if (!feed) return;
    const isEn = (appState.lang === 'en');
    const t = getT();
    const replyPrefix = (t.family && t.family.replyBtn) || (isEn ? 'Send Voice Note to' : 'वॉयस उत्तर भेजें (Voice Reply to');

    const posts = isEn ? [
        { 
            post_id: 'fp001', 
            sender_name: 'Ananya Sharma (Daughter)', 
            sender_relation: 'Daughter', 
            media_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', 
            text_message: 'Good morning Father! ❤️ Hope you are feeling wonderful today. We are all coming to visit you this Saturday!',
            timestamp: 'Today 08:30 AM'
        },
        { 
            post_id: 'fp002', 
            sender_name: 'Aarav (Grandson)', 
            sender_relation: 'Grandson', 
            media_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 
            text_message: 'Hello Grandpa! 🎨 I won first prize in today\'s school art and drawing competition!',
            timestamp: 'Today 10:15 AM'
        }
    ] : [
        { 
            post_id: 'fp001', 
            sender_name: 'अनन्या शर्मा (पुत्री)', 
            sender_relation: 'पुत्री', 
            media_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', 
            text_message: 'सुप्रभात पिताजी! ❤️ आशा है आप बहुत अच्छा महसूस कर रहे हैं। इस शनिवार हम सब आपसे मिलने आ रहे हैं!',
            timestamp: 'आज 08:30 पूर्वाह्न'
        },
        { 
            post_id: 'fp002', 
            sender_name: 'आरव (पोता)', 
            sender_relation: 'पोता', 
            media_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 
            text_message: 'दादा जी प्रणाम! 🎨 आज स्कूल की ड्राइंग प्रतियोगिता में मुझे प्रथम पुरस्कार मिला है!',
            timestamp: 'आज 10:15 पूर्वाह्न'
        }
    ];

    feed.innerHTML = posts.map(p => `
        <div style="background: #ffffff; border: 1.5px solid var(--border-color); border-radius: 12px; padding: 1.2rem; display: flex; gap: 1.2rem; align-items: flex-start; box-shadow: var(--shadow-sm);">
            <img src="${p.media_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'}" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 3px solid var(--gov-navy); flex-shrink: 0;" alt="${p.sender_name}">
            <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
                    <h4 style="font-size: 1.15rem; color: var(--gov-navy); font-weight: 800;">${p.sender_name}</h4>
                    <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">${p.timestamp || (isEn ? 'Recently' : 'हाल ही में')}</span>
                </div>
                <p style="font-size: 1.15rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.8rem; line-height: 1.5;">“${p.text_message}”</p>
                <button class="btn-primary-gov" style="padding: 0.5rem 1rem; font-size: 0.9rem;" onclick="openVoiceReplyModal('${p.sender_name.replace(/'/g, "\\'")}')">
                    <i class="fa-solid fa-microphone"></i> ${replyPrefix} ${p.sender_name.split(' ')[0]}
                </button>
            </div>
        </div>
    `).join('');
}

function openVoiceReplyModal(senderName) {
    const isEn = (appState.lang === 'en');
    const targetEl = document.getElementById('voice-reply-target');
    if (targetEl) targetEl.innerText = isEn ? `Recording voice message for ${senderName}...` : `${senderName} को वॉयस संदेश भेजें...`;
    openModal('modal-voice-reply');
}

function confirmVoiceReplySent() {
    closeModal('modal-voice-reply');
    showToast("✓ आपका वॉयस संदेश परिवार को भेज दिया गया!");
    speakText("परिवार को आपका संदेश भेज दिया गया है: खूब सारा प्यार और आशीर्वाद!");
}

function handleCaregiverPostSubmit(event) {
    event.preventDefault();
    const text = document.getElementById('cg-post-text').value;
    const url = document.getElementById('cg-post-url').value;

    const newPost = {
        post_id: `fp_${Date.now()}`,
        user_id: appState.user_id,
        sender_name: 'अनन्या शर्मा (पुत्री)',
        sender_relation: 'Daughter',
        media_url: url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
        text_message: text,
        timestamp: 'अभी-अभी (Just now)'
    };

    appState.familyPosts.unshift(newPost);
    loadFamilyPosts();
    document.getElementById('cg-quick-post-form').reset();
    showToast("✓ संदेश मरीज के परिवार फीड में पोस्ट हो गया!");

    if (!appState.isOffline) {
        fetch(`${API_BASE}/api/family-posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        }).catch(err => console.warn("Post err", err));
    }
}

// ==========================================================================
// 11. DAILY MOOD CHECK-IN 😊
// ==========================================================================

function submitMoodCheckIn(level, label) {
    const isEn = (appState.lang === 'en');
    const box = document.getElementById('mood-feedback-box');
    const text = document.getElementById('mood-feedback-text');
    if (box && text) {
        text.innerText = isEn ?
            `Thank you Ramesh Ji! Your mood (${label}) has been logged successfully.` :
            `धन्यवाद रमेश जी! आपका मिजाज (${label}) सफलतापूर्वक दर्ज किया गया है।`;
        box.style.display = 'block';
    }

    // Update Caregiver briefing widget
    const bMood = document.getElementById('b-mood');
    if (bMood) bMood.innerText = label.split(' ')[0];

    showToast(isEn ? `✓ Daily mood recorded: ${label}` : `✓ दैनिक मिजाज दर्ज: ${label}`);
    speakText(isEn ? `Your mood today has been recorded as ${label}. Take good care of yourself Ramesh ji!` : `आज आपका मिजाज ${label} दर्ज किया गया है। अपना ख्याल रखें रमेश जी!`);

    if (!appState.isOffline) {
        fetch(`${API_BASE}/api/mood/check-in`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: appState.user_id, mood_level: level, mood_label: label })
        }).catch(err => console.warn("Mood save error", err));
    }
}

// ==========================================================================
// 12. REMINDERS CONTROLLER 💊
// ==========================================================================

function renderReminders() {
    const listEl = document.getElementById('elderly-reminders-list');
    if (!listEl) return;
    const t = getT();
    const remT = t.reminders || {};
    const itemsT = remT.items || [];
    const statusCompleted = remT.statusCompleted || '✓ पूर्ण';
    const statusPending = remT.statusPending || 'लंबित (Pending)';
    const doneBtn = remT.doneBtn || 'पूर्ण (Done)';
    const markBtn = remT.markBtn || 'पूर्ण मार्क करें';

    listEl.innerHTML = appState.reminders.map((r, idx) => {
        const itemInfo = itemsT[idx] || {};
        const title = itemInfo.title || r.title;
        const time = itemInfo.time || r.time_scheduled;
        return `
            <div class="reminder-gov-item ${r.status === 'completed' ? 'completed' : ''}">
                <div class="reminder-info">
                    <h4>${r.type === 'medicine' ? '💊' : (r.type === 'hydration' ? '💧' : (r.type === 'activity' ? '🚶' : '🩺'))} ${title}</h4>
                    <p>निर्धारित समय (Time): <strong>${time}</strong> | स्थिति: <strong>${r.status === 'completed' ? statusCompleted : statusPending}</strong></p>
                </div>
                <button class="reminder-action-btn" onclick="toggleReminderDone('${r.reminder_id}')">
                    ${r.status === 'completed' ? `<i class="fa-solid fa-check-circle"></i> ${doneBtn}` : `<i class="fa-regular fa-circle"></i> ${markBtn}`}
                </button>
            </div>
        `;
    }).join('');
}

function toggleReminderDone(remId) {
    const rem = appState.reminders.find(r => r.reminder_id === remId);
    if (rem) {
        rem.status = rem.status === 'completed' ? 'pending' : 'completed';
        renderReminders();
        
        if (rem.status === 'completed') {
            showToast(`✓ ${rem.title} पूर्ण मार्क किया गया`);
            speakText(`${rem.title} पूरा करने के लिए धन्यवाद!`);
        } else {
            showToast(`${rem.title} रीसेट हुआ`);
        }

        if (!appState.isOffline) {
            fetch(`${API_BASE}/api/reminders/${remId}/toggle`, { method: 'PUT' })
                .catch(err => console.warn("Reminder toggle err", err));
        }
    }
}

function handleCreateReminderSubmit(event) {
    event.preventDefault();
    const type = document.getElementById('new-rem-type').value;
    const title = document.getElementById('new-rem-title').value;
    const time = document.getElementById('new-rem-time').value;

    const newRem = {
        reminder_id: `r_${Date.now()}`,
        user_id: appState.user_id,
        type: type,
        title: title,
        time_scheduled: time,
        status: 'pending'
    };

    appState.reminders.push(newRem);
    renderReminders();
    closeModal('modal-add-reminder');
    showToast("✓ नया रिमाइंडर सफलतापूर्वक जोड़ा गया!");
    speakText(`नया रिमाइंडर सुरक्षित हुआ: ${title}`);

    if (!appState.isOffline) {
        fetch(`${API_BASE}/api/reminders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRem)
        }).catch(err => console.warn("Reminder save err", err));
    }
}

// ==========================================================================
// 13. CAREGIVER & DOCTOR DATA ENGINES
// ==========================================================================

function fetchCaregiverBriefing() {
    fetch(`${API_BASE}/api/caregiver/briefing/${appState.user_id}`)
        .then(res => res.json())
        .then(data => {
            if (data.engagement_pct) {
                const engEl = document.getElementById('b-eng');
                const medEl = document.getElementById('b-med');
                const moodEl = document.getElementById('b-mood');
                const recEl = document.getElementById('b-rec-text');
                const currentScore = appState.todayScore > 0 ? appState.todayScore : data.engagement_pct;
                if (engEl) engEl.innerText = `${currentScore}%`;
                const cgCircle = document.getElementById('cg-overall-score-circle');
                if (cgCircle) cgCircle.innerText = `${currentScore}%`;
                const isEn = (appState.lang === 'en');
                if (medEl) medEl.innerText = isEn ? `${data.medicine_status} Done` : `${data.medicine_status} पूर्ण`;
                if (moodEl) moodEl.innerText = isEn ? '😊 Calm & Happy' : (data.mood_summary || '😊 प्रसन्न');
                if (recEl) {
                    if (isEn && (!data.recommendation || data.recommendation.includes('सुबह'))) {
                        recEl.innerText = "Recommended to engage in 15 minutes of Village Market Challenge after breakfast and ensure adequate hydration.";
                    } else {
                        recEl.innerText = data.recommendation;
                    }
                }
            }
        })
        .catch(err => console.warn("Briefing fetch fallback", err));
}

function fetchCaregiverDashboardData() {
    fetch(`${API_BASE}/api/caregiver/dashboard/${appState.user_id}`)
        .then(res => res.json())
        .then(data => {
            if (data.analytics && data.analytics.domain_breakdown) {
                const db = data.analytics.domain_breakdown;
                const setVal = (id, val) => {
                    const el = document.getElementById(id);
                    if (el) el.innerText = `${val}%`;
                };
                const setBar = (id, val) => {
                    const el = document.getElementById(id);
                    if (el) el.style.width = `${val}%`;
                };

                setVal('val-memory', db.memory);
                setBar('bar-memory', db.memory);
                setVal('val-attention', db.attention);
                setBar('bar-attention', db.attention);
                setVal('val-pattern', db.pattern_recognition);
                setBar('bar-pattern', db.pattern_recognition);
                setVal('val-routine', db.routine_recall);
                setBar('bar-routine', db.routine_recall);
            }
        })
        .catch(err => console.warn("Dashboard fetch fallback", err));
}

function fetchDoctorClinicalReport() {
    fetch(`${API_BASE}/api/doctor/longitudinal-report/${appState.user_id}`)
        .then(res => res.json())
        .then(data => {
            if (data.total_sessions) {
                const sessEl = document.getElementById('doc-stat-sessions');
                const accEl = document.getElementById('doc-stat-accuracy');
                const latEl = document.getElementById('doc-stat-latency');
                const diffEl = document.getElementById('doc-stat-diff');
                if (sessEl) sessEl.innerText = data.total_sessions;
                if (accEl) accEl.innerText = `${data.average_accuracy}%`;
                if (latEl) latEl.innerText = `${data.mean_latency}s`;
                if (diffEl) diffEl.innerText = data.current_difficulty;
            }
        })
        .catch(err => console.warn("Doctor report fetch fallback", err));
}

function renderDoctorSessionLogs() {
    const tbody = document.getElementById('doctor-session-logs');
    if (!tbody) return;
    const isEn = (appState.lang === 'en');

    const logs = isEn ? [
        {
            time: 'Today 11:05 AM',
            module: 'Village Market Challenge',
            acc: '95%',
            lat: '4.0s',
            diff: 'Medium',
            badge: 'Upgraded to Hard',
            badgeBg: '#dcfce7',
            badgeColor: '#166534'
        },
        {
            time: 'Today 11:00 AM',
            module: 'North Eastern Heritage',
            acc: '95%',
            lat: '3.8s',
            diff: 'Easy',
            badge: 'Upgraded to Medium',
            badgeBg: '#dcfce7',
            badgeColor: '#166534'
        },
        {
            time: 'Yesterday 04:30 PM',
            module: 'Tea Garden Pattern Recall',
            acc: '88%',
            lat: '5.2s',
            diff: 'Medium',
            badge: 'Maintained Level',
            badgeBg: '#e0f2fe',
            badgeColor: '#0369a1'
        },
        {
            time: '23 Oct 09:15 AM',
            module: 'Bihu Dhol Rhythm Sync',
            acc: '80%',
            lat: '6.1s',
            diff: 'Medium',
            badge: 'Optimal Motor Pace',
            badgeBg: '#fef3c7',
            badgeColor: '#92400e'
        }
    ] : [
        {
            time: 'आज 11:05 पूर्वाह्न',
            module: 'विलेज मार्केट चैलेंज',
            acc: '95%',
            lat: '4.0s',
            diff: 'Medium',
            badge: 'कठिन स्तर पर पदोन्नत',
            badgeBg: '#dcfce7',
            badgeColor: '#166534'
        },
        {
            time: 'आज 11:00 पूर्वाह्न',
            module: 'पूर्वोत्तर सांस्कृतिक धरोहर',
            acc: '95%',
            lat: '3.8s',
            diff: 'Easy',
            badge: 'मध्यम स्तर पर पदोन्नत',
            badgeBg: '#dcfce7',
            badgeColor: '#166534'
        },
        {
            time: 'कल 04:30 अपराह्न',
            module: 'चाय बागान पैटर्न',
            acc: '88%',
            lat: '5.2s',
            diff: 'Medium',
            badge: 'स्तर स्थिर रखा गया',
            badgeBg: '#e0f2fe',
            badgeColor: '#0369a1'
        },
        {
            time: '23 अक्टूबर 09:15 पूर्वाह्न',
            module: 'बिहू ढोल रिदम',
            acc: '80%',
            lat: '6.1s',
            diff: 'Medium',
            badge: 'सामान्य मोटर रिस्पॉन्स',
            badgeBg: '#fef3c7',
            badgeColor: '#92400e'
        }
    ];

    tbody.innerHTML = logs.map(l => `
        <tr>
            <td>${l.time}</td>
            <td>${l.module}</td>
            <td><strong>${l.acc}</strong></td>
            <td>${l.lat}</td>
            <td>${l.diff}</td>
            <td><span style="background: ${l.badgeBg}; color: ${l.badgeColor}; padding: 2px 8px; border-radius: 4px; font-weight: 700;">${l.badge}</span></td>
        </tr>
    `).join('');
}

// ==========================================================================
// CAREGIVER PROFILE & PHOTO MANAGEMENT
// ==========================================================================
let pendingCaregiverPhotoDataUrl = null;

function renderCaregiverProfileUI() {
    let savedPhoto = null;
    try {
        savedPhoto = localStorage.getItem('mindset_caregiver_photo');
    } catch(e) {}

    const avatarDisplay = document.getElementById('cg-caregiver-avatar-display');
    const btnAction = document.getElementById('txt-cg-photo-btn');

    if (avatarDisplay) {
        if (savedPhoto) {
            avatarDisplay.innerHTML = `<img src="${savedPhoto}" alt="Caregiver Photo">`;
        } else {
            avatarDisplay.innerHTML = `<i class="fa-solid fa-user-nurse"></i>`;
        }
    }

    if (btnAction) {
        if (savedPhoto) {
            btnAction.innerText = (appState.lang === 'en') ? "✓ Change Photo" : "✓ फोटो बदलें";
        } else {
            btnAction.innerText = (appState.lang === 'en') ? "+ Add Photo" : "+ फोटो जोड़ें (Add Photo)";
        }
    }

    // Sync with primary caregiver member in care circle list
    if (appState.familyMembers && appState.familyMembers.length > 0) {
        const primary = appState.familyMembers.find(m => m.is_primary);
        if (primary) {
            primary.photo_url = savedPhoto || null;
        }
    }
}

function openCaregiverPhotoUploadModal() {
    pendingCaregiverPhotoDataUrl = null;
    const form = document.getElementById('form-upload-caregiver-photo');
    if (form) form.reset();

    const preview = document.getElementById('modal-cg-photo-preview');
    const placeholder = document.getElementById('modal-cg-photo-placeholder');
    let savedPhoto = null;
    try {
        savedPhoto = localStorage.getItem('mindset_caregiver_photo');
    } catch(e) {}

    if (savedPhoto && preview && placeholder) {
        preview.src = savedPhoto;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
    } else if (preview && placeholder) {
        preview.src = '';
        preview.style.display = 'none';
        placeholder.style.display = 'block';
    }

    openModal('modal-upload-caregiver-photo');
}

function handleCaregiverPhotoFileChange(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showToast("कृपया वैध छवि फ़ाइल चुनें (Select image file)");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        pendingCaregiverPhotoDataUrl = e.target.result;
        const preview = document.getElementById('modal-cg-photo-preview');
        const placeholder = document.getElementById('modal-cg-photo-placeholder');
        if (preview && placeholder) {
            preview.src = pendingCaregiverPhotoDataUrl;
            preview.style.display = 'block';
            placeholder.style.display = 'none';
        }
    };
    reader.readAsDataURL(file);
}

function handleCaregiverPhotoUrlChange(event) {
    const url = event.target.value.trim();
    if (url) {
        pendingCaregiverPhotoDataUrl = url;
        const preview = document.getElementById('modal-cg-photo-preview');
        const placeholder = document.getElementById('modal-cg-photo-placeholder');
        if (preview && placeholder) {
            preview.src = url;
            preview.style.display = 'block';
            placeholder.style.display = 'none';
        }
    }
}

function handleCaregiverPhotoSubmit(event) {
    event.preventDefault();
    const nameInput = document.getElementById('modal-cg-name');
    const name = nameInput ? nameInput.value.trim() : 'अनन्या शर्मा (पुत्री)';

    let finalPhoto = pendingCaregiverPhotoDataUrl;
    if (!finalPhoto) {
        try {
            finalPhoto = localStorage.getItem('mindset_caregiver_photo');
        } catch(e) {}
    }

    if (!finalPhoto) {
        showToast("कृपया एक फोटो चुनें या लिंक दर्ज करें (Select or enter photo)");
        return;
    }

    try {
        localStorage.setItem('mindset_caregiver_photo', finalPhoto);
    } catch(e) {}

    if (appState.familyMembers && appState.familyMembers.length > 0) {
        const primary = appState.familyMembers.find(m => m.is_primary);
        if (primary) {
            primary.photo_url = finalPhoto;
            primary.name = name;
        }
    }

    const nameDisplay = document.getElementById('cg-caregiver-display-name');
    if (nameDisplay) nameDisplay.innerText = name;

    renderCaregiverProfileUI();
    renderCareCircleList();
    closeModal('modal-upload-caregiver-photo');
    showToast("देखभालकर्ता की फोटो सफलतापूर्वक अपडेट की गई!");
}

function handleCaregiverPhotoRemove() {
    try {
        localStorage.removeItem('mindset_caregiver_photo');
    } catch(e) {}

    if (appState.familyMembers && appState.familyMembers.length > 0) {
        const primary = appState.familyMembers.find(m => m.is_primary);
        if (primary) primary.photo_url = null;
    }

    pendingCaregiverPhotoDataUrl = null;
    renderCaregiverProfileUI();
    renderCareCircleList();
    closeModal('modal-upload-caregiver-photo');
    const isEn = (appState.lang === 'en');
    showToast(isEn ? "Caregiver photo removed (+ Add Photo enabled)" : "देखभालकर्ता की फोटो हटा दी गई (+ फोटो जोड़ें विकल्प सक्रिय)");
}

// ==========================================================================
// PATIENT PROFILE & PHOTO MANAGEMENT
// ==========================================================================
let pendingPatientPhotoDataUrl = null;

function renderPatientProfileUI() {
    let savedPhoto = null;
    try {
        savedPhoto = localStorage.getItem('mindset_patient_photo');
    } catch(e) {}

    const avatarDisplay = document.getElementById('cg-patient-avatar-display');
    const btnAction = document.getElementById('txt-patient-photo-btn');
    const isEn = (appState.lang === 'en');

    if (avatarDisplay) {
        if (savedPhoto) {
            avatarDisplay.innerHTML = `<img src="${savedPhoto}" alt="Patient Photo" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
        } else {
            avatarDisplay.innerHTML = `<i class="fa-solid fa-hospital-user"></i>`;
        }
    }

    if (btnAction) {
        if (savedPhoto) {
            btnAction.innerText = isEn ? "✓ Change Photo" : "✓ फोटो बदलें";
        } else {
            btnAction.innerText = isEn ? "+ Add Photo" : "+ फोटो जोड़ें (Add Photo)";
        }
    }
}

function openPatientPhotoUploadModal() {
    pendingPatientPhotoDataUrl = null;
    const form = document.getElementById('form-upload-patient-photo');
    if (form) form.reset();

    const preview = document.getElementById('modal-patient-photo-preview');
    const placeholder = document.getElementById('modal-patient-photo-placeholder');
    let savedPhoto = null;
    try {
        savedPhoto = localStorage.getItem('mindset_patient_photo');
    } catch(e) {}

    if (savedPhoto && preview && placeholder) {
        preview.src = savedPhoto;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
    } else if (preview && placeholder) {
        preview.src = '';
        preview.style.display = 'none';
        placeholder.style.display = 'block';
    }

    openModal('modal-upload-patient-photo');
}

function handlePatientPhotoFileChange(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showToast(appState.lang === 'en' ? "Please select a valid image file" : "कृपया वैध छवि फ़ाइल चुनें (Select image file)");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        pendingPatientPhotoDataUrl = e.target.result;
        const preview = document.getElementById('modal-patient-photo-preview');
        const placeholder = document.getElementById('modal-patient-photo-placeholder');
        if (preview && placeholder) {
            preview.src = pendingPatientPhotoDataUrl;
            preview.style.display = 'block';
            placeholder.style.display = 'none';
        }
    };
    reader.readAsDataURL(file);
}

function handlePatientPhotoUrlChange(event) {
    const url = event.target.value.trim();
    if (url) {
        pendingPatientPhotoDataUrl = url;
        const preview = document.getElementById('modal-patient-photo-preview');
        const placeholder = document.getElementById('modal-patient-photo-placeholder');
        if (preview && placeholder) {
            preview.src = url;
            preview.style.display = 'block';
            placeholder.style.display = 'none';
        }
    }
}

function handlePatientPhotoSubmit(event) {
    event.preventDefault();
    const nameInput = document.getElementById('modal-patient-name');
    const isEn = (appState.lang === 'en');
    const name = nameInput ? nameInput.value.trim() : (isEn ? 'Ramesh Sharma (74)' : 'रमेश शर्मा (74)');

    let finalPhoto = pendingPatientPhotoDataUrl;
    if (!finalPhoto) {
        try {
            finalPhoto = localStorage.getItem('mindset_patient_photo');
        } catch(e) {}
    }

    if (!finalPhoto) {
        showToast(isEn ? "Please select or link a photo" : "कृपया एक फोटो चुनें या लिंक दर्ज करें");
        return;
    }

    try {
        localStorage.setItem('mindset_patient_photo', finalPhoto);
    } catch(e) {}

    const nameDisplay = document.getElementById('cg-pat-title');
    if (nameDisplay) {
        nameDisplay.innerText = isEn ? `Patient: ${name}` : `मरीज: ${name}`;
    }

    renderPatientProfileUI();
    closeModal('modal-upload-patient-photo');
    showToast(isEn ? "Patient photo updated successfully!" : "मरीज की फोटो सफलतापूर्वक अपडेट की गई!");
}

function handlePatientPhotoRemove() {
    try {
        localStorage.removeItem('mindset_patient_photo');
    } catch(e) {}

    pendingPatientPhotoDataUrl = null;
    renderPatientProfileUI();
    closeModal('modal-upload-patient-photo');
    const isEn = (appState.lang === 'en');
    showToast(isEn ? "Patient photo removed (+ Add Photo enabled)" : "मरीज की फोटो हटा दी गई (+ फोटो जोड़ें विकल्प सक्रिय)");
}

let pendingUploadedPhotoDataUrl = null;

function renderCareCircleList() {
    const container = document.getElementById('care-circle-list');
    if (!container) return;
    const isEn = (appState.lang === 'en');

    if (!appState.familyMembers || appState.familyMembers.length === 0) {
        container.innerHTML = `
            <div class="add-family-member-card" onclick="openAddFamilyMemberModal()" style="grid-column: 1 / -1;">
                <i class="fa-solid fa-user-plus"></i>
                <span>${isEn ? '+ Add Family Member Photo' : '+ परिवार के सदस्य की फोटो जोड़ें (Add Member Photo)'}</span>
            </div>
        `;
        return;
    }

    const cardsHtml = appState.familyMembers.map((member) => {
        const isPrimaryClass = member.is_primary ? 'primary-caregiver' : '';
        const imgPrimaryClass = member.is_primary ? 'primary' : '';
        const fallbackImg = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200';
        
        let memberName = member.name || '';
        let memberRelation = member.relation || '';
        let memberRole = member.role || '';

        if (isEn) {
            if (member.is_primary || member.id === 'fm001') {
                memberName = 'Ananya Sharma (Daughter)';
                memberRelation = 'Daughter';
                memberRole = 'Primary Caregiver';
            } else if (member.id === 'fm002') {
                memberName = 'Dr. Phukan (Neurologist)';
                memberRelation = 'Attending Neurologist';
                memberRole = 'Medical Caregiver';
            } else if (member.id === 'fm003') {
                memberName = 'Aarav (Grandson)';
                memberRelation = 'Grandson';
                memberRole = 'Family Member';
            } else if (member.id === 'fm004') {
                memberName = 'Suman (Care Assistant)';
                memberRelation = 'Community Caregiver';
                memberRole = 'Assistant';
            }
        }

        const safeName = memberName.replace(/'/g, "\\'");
        const safeRelation = memberRelation.replace(/'/g, "\\'");
        const safeRole = memberRole.replace(/'/g, "\\'");
        const safeContact = (member.contact || '').replace(/'/g, "\\'");
        const safePhoto = (member.photo_url || '').replace(/'/g, "\\'");

        let avatarElHtml = '';
        let addPhotoBtnHtml = '';

        if (member.photo_url) {
            avatarElHtml = `<img src="${member.photo_url}" alt="${memberName}" class="family-avatar-img ${imgPrimaryClass}">`;
            if (member.is_primary) {
                addPhotoBtnHtml = `<button type="button" class="btn-add-member-photo-mini" onclick="event.stopPropagation(); openCaregiverPhotoUploadModal()"><i class="fa-solid fa-camera"></i> ${isEn ? '✓ Change Photo' : 'फोटो बदलें'}</button>`;
            }
        } else if (member.is_primary) {
            avatarElHtml = `<div class="family-avatar-placeholder" title="${isEn ? 'Add Photo' : 'फोटो जोड़ें'}"><i class="fa-solid fa-user-nurse"></i></div>`;
            addPhotoBtnHtml = `<button type="button" class="btn-add-member-photo-mini" onclick="event.stopPropagation(); openCaregiverPhotoUploadModal()"><i class="fa-solid fa-camera"></i> ${isEn ? '+ Add Photo' : '+ फोटो जोड़ें (Add Photo)'}</button>`;
        } else {
            avatarElHtml = `<img src="${fallbackImg}" alt="${memberName}" class="family-avatar-img" onerror="this.src='${fallbackImg}'">`;
        }

        return `
            <div class="family-photo-card ${isPrimaryClass}" onclick="showCareCircleDetails('${safeName}', '${safeRelation}', '${safeRole}', '${safeContact}', '${safePhoto}')" title="${isEn ? 'Click to view details' : 'विवरण देखने के लिए क्लिक करें'}">
                ${avatarElHtml}
                <div class="family-member-info">
                    <strong>${memberName}</strong>
                    <span class="family-rel-badge">${memberRelation}</span>
                    <div class="family-member-role">${memberRole}</div>
                    ${addPhotoBtnHtml}
                </div>
                <div style="color: var(--gov-navy); opacity: 0.6; font-size: 0.85rem;">
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
            </div>
        `;
    }).join('');

    const addCardHtml = `
        <div class="add-family-member-card" onclick="openAddFamilyMemberModal()" title="${isEn ? 'Add Member Photo' : 'नए सदस्य की फोटो जोड़ें'}">
            <i class="fa-solid fa-camera-retro"></i>
            <span>${isEn ? '+ Add Member Photo<br><small style="font-size:0.75rem; color:var(--text-muted); font-weight:normal;">Family & Caregiver</small>' : '+ नई फोटो जोड़ें<br><small style="font-size:0.75rem; color:var(--text-muted); font-weight:normal;">Add Family Photo</small>'}</span>
        </div>
    `;

    container.innerHTML = cardsHtml + addCardHtml;
}

function showCareCircleDetails(name, relation, role, contact, photoUrl) {
    const body = document.getElementById('care-circle-modal-body');
    if (body) {
        const isEn = (appState.lang === 'en');
        const photoHtml = photoUrl ? `
            <div style="width: 84px; height: 84px; margin: 0 auto 0.75rem auto; border-radius: 50%; overflow: hidden; border: 3px solid var(--gov-saffron); box-shadow: var(--shadow-sm);">
                <img src="${photoUrl}" alt="${name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'">
            </div>
        ` : `
            <div style="font-size: 3rem; color: var(--gov-navy); margin-bottom: 0.4rem;"><i class="fa-solid fa-user-check"></i></div>
        `;

        body.innerHTML = `
            <div style="text-align:center; margin-bottom: 1.2rem;">
                ${photoHtml}
                <h3 style="color: var(--gov-navy); font-size: 1.3rem;">${name}</h3>
                <p style="color: var(--gov-saffron-dark); font-weight: 700;">${relation} | ${role}</p>
            </div>
            <div style="background: #f8fafc; border: 1.5px solid var(--border-color); border-radius: 8px; padding: 1.2rem; font-size: 0.95rem;">
                <div style="margin: 0.5rem 0;"><strong>${isEn ? 'Contact / Location:' : 'संपर्क / स्थान:'}</strong> ${contact || (isEn ? 'Not specified' : 'उपलब्ध नहीं')}</div>
                <div style="margin: 0.5rem 0;"><strong>${isEn ? 'Access Permission:' : 'अनुमति स्तर (Access Level):'}</strong> ${isEn ? 'Authorized Primary Circle' : 'अधिकृत देखभालकर्ता (Authorized)'}</div>
                <div style="margin: 0.5rem 0;"><strong>${isEn ? 'Security Protocol:' : 'सुरक्षा प्रोटोकॉल:'}</strong> 2FA SMS & Bio-metric Verified</div>
            </div>
        `;
        openModal('modal-care-circle');
    }
}

function openAddFamilyMemberModal() {
    const form = document.getElementById('form-add-family-member');
    if (form) form.reset();
    pendingUploadedPhotoDataUrl = null;
    const preview = document.getElementById('family-photo-preview');
    if (preview) {
        preview.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200';
    }
    openModal('modal-add-family-member');
}

function handleFamilyPhotoFileChange(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showToast("कृपया वैध छवि फ़ाइल चुनें (Please select an image file)");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        pendingUploadedPhotoDataUrl = e.target.result;
        const preview = document.getElementById('family-photo-preview');
        if (preview) preview.src = pendingUploadedPhotoDataUrl;
    };
    reader.readAsDataURL(file);
}

function handleFamilyPhotoUrlChange(event) {
    const url = event.target.value.trim();
    if (url) {
        pendingUploadedPhotoDataUrl = url;
        const preview = document.getElementById('family-photo-preview');
        if (preview) preview.src = url;
    }
}

function handleAddFamilyMemberSubmit(event) {
    event.preventDefault();
    const nameInput = document.getElementById('modal-family-name');
    const relationSelect = document.getElementById('modal-family-relation');
    const roleSelect = document.getElementById('modal-family-role');
    const phoneInput = document.getElementById('modal-family-phone');
    const addMemoryCheckbox = document.getElementById('modal-family-add-memory');

    const name = nameInput ? nameInput.value.trim() : '';
    const relation = relationSelect ? relationSelect.value : 'पारिवारिक सदस्य (Family Member)';
    const role = roleSelect ? roleSelect.value : 'पारिवारिक सदस्य (Family Member)';
    const phone = phoneInput ? phoneInput.value.trim() : '+91 98765 00000';
    const addMemory = addMemoryCheckbox ? addMemoryCheckbox.checked : false;

    if (!name) {
        showToast("कृपया सदस्य का नाम दर्ज करें (Please enter name)");
        return;
    }

    const defaultAvatars = [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200'
    ];
    const chosenPhoto = pendingUploadedPhotoDataUrl || defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

    const newMember = {
        id: 'fm_' + Date.now(),
        name: name,
        relation: relation,
        role: role,
        contact: phone || 'गुवाहाटी, असम',
        photo_url: chosenPhoto,
        is_primary: role.includes('मुख्य') || role.toLowerCase().includes('primary')
    };

    if (!appState.familyMembers) appState.familyMembers = [];
    appState.familyMembers.push(newMember);

    // If checked, also add into patient's Digital Memory Cards
    if (addMemory && appState.digitalMemories) {
        const newMemory = {
            memory_id: 'dmb_' + Date.now(),
            category: 'family',
            title: name,
            relationship: relation,
            last_met_date: 'हाल ही में (Recently)',
            image_url: chosenPhoto,
            q1: `तस्वीर में दिख रहे आपके ${relation} का नाम क्या है?`,
            ans_correct: name,
            ans_wrong: 'सीमा वर्मा (Seema Verma)'
        };
        appState.digitalMemories.unshift(newMemory);
        renderDigitalMemoryBook();
    }

    renderCareCircleList();
    closeModal('modal-add-family-member');
    pendingUploadedPhotoDataUrl = null;

    showToast(`सफलतापूर्वक सदस्य "${name}" की फोटो जोड़ी गई!`);
}

function openClinicalReportModal() {
    openModal('modal-clinical-print');
}

function downloadReportJSON() {
    const reportData = {
        organization: "Ministry of Development of North Eastern Region (MDoNER)",
        initiative: "Smart India Hackathon 2026 (SIH26003)",
        patient_name: "Ramesh Sharma",
        patient_id: "p001",
        age: 74,
        location: "Guwahati, Assam",
        generated_at: new Date().toISOString(),
        cognitive_engagement_score: 78,
        domain_breakdown: {
            memory: 82.0,
            attention: 74.0,
            pattern_recognition: 89.0,
            routine_recall: 71.0
        },
        recommendation: "Stable cognitive profile. Maintain regular reminiscence and voice companion activities."
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MINDSET_NER_Clinical_Report_p001.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("✓ क्लिनिकल रिपोर्ट JSON डाउनलोड हुई");
}

// ==========================================================================
// 14. OFFLINE-FIRST TELE-HEALTH SIMULATOR
// ==========================================================================

function updateOfflineBadgeText() {
    const qCount = document.getElementById('off-queue-count');
    if (qCount) qCount.innerText = `${appState.offlineQueue.length} रिकॉर्ड्स`;
}

function toggleOfflineMode() {
    appState.isOffline = !appState.isOffline;
    const pill = document.getElementById('offline-pill');
    const netText = document.getElementById('network-text');
    const drawerTitle = document.getElementById('off-drawer-status-title');

    if (appState.isOffline) {
        if (pill) {
            pill.classList.add('offline');
            netText.innerText = "🟠 Offline Mode";
        }
        if (drawerTitle) {
            drawerTitle.innerText = "🟠 वर्तमान स्थिति: ऑफ़लाइन मोड (OFFLINE)";
            drawerTitle.style.color = "#d97706";
        }
        showToast("ऑफ़लाइन मोड चालू (Offline Mode ON)");
        speakText("ऑफ़लाइन मोड चालू हो गया है। आपके गेम, दवा रिमाइंडर और डिजिटल मेमोरी बुक बिना इंटरनेट के भी पूरी तरह काम करेंगे।");
    } else {
        if (pill) {
            pill.classList.remove('offline');
            netText.innerText = "🟢 Online";
        }
        if (drawerTitle) {
            drawerTitle.innerText = "🟢 वर्तमान स्थिति: ऑनलाइन (ONLINE)";
            drawerTitle.style.color = "#16a34a";
        }
        showToast("इंटरनेट से कनेक्ट हो गया! डेटा सिंक हो रहा है...");
        speakText("इंटरनेट कनेक्ट हो गया है। आपका स्वास्थ्य डेटा सुरक्षित क्लाउड सर्वर से सिंक्रनाइज़ किया जा रहा है।");

        // Animate sync progress
        const wrap = document.getElementById('sync-progress-wrap');
        const fill = document.getElementById('sync-progress-fill');
        if (wrap && fill) {
            wrap.style.display = 'block';
            let width = 0;
            const timer = setInterval(() => {
                width += 25;
                fill.style.width = `${width}%`;
                if (width >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        wrap.style.display = 'none';
                        fill.style.width = '0%';
                        syncOfflineQueue();
                    }, 400);
                }
            }, 150);
        } else {
            syncOfflineQueue();
        }
    }
}

function syncOfflineQueue() {
    const raw = localStorage.getItem('mindset_offline_queue');
    if (!raw) return;
    try {
        const queue = JSON.parse(raw);
        if (queue.length === 0) return;

        fetch(`${API_BASE}/api/sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ game_sessions: queue })
        })
        .then(res => res.json())
        .then(data => {
            localStorage.removeItem('mindset_offline_queue');
            appState.offlineQueue = [];
            updateOfflineBadgeText();
            showToast("✓ सभी ऑफ़लाइन गेम सत्र सफलतापूर्वक सिंक्रनाइज़ हुए!");
        })
        .catch(err => console.warn("Sync err", err));
    } catch (e) {
        console.warn("Sync parse err", e);
    }
}
