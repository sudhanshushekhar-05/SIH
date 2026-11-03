/**
 * MINDSET-NER — Multilingual Localization Engine (7 Languages)
 * SIH26003 | Smart India Hackathon 2026 | MDoNER & MoHFW
 * Supported: Hindi (hi), English (en), Assamese (as), Bengali (bn),
 *            Meitei/Manipuri (mni), Mizo (mzo), Khasi (kha)
 */

window.PORTAL_TRANSLATIONS = {
    // --------------------------------------------------------------------------
    // 1. HINDI (हिन्दी)
    // --------------------------------------------------------------------------
    'hi': {
        toast: "भाषा बदली गई: हिन्दी (Hindi)",
        topHelpline: "हेल्पलाइन: 14567 | Tele-MANAS: 14416",
        contrast: "हाई कंट्रास्ट (Contrast)",
        nerBadge: "🌸 NER सामग्री: ON",
        nav: {
            elderly: "👴 वयोवृद्ध पोर्टल (Elderly App)",
            caregiver: "👩‍⚕️ देखभालकर्ता डैशबोर्ड (Caregiver)",
            doctor: "🧑‍⚕️ चिकित्सक पोर्टल (Doctor & Clinic)",
            schemes: "🏛️ सरकारी योजनाएं (Govt Schemes)"
        },
        bulletin: {
            label: "सूचना / Bulletin",
            text: "📢 <strong>MDoNER & MoHFW पहल:</strong> पूर्वोत्तर भारत के 8 राज्यों (असम, अरुणाचल, मणिपुर, मेघालय, मिजोरम, नागालैंड, सिक्किम, त्रिपुरा) के दूरदराज क्षेत्रों में बुजुर्गों के लिए 100% ऑफ़लाइन-सक्षम AI डिमेंशिया सहायता एवं संज्ञानात्मक गेमिंग मंच चालू।"
        },
        journey: {
            title: "आपकी संज्ञानात्मक यात्रा (Cognitive Journey)",
            streak: "7 दिन सक्रिय स्ट्रीक",
            nodes: ["आरंभ (Start)", "स्मृति संवर्धन (Memory)", "एकाग्रता (Focus)", "यादें (Moments)", "विजेता (Champion)"]
        },
        asha: {
            title: "AI साथी आशा (Asha Companion)",
            subtext: "बहुभाषी वॉयस सहायता (Hindi, English, Regional)",
            greeting: "नमस्ते रमेश जी! मैं आपकी स्वास्थ्य साथी आशा हूँ। आप मुझसे अपनी दवाई, पानी, परिवार की यादें या पसंदीदा खेल के बारे में पूछ सकते हैं।",
            mic: "आशा से बात करें (Talk to Asha)",
            listenAgain: "फिर से सुनें (Listen Again)",
            quickTitle: "त्वरित प्रश्न (Quick Questions):",
            prompts: [
                "मेरी दवाई का समय क्या है?",
                "मेरी बेटी का नाम क्या है?",
                "आज की मेरी दिनचर्या क्या है?",
                "मुझे पानी कब पीना है?"
            ]
        },
        subtabs: {
            games: "संज्ञानात्मक खेल (Games)",
            dmb: "डिजिटल मेमोरी बुक",
            music: "संगीत से यादें (Music)",
            family: "परिवार कनेक्ट (Family)",
            mood: "दैनिक मिजाज (Mood)",
            reminders: "रिमाइंडर (Reminders)"
        },
        games: {
            diffBadge: "<i class='fa-solid fa-robot'></i> AI स्तर: मध्यम (Adaptive Level: Medium)",
            scoreBadge: "<i class='fa-solid fa-award'></i> आज का स्कोर: ",
            arenaBack: "खेलों की सूची (Back to Menu)",
            arenaRound: "राउंड",
            aiHeader: "AI अनुकूलन निर्णय इंजन (AI Adaptive Decision Engine)",
            lblAcc: "सटीकता (Accuracy):",
            lblSpeed: "प्रतिक्रिया समय (Latency):",
            lblNext: "अगला स्तर (Next Level):",
            aiReason: "🤖 AI विश्लेषण: उत्कृष्ट प्रदर्शन! मरीज का संज्ञानात्मक रिस्पॉन्स बहुत सक्रिय है।",
            btnNextRound: "अगला प्रश्न (Next Question)",
            marketPrompt: "🧺 हाट-बाज़ार की इन 5 वस्तुओं को ध्यान से याद रखें:",
            marketHidePrompt: "⏱️ 10 सेकंड में ये वस्तुएं बाज़ार की टोकरी में छिप जाएंगी...",
            marketReadyBtn: "मुझे याद हो गया, प्रश्न दिखाएं (I'm Ready)",
            marketQuestion: "बाज़ार की टोकरी में इनमें से कौन सी वस्तु रखी गई थी?",
            celebTitle: "शानदार प्रदर्शन, रमेश जी!",
            celebSub: "आपने आज का संज्ञानात्मक सत्र सफलतापूर्वक पूरा कर लिया है।",
            celebScore: "आज का कुल स्कोर (Session Score):",
            celebStreak: "✓ 7-Day Active Streak सुरक्षित!",
            celebAgain: "फिर से खेलें (Play Again)",
            celebOther: "अन्य खेल चुनें (Other Games)",
            cards: [
                { type: "market", ribbon: "⭐ NER विशेष", title: "1. विलेज मार्केट चैलेंज (Village Market)", desc: "उत्तर-पूर्वी हाट-बाज़ार की 5 वस्तुओं को 10 सेकंड देखकर याद रखें।", btn: "खेलें (Play Challenge)" },
                { type: "local_ner", ribbon: "⭐ सांस्कृतिक धरोहर", title: "2. पूर्वोत्तर सांस्कृतिक धरोहर (NER Heritage)", desc: "कामाख्या, लोकतक झील, चेरापूंजी व पारंपरिक प्रतीकों को पहचानें।", btn: "खेलें (Explore NER)" },
                { type: "family", title: "3. पारिवारिक पहचान (Family Memory)", desc: "पारिवारिक तस्वीरें और रिश्तों को सही नाम से पहचानें।", btn: "खेलें (Play Memory)" },
                { type: "routine", title: "4. दिनचर्या क्रम (Daily Routine Recall)", desc: "दैनिक जीवन की आदतों (जागना, ब्रुश, नाश्ता, दवाई) को सही क्रम में लगाएं।", btn: "खेलें (Sequence Routine)" },
                { type: "pattern", title: "5. पैटर्न पहचान (Pattern Recognition)", desc: "तार्किक क्रम और रंगों की श्रृंखला को पूरा करें।", btn: "खेलें (Solve Pattern)" }
            ]
        },
        dmb: {
            title: "डिजिटल मेमोरी बुक (Digital Memory Book)",
            subtitle: "पारिवारिक तस्वीरें, प्रिय स्थान और मधुर स्मृतियों का व्यक्तिगत संग्रह",
            addBtn: "नई याद जोड़ें (Add Card)",
            prevBtn: "पिछली याद (Previous)",
            nextBtn: "अगली याद (Next)",
            browseTitle: "सभी व्यक्तिगत स्मृति कार्ड (Browse Memory Cards):",
            promptHeading: "AI स्मृति संवर्धन अभ्यास (Memory Prompt):",
            correctFeedback: "✓ सही स्मृति पहचान!",
            wrongFeedback: "स्मृति नोट रिकॉर्ड किया गया"
        },
        music: {
            title: "संगीत से यादें (Memory Through Music)",
            subtitle: "पूर्वोत्तर के पारंपरिक व लोक संगीत द्वारा पुरानी सुखद स्मृतियों का जागरण",
            tracks: ["1. बिहू बांसुरी (Bihu Flute)", "2. शास्त्रीय राग (Classical Raga)", "3. मणिपुरी पेना (Manipuri Pena)"],
            yesBtn: "😊 हां, याद है! (Yes, I Remember)",
            againBtn: "🔁 फिर से सुनें (Play Again)"
        },
        family: {
            title: "परिवार कनेक्ट (Family Connect Feed)",
            subtitle: "आपके बच्चों, पोते-पोतियों और परिजनों द्वारा भेजे गए प्यार भरे संदेश",
            replyBtn: "वॉयस उत्तर भेजें (Voice Reply to"
        },
        mood: {
            title: "आज आप कैसा महसूस कर रहे हैं? (Daily Mood Check-In)",
            subtitle: "अपनी भावनाएं साझा करें ताकि परिवार और डॉक्टर आपकी स्थिति का ध्यान रख सकें",
            lblGood: "अच्छा / खुश (Good)",
            lblOkay: "सामान्य (Okay)",
            lblSad: "उदास (Sad)",
            lblRestless: "बेचैन (Restless)",
            lblTired: "थकान (Tired)",
            fbHead: "मिजाज दर्ज कर लिया गया!",
            fbText: "धन्यवाद रमेश जी! आपका स्वास्थ्य हमारे लिए सर्वोपरि है।"
        },
        reminders: {
            title: "आज के स्वास्थ्य व दिनचर्या रिमाइंडर (Today's Reminders)",
            subtitle: "समय पर दवा, जलपान और दिनचर्या गतिविधियों की सरकारी डिजिटल चेकलिस्ट",
            addBtn: "नया रिमाइंडर जोड़ें (Add Reminder)",
            doneBtn: "पूर्ण (Done)",
            markBtn: "पूर्ण मार्क करें",
            statusCompleted: "✓ पूर्ण",
            statusPending: "लंबित (Pending)",
            items: [
                { title: "सुबह की बीपी व मेमोरी सप्लीमेंट गोली", time: "09:00 पूर्वाह्न" },
                { title: "1 गिलास ताज़ा गुनगुना पानी पिएं", time: "11:00 पूर्वाह्न" },
                { title: "दोपहर की दवा (गोली B)", time: "02:00 अपराह्न" },
                { title: "शाम की हल्की सैर व विलेज मार्केट खेल", time: "05:00 अपराह्न" }
            ]
        },
        caregiver: {
            patTitle: "मरीज: रमेश शर्मा (Ramesh Sharma, Age: 74)",
            patSubtext: "मुख्य देखभालकर्ता: अनन्या शर्मा (पुत्री) | मरीज आईडी: #p001 | गुवाहाटी, असम",
            scoreLbl: "संज्ञानात्मक सहभागिता स्कोर",
            scoreSub: "दैनिक गैर-नैदानिक रुझान विश्लेषण (AI Trend)",
            briefTitle: "सुप्रभात, अनन्या जी (Good Morning Briefing)",
            briefSub: "रमेश जी — आज का AI स्वास्थ्य व संज्ञानात्मक सारांश",
            statChips: {
                eng: "संज्ञानात्मक स्कोर",
                games: "खेल सत्र पूर्ण",
                med: "दवाई स्थिति",
                water: "जलपान सेवन",
                mood: "दैनिक मिजाज"
            },
            alertPrefix: "AI अलर्ट:",
            alertMsg: "ध्यान व एकाग्रता का स्तर पिछले 7 दिनों के औसत से थोड़ा कम रहा।",
            recPrefix: "AI सिफ़ारिश (Recommendation):",
            recText: "आज रमेश जी के साथ 10 मिनट डिजिटल मेमोरी बुक या 'संगीत से यादें' सत्र साझा करें।",
            domainTitle: "संज्ञानात्मक क्षेत्र मेट्रिक्स (Domain Metrics)",
            domains: {
                memory: "स्मृति रिकॉल (Memory)",
                attention: "एकाग्रता (Attention)",
                pattern: "पैटर्न पहचान (Patterns)",
                routine: "दिनचर्या रिकॉल (Routine)"
            },
            trendTitle: "14-दिवसीय संज्ञानात्मक सहभागिता रुझान",
            trendDay1: "दिन 1",
            trendDay7: "दिन 7",
            trendToday: "आज (दिन 14)",
            trendNote: "सतत निगरानी: MDoNER AI Trend Analyzer Protocol",
            circleTitle: "केयर सर्किल अधिकृत सदस्य (Care Circle)",
            postTitle: "मरीज को पारिवारिक संदेश भेजें",
            lblMsg: "संदेश (Message for Ramesh Ji)",
            lblPhoto: "फोटो यूआरएल (वैकल्पिक)",
            btnPost: "संदेश भेजें (Post to Patient Feed)"
        },
        doctor: {
            title: "क्लिनिकल अनुदैर्ध्य रिपोर्ट (Longitudinal Clinical Report) — मरीज #p001",
            subtitle: "अटेंडिंग न्यूरोलॉजिस्ट: डॉ. फूकन (Dr. Phukan) | MDoNER टेली-हेल्थ प्रोटोकॉल",
            exportBtn: "आधिकारिक रिपोर्ट प्रिंट / डाउनलोड (Official PDF)",
            stats: {
                sessions: "कुल खेले गए सत्र (Total Sessions)",
                accuracy: "औसत सटीकता (Mean Accuracy)",
                latency: "औसत प्रतिक्रिया समय (Mean Latency)",
                diff: "वर्तमान AI कठिनाई स्तर"
            },
            headers: {
                time: "समय (Timestamp)",
                module: "गेम मॉड्यूल (Game Module)",
                acc: "सटीकता (Accuracy)",
                lat: "लेटेंसी (Latency)",
                diff: "कठिनाई (Difficulty)",
                outcome: "AI अनुकूलन परिणाम (Adaptive Outcome)"
            }
        },
        schemes: {
            title: "सरकारी योजनाएं एवं वरिष्ठ नागरिक कल्याण संसाधन",
            subtitle: "स्वास्थ्य एवं परिवार कल्याण मंत्रालय व MDoNER द्वारा समर्थित राष्ट्रीय नीतियां",
            cards: [
                {
                    title: "राष्ट्रीय टेली-मानसिक स्वास्थ्य कार्यक्रम (Tele-MANAS)",
                    desc: "मानसिक स्वास्थ्य सेवाओं को दूरदराज के क्षेत्रों तक मुफ्त में उपलब्ध कराने के लिए 24x7 निःशुल्क हेल्पलाइन (14416) और डिजिटल टेली-परामर्श।",
                    meta: "हेल्पलाइन: 14416 / 1800-891-4416 | MoHFW"
                },
                {
                    title: "वरिष्ठ नागरिक राष्ट्रीय हेल्पलाइन (Elder Line 14567)",
                    desc: "सामाजिक न्याय एवं अधिकारिता मंत्रालय द्वारा संचालित राष्ट्रीय हेल्पलाइन जो वरिष्ठ नागरिकों को कानूनी, स्वास्थ्य और भावनात्मक सहायता प्रदान करती है।",
                    meta: "टोल-फ्री: 14567 | MoSJE, भारत सरकार"
                },
                {
                    title: "MDoNER पूर्वोत्तर टेली-हेल्थ पहल",
                    desc: "पूर्वोत्तर के आठ राज्यों के पहाड़ी और दुर्गम क्षेत्रों में सामुदायिक स्वास्थ्य कार्यकर्ताओं (ASHA) के जरिए ऑफ़लाइन-फर्स्ट स्वास्थ्य निगरानी।",
                    meta: "MDoNER | पूर्वोत्तर क्षेत्र विकास मंत्रालय"
                },
                {
                    title: "आयुष्मान भारत — वरिष्ठ नागरिक स्वास्थ्य सुरक्षा (PM-JAY)",
                    desc: "70 वर्ष और उससे अधिक आयु के सभी वरिष्ठ नागरिकों के लिए 5 लाख रुपये तक का निःशुल्क स्वास्थ्य बीमा सुरक्षा कवर।",
                    meta: "राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA)"
                }
            ]
        },
        footer: {
            brandTitle: "MINDSET-NER पोर्टल",
            aboutText: "स्मार्ट इंडिया हैकाथॉन (SIH 2026) के अंतर्गत पूर्वोत्तर क्षेत्र विकास मंत्रालय (MDoNER) एवं स्वास्थ्य व परिवार कल्याण मंत्रालय (MoHFW) के लिए विकसित AI-संचालित डिमेंशिया संज्ञानात्मक देखभाल मंच।",
            sihNote: "समस्या विवरण आईडी: <strong>SIH26003</strong> | MDoNER",
            qlTitle: "त्वरित लिंक (Quick Links)",
            links: ["वयोवृद्ध सहायता ऐप", "देखभालकर्ता डैशबोर्ड", "चिकित्सक पोर्टल", "सरकारी योजनाएं"],
            polTitle: "सहायता व नीतियां",
            policies: ["गोपनीयता नीति (Privacy)", "वेबसाइट नीतियां (GIGW)", "पहुंचयोग्यता (Accessibility)", "प्रतिक्रिया (Feedback)"],
            helpTitle: "आपातकालीन हेल्पलाइन",
            helplines: [
                "📞 वरिष्ठ नागरिक हेल्पलाइन: <span style='color: var(--gov-saffron);'>14567</span>",
                "🧠 Tele-MANAS (मानसिक स्वास्थ्य): <span style='color: var(--gov-saffron);'>14416</span>",
                "🚨 राष्ट्रीय आपात सेवा: <span style='color: var(--gov-saffron);'>112</span>"
            ],
            copyText: "© 2026 MINDSET-NER Portal | भारत सरकार के दिशानिर्देशों के अनुरूप राष्ट्रीय स्वास्थ्य मिशन (NHM) एवं MDoNER हेतु विकसित।",
            updateText: "अंतिम अद्यतन: <strong>24 अक्टूबर 2026</strong> | संस्करण: <strong>v2.6 (Govt Edition)</strong>"
        }
    },

    // --------------------------------------------------------------------------
    // 2. ENGLISH (English)
    // --------------------------------------------------------------------------
    'en': {
        toast: "Language Switched: English",
        topHelpline: "Helpline: 14567 | Tele-MANAS: 14416",
        contrast: "High Contrast",
        nerBadge: "🌸 NER Content: ON",
        nav: {
            elderly: "👴 Elderly App",
            caregiver: "👩‍⚕️ Caregiver Dashboard",
            doctor: "🧑‍⚕️ Doctor & Clinic",
            schemes: "🏛️ Government Schemes"
        },
        bulletin: {
            label: "Notice / Bulletin",
            text: "📢 <strong>MDoNER & MoHFW Initiative:</strong> 100% offline-first AI dementia care & cognitive gaming platform operational across 8 North Eastern states (Assam, Arunachal, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura)."
        },
        journey: {
            title: "Your Cognitive Memory Journey",
            streak: "7 Day Active Streak",
            nodes: ["Start", "Memory Builder", "Focus Master", "Memory Moments", "Cognitive Champion"]
        },
        asha: {
            title: "AI Companion Asha",
            subtext: "Multilingual Senior Voice Assistant",
            greeting: "Hello Ramesh ji! I am Asha, your health companion. You can ask me about your medicine, water schedule, family memories, or games.",
            mic: "Talk to Asha",
            listenAgain: "Listen Again",
            quickTitle: "Quick Questions:",
            prompts: [
                "When is my medicine?",
                "What is my daughter's name?",
                "What is my routine today?",
                "When should I drink water?"
            ]
        },
        subtabs: {
            games: "Cognitive Games",
            dmb: "Digital Memory Book",
            music: "Memory Through Music",
            family: "Family Connect",
            mood: "Daily Mood",
            reminders: "Reminders"
        },
        games: {
            diffBadge: "<i class='fa-solid fa-robot'></i> AI Level: Medium (Adaptive)",
            scoreBadge: "<i class='fa-solid fa-award'></i> Today's Score: ",
            arenaBack: "Back to Games Menu",
            arenaRound: "Round",
            aiHeader: "AI Adaptive Decision Engine",
            lblAcc: "Accuracy:",
            lblSpeed: "Latency:",
            lblNext: "Next Level:",
            aiReason: "🤖 AI Assessment: Excellent response speed and cognitive accuracy!",
            btnNextRound: "Next Question",
            marketPrompt: "🧺 Memorize these 5 market goods carefully:",
            marketHidePrompt: "⏱️ Items will hide in the market basket in 10 seconds...",
            marketReadyBtn: "I'm Ready, Start Question",
            marketQuestion: "Which item was placed in the village market basket?",
            celebTitle: "Splendid Effort, Ramesh Ji!",
            celebSub: "You have successfully completed today's cognitive session.",
            celebScore: "Today's Session Score:",
            celebStreak: "✓ 7-Day Active Streak Preserved!",
            celebAgain: "Play Again",
            celebOther: "Other Games",
            cards: [
                { type: "market", ribbon: "⭐ NER Special", title: "1. Village Market Challenge", desc: "Memorize 5 North Eastern market goods in 10 seconds and recall them.", btn: "Play Challenge" },
                { type: "local_ner", ribbon: "⭐ NER Heritage", title: "2. NER Cultural Heritage", desc: "Recognize Kamakhya, Loktak Lake, Cherrapunji, and cultural symbols.", btn: "Explore NER" },
                { type: "family", title: "3. Family Memory Recognition", desc: "Identify family photographs, relationships, and treasured memories.", btn: "Play Memory" },
                { type: "routine", title: "4. Daily Routine Recall", desc: "Arrange everyday morning and afternoon routine habits in chronological order.", btn: "Sequence Routine" },
                { type: "pattern", title: "5. Pattern Recognition", desc: "Complete sequence puzzles, logical color orders, and shape patterns.", btn: "Solve Pattern" }
            ]
        },
        dmb: {
            title: "Digital Memory Book",
            subtitle: "Personalized collection of family pictures, beloved places, and joyful memories",
            addBtn: "Add Memory Card",
            prevBtn: "Previous Card",
            nextBtn: "Next Card",
            browseTitle: "Browse All Memory Cards:",
            promptHeading: "AI Memory Stimulation Exercise:",
            correctFeedback: "✓ Correct Memory Recall!",
            wrongFeedback: "Memory note recorded"
        },
        music: {
            title: "Memory Through Music",
            subtitle: "Awakening nostalgic positive emotions through authentic North Eastern folk music",
            tracks: ["1. Bihu Flute (Assam)", "2. Classical Raga Flute", "3. Manipuri Pena Melody"],
            yesBtn: "😊 Yes, I Remember!",
            againBtn: "🔁 Play Again"
        },
        family: {
            title: "Family Connect Feed",
            subtitle: "Loving messages and photos from your children, grandchildren, and relatives",
            replyBtn: "Send Voice Note to"
        },
        mood: {
            title: "How are you feeling today? (Daily Mood Check-In)",
            subtitle: "Share your emotions so family and doctors can stay informed about your well-being",
            lblGood: "Good / Happy",
            lblOkay: "Normal / Okay",
            lblSad: "Sad / Low",
            lblRestless: "Restless",
            lblTired: "Tired / Sleepy",
            fbHead: "Mood Logged Successfully!",
            fbText: "Thank you Ramesh ji! Your health and peace of mind are our top priority."
        },
        reminders: {
            title: "Today's Health & Routine Reminders",
            subtitle: "Official digital schedule for timely medication, hydration, and daily activities",
            addBtn: "Add Health Reminder",
            doneBtn: "Done",
            markBtn: "Mark as Done",
            statusCompleted: "✓ Completed",
            statusPending: "Pending",
            items: [
                { title: "Morning BP & Memory Supplement Pill", time: "09:00 AM" },
                { title: "Drink 1 glass of fresh lukewarm water", time: "11:00 AM" },
                { title: "Afternoon Medication (Pill B)", time: "02:00 PM" },
                { title: "Evening light walk & Village Market game", time: "05:00 PM" }
            ]
        },
        caregiver: {
            patTitle: "Patient: Ramesh Sharma (Age: 74)",
            patSubtext: "Primary Caregiver: Ananya Sharma (Daughter) | Patient ID: #p001 | Guwahati, Assam",
            scoreLbl: "Cognitive Engagement Score",
            scoreSub: "Daily Non-Clinical AI Longitudinal Trend Analysis",
            briefTitle: "Good Morning, Ananya",
            briefSub: "Ramesh Ji — Daily AI Cognitive & Health Briefing",
            statChips: {
                eng: "Cognitive Score",
                games: "Games Done",
                med: "Medication Status",
                water: "Water Intake",
                mood: "Daily Mood"
            },
            alertPrefix: "AI Alert:",
            alertMsg: "Attention & focus metrics slightly below the 7-day baseline average.",
            recPrefix: "AI Recommendation:",
            recText: "Engage in a 10-minute Digital Memory Book or 'Memory Through Music' session with Ramesh ji today.",
            domainTitle: "Cognitive Domain Metrics",
            domains: {
                memory: "Memory Recall",
                attention: "Attention & Focus",
                pattern: "Pattern Recognition",
                routine: "Routine Recall"
            },
            trendTitle: "14-Day Cognitive Engagement Trend",
            trendDay1: "Day 1",
            trendDay7: "Day 7",
            trendToday: "Today (Day 14)",
            trendNote: "Continuous Tele-Health Monitoring: MDoNER AI Trend Analyzer Protocol",
            circleTitle: "Care Circle Authorized Members",
            postTitle: "Send Message to Patient",
            lblMsg: "Message for Ramesh Ji",
            lblPhoto: "Photo URL (Optional)",
            btnPost: "Post to Patient Feed"
        },
        doctor: {
            title: "Longitudinal Clinical Report — Patient #p001",
            subtitle: "Attending Neurologist: Dr. Phukan | MDoNER Tele-Health Protocol",
            exportBtn: "Official Clinical Report Print / PDF",
            stats: {
                sessions: "Total Game Sessions",
                accuracy: "Mean Accuracy",
                latency: "Mean Latency",
                diff: "Current AI Difficulty Level"
            },
            headers: {
                time: "Timestamp",
                module: "Game Module",
                acc: "Accuracy",
                lat: "Latency",
                diff: "Difficulty",
                outcome: "Adaptive Outcome"
            }
        },
        schemes: {
            title: "Government Schemes & Senior Citizen Welfare Resources",
            subtitle: "National policies supported by Ministry of Health & Family Welfare and MDoNER",
            cards: [
                {
                    title: "National Tele-Mental Health Programme (Tele-MANAS)",
                    desc: "24x7 toll-free helpline (14416) providing comprehensive mental healthcare services to remote communities.",
                    meta: "Toll-Free: 14416 / 1800-891-4416 | MoHFW"
                },
                {
                    title: "Elder Line: National Helpline for Senior Citizens (14567)",
                    desc: "National toll-free service by Ministry of Social Justice offering counseling, healthcare guidance, and emotional support.",
                    meta: "Toll-Free: 14567 | MoSJE, Govt of India"
                },
                {
                    title: "MDoNER North Eastern Tele-Health Initiative",
                    desc: "Offline-first tele-health and cognitive care monitoring deployed through grassroots ASHA workers across the 8 NER states.",
                    meta: "MDoNER | Ministry of Development of North Eastern Region"
                },
                {
                    title: "Ayushman Bharat PM-JAY Senior Citizen Health Cover",
                    desc: "Universal cashless health insurance coverage up to ₹5 Lakh annually for all senior citizens aged 70 and above.",
                    meta: "National Health Authority (NHA)"
                }
            ]
        },
        footer: {
            brandTitle: "MINDSET-NER Portal",
            aboutText: "AI-Powered Cognitive Care & Memory Assistance Platform developed under Smart India Hackathon (SIH 2026) for MDoNER & MoHFW.",
            sihNote: "Problem Statement ID: <strong>SIH26003</strong> | MDoNER",
            qlTitle: "Quick Links",
            links: ["Elderly Assistance App", "Caregiver Dashboard", "Doctor & Clinical Portal", "Government Schemes"],
            polTitle: "Support & Policies",
            policies: ["Privacy Policy", "Website Policies (GIGW 3.0)", "Accessibility Statement", "Feedback & Grievance"],
            helpTitle: "Emergency Helplines",
            helplines: [
                "📞 Senior Citizen Helpline: <span style='color: var(--gov-saffron);'>14567</span>",
                "🧠 Tele-MANAS (Mental Health): <span style='color: var(--gov-saffron);'>14416</span>",
                "🚨 National Emergency: <span style='color: var(--gov-saffron);'>112</span>"
            ],
            copyText: "© 2026 MINDSET-NER Portal | Developed under Government of India guidelines for National Health Mission & MDoNER.",
            updateText: "Last Updated: <strong>24 October 2026</strong> | Version: <strong>v2.6 (Govt Edition)</strong>"
        }
    },

    // --------------------------------------------------------------------------
    // 3. ASSAMESE (অসমীয়া)
    // --------------------------------------------------------------------------
    'as': {
        toast: "ভাষা সলনি কৰা হ'ল: অসমীয়া (Assamese)",
        topHelpline: "হেল্পলাইন: 14567 | Tele-MANAS: 14416",
        contrast: "উচ্চ বৈসাদৃশ্য (Contrast)",
        nerBadge: "🌸 NER সমল: ON",
        nav: {
            elderly: "👴 জ্যেষ্ঠ নাগৰিক সেৱা (Elderly App)",
            caregiver: "👩‍⚕️ যত্নকাৰী ডেচব’ৰ্ড (Caregiver)",
            doctor: "🧑‍⚕️ চিকিৎসক প’ৰ্টেল (Doctor & Clinic)",
            schemes: "🏛️ চৰকাৰী আঁচনিসমূহ (Govt Schemes)"
        },
        bulletin: {
            label: "জাননী / Bulletin",
            text: "📢 <strong>MDoNER আৰু MoHFW ৰ উদ্যোগ:</strong> উত্তৰ-পূৰ্বাঞ্চলৰ ৮ খন ৰাজ্যত ডিমেনচিয়া আক্ৰান্ত জ্যেষ্ঠ নাগৰিকসকলৰ বাবে ১০০% অফলাইন-সক্ষম AI স্মৃতি সহায়ক সেৱা কাৰ্যক্ষম।"
        },
        journey: {
            title: "আপোনাৰ মানসিক স্বাস্থ্য যাত্ৰা",
            streak: "৭ দিনৰ সক্ৰিয় ধাৰাবাহিকতা",
            nodes: ["আৰম্ভণি", "স্মৃতি সংবৰ্ধন", "মনোযোগ বৃদ্ধি", "স্মৃতিৰ মুহূৰ্ত", "বিজয়ী"]
        },
        asha: {
            title: "AI সংগী আশা (Asha Companion)",
            subtext: "বহুভাষিক ভইচ সহায়িকা (Assamese, Hindi, English)",
            greeting: "নমস্কাৰ ৰমেশ ডাঙৰীয়া! মই আপোনাৰ স্বাস্থ্য সংগী আশা। আপুনি মোক ঔষধ, পানী খোৱাৰ সময়, বা পৰিয়ালৰ বিষয়ে সুধিব পাৰে।",
            mic: "আশাৰ সৈতে কথা পাতক",
            listenAgain: "পুনৰ শুনক",
            quickTitle: "দ্ৰুত প্ৰশ্নসমূহ:",
            prompts: [
                "মোৰ ঔষধৰ সময় কিমান?",
                "মোৰ ছোৱালীৰ নাম কি?",
                "আজিৰ মোৰ দিনচৰ্যা কি?",
                "মই পানী কেতিয়া খাব লাগে?"
            ]
        },
        subtabs: {
            games: "স্মৃতি খেলসমূহ",
            dmb: "ডিজিটেল স্মৃতি পুথি",
            music: "সংগীতৰ মাধ্যমেৰে স্মৃতি",
            family: "পৰিয়াল সংযোগ",
            mood: "দৈনিক মনৰ অৱস্থা",
            reminders: "সোঁৱৰণী (Reminders)"
        },
        games: {
            diffBadge: "<i class='fa-solid fa-robot'></i> AI স্তৰ: মধ্যম (Adaptive Level: Medium)",
            scoreBadge: "<i class='fa-solid fa-award'></i> আজিৰ স্কোৰ: ",
            arenaBack: "খেলৰ তালিকালৈ উভতি যাওক",
            arenaRound: "ৰাউণ্ড",
            aiHeader: "AI অভিযোজন সিদ্ধান্ত ইঞ্জিন",
            lblAcc: "সঠিকতা:",
            lblSpeed: "সময়:",
            lblNext: "পৰৱৰ্তী স্তৰ:",
            aiReason: "🤖 AI বিশ্লেষণ: অতি উত্তম প্ৰদৰ্শন! ৰোগীৰ সঁহাৰি অতি সক্ৰিয়।",
            btnNextRound: "পৰৱৰ্তী প্ৰশ্ন",
            marketPrompt: "🧺 বজাৰৰ এই ৫ বিধ সামগ্ৰী মনোযোগেৰে মনত ৰাখক:",
            marketHidePrompt: "⏱️ ১০ ছেকেণ্ডত এই সামগ্ৰীবোৰ পাত্ৰত লুকুৱাই দিয়া হ'ব...",
            marketReadyBtn: "মোৰ মনত থাকিল, প্ৰশ্ন দেখুৱাওক",
            marketQuestion: "বজাৰৰ পাত্ৰত এইবোৰৰ ভিতৰত কোনটো সামগ্ৰী আছিল?",
            celebTitle: "অতি সুন্দৰ প্ৰদৰ্শন, ৰমেশ ডাঙৰীয়া!",
            celebSub: "আপুনি আজিৰ স্মৃতি অনুশীলন সফলতাৰে সমাপ্ত কৰিছে।",
            celebScore: "আজিৰ মুঠ স্কোৰ:",
            celebStreak: "✓ ৭ দিনীয়া সক্ৰিয় ধাৰা সুৰক্ষিত!",
            celebAgain: "পুনৰ খেলক",
            celebOther: "অন্য খেল বাছক",
            cards: [
                { type: "market", ribbon: "⭐ NER বিশেষ", title: "১. গ্ৰাম্য বজাৰ খেল (Village Market)", desc: "উত্তৰ-পূৰ্বাঞ্চলৰ বজাৰৰ ৫ বিধ সামগ্ৰী ১০ ছেকেণ্ড মনত ৰাখক।", btn: "খেলক (Play)" },
                { type: "local_ner", ribbon: "⭐ ঐতিহ্য", title: "২. উত্তৰ-পূৰ্বাঞ্চলৰ সাংস্কৃতিক ঐতিহ্য", desc: "কামাখ্যা, লোকটক হ্ৰদ, চেৰাপুঞ্জী আৰু পৰম্পৰাগত প্ৰতীকসমূহ চিনাক্ত কৰক।", btn: "অন্বেষণ কৰক" },
                { type: "family", title: "৩. পৰিয়াল পৰিচিতি (Family Memory)", desc: "পৰিয়ালৰ ছবি আৰু আত্মীয়সকলক সঠিক নামেৰে চিনাক্ত কৰক।", btn: "খেলক (Play)" },
                { type: "routine", title: "৪. দিনচৰ্যা ক্ৰম (Daily Routine)", desc: "দৈনন্দিন অভ্যাসসমূহ সঠিক ক্ৰমত সজাওক।", btn: "ক্ৰম সজাওক" },
                { type: "pattern", title: "৫. আৰ্হি চিনাক্তকৰণ (Pattern Logic)", desc: "যৌক্তিক শৃংখলা আৰু ৰঙৰ ক্ৰম সম্পূৰ্ণ কৰক।", btn: "সমাধান কৰক" }
            ]
        },
        dmb: {
            title: "ডিজিটেল স্মৃতি পুথি (Digital Memory Book)",
            subtitle: "পৰিয়ালৰ আলোকচিত্ৰ আৰু মধুৰ স্মৃতিৰ এক ব্যক্তিগত সংগ্ৰহ",
            addBtn: "নতুন স্মৃতি যোগ কৰক",
            prevBtn: "পূৰ্বৰ স্মৃতি",
            nextBtn: "পৰৱৰ্তী স্মৃতি",
            browseTitle: "সকলো স্মৃতি কাৰ্ড চাওক:",
            promptHeading: "AI স্মৃতি সংবৰ্ধন অনুশীলন:",
            correctFeedback: "✓ সঠিক স্মৃতি চিনাক্তকৰণ!",
            wrongFeedback: "স্মৃতি টোকা সংৰক্ষণ কৰা হ'ল"
        },
        music: {
            title: "সংগীতৰ মাধ্যমেৰে স্মৃতি",
            subtitle: "উত্তৰ-পূৰ্বাঞ্চলৰ লোক সংগীতৰ দ্বাৰা পুৰণি স্মৃতি জাগ্ৰত কৰক",
            tracks: ["১. বিহু বাঁহীৰ সুৰ", "২. শাস্ত্ৰীয় বাঁহীৰ ৰাগ", "৩. মণিপুৰী পেনা সুৰ"],
            yesBtn: "😊 হয়, মনত আছে!",
            againBtn: "🔁 পুনৰ বজাওক"
        },
        family: {
            title: "পৰিয়াল সংযোগ (Family Connect Feed)",
            subtitle: "আপোনাৰ সন্তান আৰু নাতি-নাতিনীসকলৰ মৰমৰ বাৰ্তা",
            replyBtn: "ভইচ উত্তৰ পঠিয়াওক"
        },
        mood: {
            title: "আজি আপোনাৰ অনুভৱ কেনেকুৱা? (Daily Mood)",
            subtitle: "আপোনাৰ মনৰ অৱস্থা ভাগ-বতৰা কৰক যাতে পৰিয়ালে যত্ন ল'ব পাৰে",
            lblGood: "ভাল / সুখী",
            lblOkay: "সাধাৰণ",
            lblSad: "বিষণ্ণ",
            lblRestless: "অস্থিৰ",
            lblTired: "ভাগৰুৱা",
            fbHead: "মনৰ অৱস্থা নথিভুক্ত হ'ল!",
            fbText: "ধন্যবাদ ৰমেশ ডাঙৰীয়া! আপোনাৰ স্বাস্থ্য আমাৰ সৰ্বোচ্চ প্ৰাথমিকতা।"
        },
        reminders: {
            title: "আজিৰ স্বাস্থ্য আৰু দিনচৰ্যা সোঁৱৰণী",
            subtitle: "ঔষধ, পানী আৰু দিনচৰ্যাৰ চৰকাৰী ডিজিটেল তালিকা",
            addBtn: "নতুন সোঁৱৰণী যোগ কৰক",
            doneBtn: "সম্পূৰ্ণ",
            markBtn: "সম্পূৰ্ণ বুলি চিহ্নিত কৰক",
            statusCompleted: "✓ সম্পূৰ্ণ",
            statusPending: "বাকী আছে",
            items: [
                { title: "ৰাতিপুৱাৰ বিপি আৰু স্মৃতিশক্তিৰ ঔষধ", time: "০৯:০০ পুৱা" },
                { title: "১ গিলাচ সতেজ কুহুমীয়া পানী খাওক", time: "১১:০০ পুৱা" },
                { title: "দুপৰীয়াৰ ঔষধ (টেবলেট B)", time: "০২:০০ দুপৰীয়া" },
                { title: "গধূলিৰ খোজ কঢ়া আৰু বজাৰ খেল", time: "০৫:০০ আবেলি" }
            ]
        },
        caregiver: {
            patTitle: "ৰোগী: ৰমেশ শৰ্মা (বয়স: ৭৪)",
            patSubtext: "মুখ্য যত্নকাৰী: অনন্যা শৰ্মা (কন্যা) | ৰোগী আইডি: #p001 | গুৱাহাটী, অসম",
            scoreLbl: "জ্ঞানীয় সহভাগিতা স্কোৰ",
            scoreSub: "দৈনিক AI ধাৰাবাহিক বিশ্লেষণ",
            briefTitle: "শুভপ্ৰভাত, অনন্যা ডাঙৰীয়ানী",
            briefSub: "ৰমেশ ডাঙৰীয়া — আজিৰ AI স্বাস্থ্য আৰু স্মৃতি সাৰাংশ",
            statChips: {
                eng: "জ্ঞানীয় স্কোৰ",
                games: "খেল সম্পন্ন",
                med: "ঔষধৰ স্থিতি",
                water: "পানী গ্ৰহণ",
                mood: "দৈনিক মেজাজ"
            },
            alertPrefix: "AI সতৰ্কবাণী:",
            alertMsg: "মনোযোগৰ মাত্ৰা বিগত ৭ দিনৰ গড়তকৈ সামান্য কম হৈছে।",
            recPrefix: "AI পৰামৰ্শ:",
            recText: "আজি ৰমেশ ডাঙৰীয়াৰ সৈতে ১০ মিনিট ডিজিটেল স্মৃতি পুথি বা সংগীতৰ সময় কটাওক।",
            domainTitle: "জ্ঞানীয় ক্ষেত্ৰ মেট্ৰিক্স",
            domains: {
                memory: "স্মৃতি সোঁৱৰণ",
                attention: "মনোযোগ",
                pattern: "আৰ্হি চিনাক্তকৰণ",
                routine: "দিনচৰ্যা সোঁৱৰণ"
            },
            trendTitle: "১৪ দিনীয়া জ্ঞানীয় সহভাগিতা ধাৰা",
            trendDay1: "দিন ১",
            trendDay7: "দিন ৭",
            trendToday: "আজি (দিন ১৪)",
            trendNote: "নিৰন্তৰ নিৰীক্ষণ: MDoNER AI Trend Analyzer Protocol",
            circleTitle: "কেয়াৰ চাৰ্কেল কৰ্তৃত্বপ্ৰাপ্ত সদস্যসকল",
            postTitle: "ৰোগীলৈ বাৰ্তা পঠিয়াওক",
            lblMsg: "ৰমেশ ডাঙৰীয়ালৈ বাৰ্তা",
            lblPhoto: "ছবিৰ ইউআৰএল (ঐচ্ছিক)",
            btnPost: "বাৰ্তা প্ৰেৰণ কৰক"
        },
        doctor: {
            title: "ক্লিনিকেল অনুদৈৰ্ঘ্য প্ৰতিবেদন — ৰোগী #p001",
            subtitle: "উপস্থিত স্নায়ুৰোগ বিশেষজ্ঞ: ডাঃ ফুকন | MDoNER টেলি-হেল্থ প্ৰট'কল",
            exportBtn: "আधिकारिक প্ৰতিবেদন প্ৰিণ্ট / ডাউনলোড",
            stats: {
                sessions: "মুঠ খেলৰ অধিৱেশন",
                accuracy: "গড় সঠিকতা",
                latency: "গড় সঁহাৰি সময়",
                diff: "বৰ্তমান AI স্তৰ"
            },
            headers: {
                time: "সময়",
                module: "খেলৰ মডিউল",
                acc: "সঠিকতা",
                lat: "লেটেন্সি",
                diff: "কঠিনতা",
                outcome: "AI অভিযোজন ফলাফল"
            }
        },
        schemes: {
            title: "চৰকাৰী আঁচনি আৰু জ্যেষ্ঠ নাগৰিক কল্যাণ সম্পদ",
            subtitle: "স্বাস্থ্য আৰু পৰিয়াল কল্যাণ মন্ত্ৰালয় আৰু MDoNER দ্বাৰা সমৰ্থিত",
            cards: [
                {
                    title: "ৰাষ্ট্ৰীয় টেলি-মানসিক স্বাস্থ্য কাৰ্যসূচী (Tele-MANAS)",
                    desc: "দূৰৱৰ্তী অঞ্চলত বিনামূলীয়াকৈ মানসিক স্বাস্থ্য সেৱা প্ৰদানৰ বাবে ২৪x৭ হেল্পলাইন (১৪৪১৬)।",
                    meta: "টোল-ফ্ৰী: ১৪৪১৬ / ১৮০০-৮৯১-৪৪১৬ | MoHFW"
                },
                {
                    title: "জ্যেষ্ঠ নাগৰিক ৰাষ্ট্ৰীয় হেল্পলাইন (Elder Line 14567)",
                    desc: "সামাজিক ন্যায় আৰু সৱলীকৰণ মন্ত্ৰালয়ৰ দ্বাৰা পৰিচালিত আইনী আৰু স্বাস্থ্য সেৱা হেল্পলাইন।",
                    meta: "টোল-ফ্ৰী: ১৪৫৬৭ | ভাৰত চৰকাৰ"
                },
                {
                    title: "MDoNER উত্তৰ-পূৰ্বাঞ্চল টেলি-হেল্থ পদক্ষেপ",
                    desc: "উত্তৰ-পূৰ্বাঞ্চলৰ ৮ খন ৰাজ্যত আশা কৰ্মীসকলৰ জৰিয়তে অফলাইন-প্ৰথম স্বাস্থ্য নিৰীক্ষণ।",
                    meta: "MDoNER | উত্তৰ-পূৰ্বাঞ্চল উন্নয়ন মন্ত্ৰালয়"
                },
                {
                    title: "আয়ুষ্মান ভাৰত — জ্যেষ্ঠ নাগৰিক স্বাস্থ্য সুৰক্ষা (PM-JAY)",
                    desc: "৭০ বছৰ আৰু তাতকৈ অধিক বয়সৰ জ্যেষ্ঠ নাগৰিকৰ বাবে ৫ লাখ টকাৰ বিনামূলীয়া স্বাস্থ্য বীমা।",
                    meta: "ৰাষ্ট্ৰীয় স্বাস্থ্য প্ৰাধিকৰণ (NHA)"
                }
            ]
        },
        footer: {
            brandTitle: "MINDSET-NER প’ৰ্টেল",
            aboutText: "স্মাৰ্ট ইণ্ডিয়া হেকাথন (SIH 2026) ৰ অধীনত MDoNER আৰু MoHFW ৰ বাবে বিকশিত AI-চালিত ডিমেনচিয়া যত্ন মঞ্চ।",
            sihNote: "সমস্যা বিৱৰণ আইডি: <strong>SIH26003</strong> | MDoNER",
            qlTitle: "দ্ৰুত সংযোগসমূহ",
            links: ["জ্যেষ্ঠ নাগৰিক সাহায্য এপ", "যত্নকাৰী ডেচব’ৰ্ড", "চিকিৎসক প’ৰ্টেল", "চৰকাৰী আঁচনিসমূহ"],
            polTitle: "সহায় আৰু নীতি",
            policies: ["গোপনীয়তা নীতি", "ৱেবছাইট নীতি (GIGW)", "প্ৰৱেশাধিকাৰ", "প্ৰতিক্ৰিয়া"],
            helpTitle: "জৰুৰীকালীন হেল্পলাইন",
            helplines: [
                "📞 জ্যেষ্ঠ নাগৰিক হেল্পলাইন: <span style='color: var(--gov-saffron);'>14567</span>",
                "🧠 Tele-MANAS (মানসিক স্বাস্থ্য): <span style='color: var(--gov-saffron);'>14416</span>",
                "🚨 ৰাষ্ট্ৰীয় জৰুৰীকালীন সেৱা: <span style='color: var(--gov-saffron);'>112</span>"
            ],
            copyText: "© 2026 MINDSET-NER Portal | ভাৰত চৰকাৰৰ নিৰ্দেশনা অনুসৰি NHM আৰু MDoNER ৰ বাবে বিকশিত।",
            updateText: "অন্তিম নবীকৰণ: <strong>২৪ অক্টোবৰ ২০২৬</strong> | সংস্কৰণ: <strong>v2.6 (Govt Edition)</strong>"
        }
    },

    // --------------------------------------------------------------------------
    // 4. BENGALI (বাংলা)
    // --------------------------------------------------------------------------
    'bn': {
        toast: "ভাষা পরিবর্তিত হয়েছে: বাংলা (Bengali)",
        topHelpline: "হেল্পলাইন: 14567 | Tele-MANAS: 14416",
        contrast: "উচ্চ কনট্রাস্ট (Contrast)",
        nerBadge: "🌸 NER কনটেন্ট: ON",
        nav: {
            elderly: "👴 প্রবীণ পোর্টাল (Elderly App)",
            caregiver: "👩‍⚕️ পরিচর্যাকারী ড্যাশবোর্ড (Caregiver)",
            doctor: "🧑‍⚕️ চিকিৎসক পোর্টাল (Doctor & Clinic)",
            schemes: "🏛️ সরকারি প্রকল্পসমূহ (Govt Schemes)"
        },
        bulletin: {
            label: "বিজ্ঞপ্তি / Bulletin",
            text: "📢 <strong>MDoNER ও MoHFW উদ্যোগ:</strong> উত্তর-পূর্ব ভারতের ৮টি রাজ্যে ডিমেনশিয়া আক্রান্ত প্রবীণদের জন্য ১০০% অফলাইন-সক্ষম AI স্মৃতি সহায়ক প্ল্যাটফর্ম চালু।"
        },
        journey: {
            title: "আপনার জ্ঞানীয় স্মৃতি যাত্রা",
            streak: "৭ দিনের সক্রিয় ধারাবাহিকতা",
            nodes: ["শুরু", "স্মৃতি বিকাশ", "মনোযোগ বৃদ্ধি", "স্মৃতি মুহূর্ত", "বিজয়ী"]
        },
        asha: {
            title: "AI সঙ্গী আশা (Asha Companion)",
            subtext: "বহুভাষিক ভয়েস সহায়িকা (Bengali, Hindi, English)",
            greeting: "নমস্কার রমেশ বাবু! আমি আশা, আপনার স্বাস্থ্য সঙ্গী। আপনি আমাকে ওষুধ, জল খাবার সময় বা পরিবারের স্মৃতি নিয়ে জিজ্ঞাসা করতে পারেন।",
            mic: "আশার সাথে কথা বলুন",
            listenAgain: "আবার শুনুন",
            quickTitle: "দ্রুত প্রশ্নসমূহ:",
            prompts: [
                "আমার ওষুধের সময় কখন?",
                "আমার মেয়ের নাম কী?",
                "আজকের আমার রুটিন কী?",
                "আমাকে জল কখন খেতে হবে?"
            ]
        },
        subtabs: {
            games: "স্মৃতি খেলাসমূহ",
            dmb: "ডিজিটাল স্মৃতি বই",
            music: "সঙ্গীতের মাধ্যমে স্মৃতি",
            family: "পরিবার সংযোগ",
            mood: "দৈনিক মেজাজ",
            reminders: "রিমাইন্ডার (Reminders)"
        },
        games: {
            diffBadge: "<i class='fa-solid fa-robot'></i> AI স্তর: মাঝারি (Adaptive Level: Medium)",
            scoreBadge: "<i class='fa-solid fa-award'></i> আজকের স্কোর: ",
            arenaBack: "খেলার তালিকায় ফিরে যান",
            arenaRound: "রাউন্ড",
            aiHeader: "AI অভিযোজন সিদ্ধান্ত ইঞ্জিন",
            lblAcc: "নির্ভুলতা:",
            lblSpeed: "সময়:",
            lblNext: "পরবর্তী স্তর:",
            aiReason: "🤖 AI বিশ্লেষণ: অসাধারণ পারফরম্যান্স! রোগীর মানসিক প্রতিক্রিয়া অত্যন্ত সক্রিয়।",
            btnNextRound: "পরবর্তী প্রশ্ন",
            marketPrompt: "🧺 গ্রামীণ বাজারের এই ৫টি জিনিস মনোযোগ দিয়ে মনে রাখুন:",
            marketHidePrompt: "⏱️ ১০ সেকেন্ডে এগুলি ঝুড়িতে লুকানো হবে...",
            marketReadyBtn: "আমার মনে আছে, প্রশ্ন দেখান",
            marketQuestion: "বাজারের ঝুড়িতে এর মধ্যে কোন জিনিসটি রাখা হয়েছিল?",
            celebTitle: "চমৎকার খেলেছেন রমেশ বাবু!",
            celebSub: "আপনি আজকের জ্ঞানীয় সেশনটি সফলভাবে সম্পন্ন করেছেন।",
            celebScore: "আজকের মোট স্কোর:",
            celebStreak: "✓ ৭ দিনের ধারাবাহিকতা সংরক্ষিত!",
            celebAgain: "আবার খেলুন",
            celebOther: "অন্য খেলা বেছে নিন",
            cards: [
                { type: "market", ribbon: "⭐ NER বিশেষ", title: "১. ভিলেজ মার্কেট চ্যালেঞ্জ", desc: "উত্তর-পূর্বের গ্রামীণ বাজারের ৫টি বস্তু ১০ সেকেন্ড দেখে মনে রাখুন।", btn: "খেলুন (Play)" },
                { type: "local_ner", ribbon: "⭐ সাংস্কৃতিক ঐতিহ্য", title: "২. উত্তর-পূর্ব সাংস্কৃতিক ঐতিহ্য", desc: "কামাখ্যা, লোকতাক হ্রদ, চেরাপুঞ্জি ও ঐতিহ্যবাহী প্রতীক চিনুন।", btn: "অন্বেষণ করুন" },
                { type: "family", title: "৩. পারিবারিক স্মৃতি পরিচিতি", desc: "পারিবারিক ছবি এবং আত্মীয়দের সঠিক নাম চিনুন।", btn: "খেলুন (Play)" },
                { type: "routine", title: "৪. দৈনিক রুটিন ক্রম", desc: "দৈনন্দিন অভ্যাসসমূহ সঠিক ক্রমানুসারে সাজান।", btn: "ক্রম সাজান" },
                { type: "pattern", title: "৫. প্যাটার্ন শনাক্তকরণ", desc: "যৌক্তিক ক্রম এবং রঙের ধাঁধা সমাধান করুন।", btn: "সমাধান করুন" }
            ]
        },
        dmb: {
            title: "ডিজিটাল স্মৃতি বই (Digital Memory Book)",
            subtitle: "পারিবারিক ছবি, প্রিয় স্থান ও মধুর স্মৃতির একটি ব্যক্তিগত সংগ্রহ",
            addBtn: "নতুন স্মৃতি যোগ করুন",
            prevBtn: "পূর্ববর্তী স্মৃতি",
            nextBtn: "পরবর্তী স্মৃতি",
            browseTitle: "সকল স্মৃতি কার্ড দেখুন:",
            promptHeading: "AI স্মৃতি সংবর্ধন অনুশীলন:",
            correctFeedback: "✓ সঠিক স্মৃতি শনাক্তকরণ!",
            wrongFeedback: "স্মৃতি নোট সংরক্ষিত হয়েছে"
        },
        music: {
            title: "সঙ্গীতের মাধ্যমে স্মৃতি",
            subtitle: "উত্তর-পূর্বের ঐতিহ্যবাহী লোক সঙ্গীতের মাধ্যমে মধুর স্মৃতি জাগরণ",
            tracks: ["১. বিহু বাঁশির সুর", "২. শাস্ত্রীয় বাঁশির রাগ", "৩. মণিপুরী পেনা সুর"],
            yesBtn: "😊 হ্যাঁ, মনে আছে!",
            againBtn: "🔁 আবার শুনুন"
        },
        family: {
            title: "পরিবার সংযোগ (Family Connect Feed)",
            subtitle: "আপনার সন্তান ও নাতি-নাতনিদের ভালোবাসার বার্তা",
            replyBtn: "ভয়েস বার্তা পাঠান"
        },
        mood: {
            title: "আজ আপনি কেমন অনুভব করছেন? (Daily Mood)",
            subtitle: "আপনার অনুভূতি শেয়ার করুন যাতে পরিবার ও ডাক্তাররা আপনার যত্ন নিতে পারেন",
            lblGood: "ভালো / খুশি",
            lblOkay: "স্বাভাবিক",
            lblSad: "উদাস",
            lblRestless: "অস্থির",
            lblTired: "ক্লান্ত",
            fbHead: "মেজাজ লিপিবদ্ধ হয়েছে!",
            fbText: "ধন্যবাদ রমেশ বাবু! আপনার স্বাস্থ্য আমাদের কাছে সর্বাধিক গুরুত্বপূর্ণ।"
        },
        reminders: {
            title: "আজকের স্বাস্থ্য ও রুটিন রিমাইন্ডার",
            subtitle: "সময়মত ওষুধ, জল ও নিত্যদিনের কাজের সরকারি ডিজিটাল তালিকা",
            addBtn: "নতুন রিমাইন্ডার যোগ করুন",
            doneBtn: "সম্পন্ন",
            markBtn: "সম্পন্ন চিহ্নিত করুন",
            statusCompleted: "✓ সম্পন্ন",
            statusPending: "বাকি আছে",
            items: [
                { title: "সকালের বিপি ও মেমরি সাপ্লিমেন্ট ওষুধ", time: "০৯:০০ পূর্বাহ্ন" },
                { title: "১ গ্লাস তাজা হালকা গরম জল পান করুন", time: "১১:০০ পূর্বাহ্ন" },
                { title: "দুপুরের ওষুধ (ট্যাবলেট B)", time: "০২:০০ অপরাহ্ন" },
                { title: "সন্ধ্যার সান্ধ্যভ্রমণ ও মার্কেট গেম", time: "০৫:০০ অপরাহ্ন" }
            ]
        },
        caregiver: {
            patTitle: "রোগী: রমেশ শর্মা (বয়স: ৭৪)",
            patSubtext: "প্রধান পরিচর্যাকারী: অনন্যা শর্মা (মেয়ে) | রোগী আইডি: #p001 | গুয়াহাটি, আসাম",
            scoreLbl: "জ্ঞানীয় সম্পৃক্ততা স্কোর",
            scoreSub: "দৈনিক AI ভিত্তিক প্রবণতা বিশ্লেষণ",
            briefTitle: "শুভ সকাল, অনন্যা দেবী",
            briefSub: "রমেশ বাবু — আজকের AI স্বাস্থ্য ও স্মৃতি সারাংশ",
            statChips: {
                eng: "জ্ঞানীয় স্কোর",
                games: "খেলা সম্পন্ন",
                med: "ওষুধের অবস্থা",
                water: "জল গ্রহণ",
                mood: "দৈনিক মেজাজ"
            },
            alertPrefix: "AI সতর্কতা:",
            alertMsg: "মনোযোগের মাত্রা বিগত ৭ দিনের গড়ের চেয়ে কিছুটা কম।",
            recPrefix: "AI সুপারিশ:",
            recText: "আজ রমেশ বাবুর সাথে ১০ মিনিট ডিজিটাল স্মৃতি বই বা সঙ্গীতের সময় কাটান।",
            domainTitle: "জ্ঞানীয় ক্ষেত্র মেট্রিক্স",
            domains: {
                memory: "স্মৃতি স্মরণ",
                attention: "মনোযোগ",
                pattern: "প্যাটার্ন শনাক্তকরণ",
                routine: "রুটিন স্মরণ"
            },
            trendTitle: "১৪ দিনের জ্ঞানীয় প্রবণতা",
            trendDay1: "দিন ১",
            trendDay7: "দিন ৭",
            trendToday: "আজ (দিন ১৪)",
            trendNote: "ধারাবাহিক পর্যবেক্ষণ: MDoNER AI Trend Analyzer Protocol",
            circleTitle: "কেয়ার সার্কেল অনুমোদিত সদস্যবর্গ",
            postTitle: "রোগীকে বার্তা পাঠান",
            lblMsg: "রমেশ বাবুর জন্য বার্তা",
            lblPhoto: "ছবির URL (ঐচ্ছিক)",
            btnPost: "বার্তা পাঠান"
        },
        doctor: {
            title: "ক্লিনিক্যাল রিপোর্ট — রোগী #p001",
            subtitle: "নিউরো বিশেষজ্ঞ: ডাঃ ফুকন | MDoNER টেলি-হেলথ প্রোটোকল",
            exportBtn: "অফিসিয়াল রিপোর্ট প্রিন্ট / ডাউনলোড",
            stats: {
                sessions: "মোট খেলার সেশন",
                accuracy: "গড় নির্ভুলতা",
                latency: "গড় প্রতিক্রিয়ার সময়",
                diff: "বর্তমান AI স্তর"
            },
            headers: {
                time: "সময়",
                module: "গেম মডিউল",
                acc: "নির্ভুলতা",
                lat: "লেটেন্সি",
                diff: "কঠিনতা",
                outcome: "AI অভিযোজন ফলাফল"
            }
        },
        schemes: {
            title: "সরকারি প্রকল্প ও প্রবীণ কল্যাণ সংস্থান",
            subtitle: "স্বাস্থ্য ও পরিবার কল্যাণ মন্ত্রক এবং MDoNER সমর্থিত জাতীয় নীতিসমূহ",
            cards: [
                {
                    title: "জাতীয় টেলি-মানসিক স্বাস্থ্য কর্মসূচি (Tele-MANAS)",
                    desc: "দূরবর্তী এলাকায় বিনামূল্যে মানসিক স্বাস্থ্য সেবার জন্য ২৪x৭ টোল-ফ্রি হেল্পলাইন (১৪৪১৬)।",
                    meta: "টোল-ফ্রি: ১৪৪১৬ / ১৮০০-৮৯১-৪৪১৬ | MoHFW"
                },
                {
                    title: "প্রবীণ নাগরিক জাতীয় হেল্পলাইন (Elder Line 14567)",
                    desc: "সামাজিক ন্যায়বিচার ও ক্ষমতায়ন মন্ত্রকের জাতীয় হেল্পলাইন যা প্রবীণদের আইনি ও মানসিক সহায়তা প্রদান করে।",
                    meta: "টোল-ফ্রি: ১৪৫৬৭ | ভারত সরকার"
                },
                {
                    title: "MDoNER উত্তর-পূর্ব টেলি-হেলথ উদ্যোগ",
                    desc: "উত্তর-পূর্বের ৮টি রাজ্যে আশা কর্মীদের মাধ্যমে অফলাইন-ফার্স্ট স্বাস্থ্য পর্যবেক্ষণ।",
                    meta: "MDoNER | উত্তর-পূর্বাঞ্চল উন্নয়ন মন্ত্রক"
                },
                {
                    title: "আয়ুষ্মান ভারত — প্রবীণ নাগরিক স্বাস্থ্য সুরক্ষা (PM-JAY)",
                    desc: "৭০ বছর বা তদূর্ধ্ব সকল প্রবীণ নাগরিকের জন্য ৫ লক্ষ টাকা পর্যন্ত বিনামূল্যে স্বাস্থ্য বীমা।",
                    meta: "জাতীয় স্বাস্থ্য কর্তৃপক্ষ (NHA)"
                }
            ]
        },
        footer: {
            brandTitle: "MINDSET-NER পোর্টাল",
            aboutText: "স্মার্ট ইন্ডিয়া হ্যাকাথন (SIH 2026) এর অধীনে MDoNER ও MoHFW-এর জন্য তৈরি AI-চালিত ডিমেনশিয়া কেয়ার প্ল্যাটফর্ম।",
            sihNote: "প্রবলেম আইডি: <strong>SIH26003</strong> | MDoNER",
            qlTitle: "দ্রুত লিঙ্কসমূহ",
            links: ["প্রবীণ সহায়তা অ্যাপ", "পরিচর্যাকারী ড্যাশবোর্ড", "চিকিৎসক পোর্টাল", "সরকারি প্রকল্পসমূহ"],
            polTitle: "সহায়তা ও নীতি",
            policies: ["গোপনীয়তা নীতি", "ওয়েবসাইট নীতি (GIGW)", "অ্যাক্সেসিবিলিটি", "প্রতিক্রিয়া"],
            helpTitle: "জরুরি হেল্পলাইন",
            helplines: [
                "📞 প্রবীণ নাগরিক হেল্পলাইন: <span style='color: var(--gov-saffron);'>14567</span>",
                "🧠 Tele-MANAS (মানসিক স্বাস্থ্য): <span style='color: var(--gov-saffron);'>14416</span>",
                "🚨 জাতীয় জরুরি সেবা: <span style='color: var(--gov-saffron);'>112</span>"
            ],
            copyText: "© 2026 MINDSET-NER Portal | ভারত সরকারের নির্দেশিকা অনুসারে NHM ও MDoNER-এর জন্য তৈরি।",
            updateText: "সর্বশেষ আপডেট: <strong>২৪ অক্টোবর ২০২৬</strong> | সংস্করণ: <strong>v2.6 (Govt Edition)</strong>"
        }
    },

    // --------------------------------------------------------------------------
    // 5. MEITEI / MANIPURI (মৈতৈলোন্)
    // --------------------------------------------------------------------------
    'mni': {
        toast: "Lon Hongdokhre: Meiteilon (মৈতৈলোন্)",
        topHelpline: "Helpline: 14567 | Tele-MANAS: 14416",
        contrast: "High Contrast",
        nerBadge: "🌸 NER Content: ON",
        nav: {
            elderly: "👴 Ahalgi Portal (Elderly App)",
            caregiver: "👩‍⚕️ Caregiver Dashboard",
            doctor: "🧑‍⚕️ Doctor Portal",
            schemes: "🏛️ Leingakki Thourang (Govt Schemes)"
        },
        bulletin: {
            label: "Pao / Bulletin",
            text: "📢 <strong>MDoNER & MoHFW:</strong> North East state 8 da ahal oirabasinggi dementia anaba thidoknaba offline AI cognitive games houre."
        },
        journey: {
            title: "Nahakki Ningshing Khongchat",
            streak: "Numit 7 ni chatharakpa",
            nodes: ["Houba", "Ningshing Shagatpa", "Pukning Changba", "Ningshing Pothok", "Maipakpa"]
        },
        asha: {
            title: "AI Companion Asha (মৈতৈলোন্)",
            subtext: "Lon Yamna Khangba Asha Voice Assistant",
            greeting: "Khurumjari Ramesh ji! Eihak Asha ni. Nahakna hidak, eshing thaknaba matam amadi imung manunggi waree hangba yabani.",
            mic: "Ashaga Wari Sanasi",
            listenAgain: "Amasuk Tabiyu",
            quickTitle: "Thuna Hangba:",
            prompts: [
                "Eigi hidak matam karamdayno?",
                "Eigi echaroigi ming karino?",
                "Ngasi eigi thabak karino?",
                "Eshing karamda thakkani?"
            ]
        },
        subtabs: {
            games: "Cognitive Games",
            dmb: "Digital Memory Book",
            music: "Esheigi Matengna Ningshingba",
            family: "Imung Manung",
            mood: "Pukninggi Phibam",
            reminders: "Ningshingba (Reminders)"
        },
        games: {
            diffBadge: "<i class='fa-solid fa-robot'></i> AI Level: Mayay (Medium)",
            scoreBadge: "<i class='fa-solid fa-award'></i> Ngasigi Score: ",
            arenaBack: "Shannabasinggi List-ta Hanba",
            arenaRound: "Round",
            aiHeader: "AI Decision Engine",
            lblAcc: "Chumkhatpa:",
            lblSpeed: "Matam:",
            lblNext: "Makhagi Level:",
            aiReason: "🤖 AI analysis: Pukning changba yamna fari!",
            btnNextRound: "Makhagi Wahang",
            marketPrompt: "🧺 Keitheldagi Pot 5 asi ningshingbiyu:",
            marketHidePrompt: "⏱️ Second 10 gi manungda lotkani...",
            marketReadyBtn: "Ningshingle, Wahang Hangbiyu",
            marketQuestion: "Keithelda thamkhiba pot asi karino?",
            celebTitle: "Yamna Fajei Ramesh Ji!",
            celebSub: "Nahakna ngasigi cognitive session maipakna loisille.",
            celebScore: "Ngasigi Apunba Score:",
            celebStreak: "✓ Numit 7 gi streak ngak-shelle!",
            celebAgain: "Amuk Hanna Shannaba",
            celebOther: "Atei Shannaba Khanba",
            cards: [
                { type: "market", ribbon: "⭐ NER Special", title: "1. Village Market Challenge", desc: "North East keithel pot 5 ningshingba shannaba.", btn: "Shannaba (Play)" },
                { type: "local_ner", ribbon: "⭐ NER Heritage", title: "2. NER Cultural Heritage", desc: "Kamakhya, Loktak pat, amadi cultural khuding khangdokpa.", btn: "Khangba" },
                { type: "family", title: "3. Imung Manung Ningshingba", desc: "Imunggi photo amadi marising sak-khangba.", btn: "Shannaba" },
                { type: "routine", title: "4. Numit Khudinggi Thabak", desc: "Hidak chaba, eshing thakpa matam matamgi pareng thamba.", btn: "Pareng Semba" },
                { type: "pattern", title: "5. Pattern Recognition", desc: "Machu amadi akiba puzzle pareng loisangba.", btn: "Loisangba" }
            ]
        },
        dmb: {
            title: "Digital Memory Book",
            subtitle: "Imunggi photo amadi nungshiba matamgi ningshing pothok",
            addBtn: "Ningshing Photo Haponba",
            prevBtn: "Mamanggi",
            nextBtn: "Makhagi",
            browseTitle: "Memory Card Khuding:",
            promptHeading: "AI Memory Exercise:",
            correctFeedback: "✓ Chumle! Fajei!",
            wrongFeedback: "Note record toure"
        },
        music: {
            title: "Esheigi Matengna Ningshingba",
            subtitle: "North East ki folk esheina mamanggi ningshingba lakhanba",
            tracks: ["1. Bihu Flute", "2. Classical Raga Flute", "3. Manipuri Pena"],
            yesBtn: "😊 Hoi, Ningshingi!",
            againBtn: "🔁 Amuk Tabiyu"
        },
        family: {
            title: "Imung Manung (Family Connect)",
            subtitle: "Echa amadi esuna tharakpa nungshiba pao",
            replyBtn: "Voice Note Thaba"
        },
        mood: {
            title: "Ngasi Nahakna Karamna Faowi? (Mood)",
            subtitle: "Pukninggi phibam share toubiyu",
            lblGood: "Aphaba / Haraoba",
            lblOkay: "Mayay Oiba",
            lblSad: "Nungaitaba",
            lblRestless: "Pukning Thingdataba",
            lblTired: "Thaba",
            fbHead: "Mood Record Toure!",
            fbText: "Thagatchari Ramesh ji! Nahakki haksel eikhoigi ahanbani."
        },
        reminders: {
            title: "Ngasigi Hidak & Thabak Ningshingba",
            subtitle: "Matam chana hidak amadi eshing thaknaba digital schedule",
            addBtn: "Anouba Haponba",
            doneBtn: "Loisille",
            markBtn: "Loisille Haina Khutokpa",
            statusCompleted: "✓ Loisille",
            statusPending: "Ngaihak Leiri",
            items: [
                { title: "Ayukki BP amadi memory tablet", time: "09:00 AM" },
                { title: "Eshing glass 1 thakpiba", time: "11:00 AM" },
                { title: "Nungthilgi hidak (Pill B)", time: "02:00 PM" },
                { title: "Numidanggi walk & Village Market game", time: "05:00 PM" }
            ]
        },
        caregiver: {
            patTitle: "Anaba: Ramesh Sharma (Chahi: 74)",
            patSubtext: "Yengsinba: Ananya Sharma (Echani) | ID: #p001 | Guwahati",
            scoreLbl: "Cognitive Engagement Score",
            scoreSub: "Daily AI Trend Analysis",
            briefTitle: "Ayukki Khurumjari, Ananya",
            briefSub: "Ramesh Ji — Ngasigi AI Health & Cognitive Report",
            statChips: {
                eng: "Cognitive Score",
                games: "Game Loisille",
                med: "Hidak Status",
                water: "Eshing Thakpa",
                mood: "Pukning Phibam"
            },
            alertPrefix: "AI Alert:",
            alertMsg: "Pukning changba numit 7 gi average dagi khara nembagi maong uri.",
            recPrefix: "AI Recommendation:",
            recText: "Ngasi Ramesh jiga Digital Memory Book nattraga Music matam taminbiyu.",
            domainTitle: "Cognitive Domain Metrics",
            domains: {
                memory: "Ningshingba",
                attention: "Pukning Changba",
                pattern: "Pattern Sak-khangba",
                routine: "Thabak Ningshingba"
            },
            trendTitle: "Numit 14 gi Cognitive Trend",
            trendDay1: "Numit 1",
            trendDay7: "Numit 7",
            trendToday: "Ngasi (Numit 14)",
            trendNote: "MDoNER AI Trend Analyzer Protocol",
            circleTitle: "Care Circle gi Member-sing",
            postTitle: "Ramesh jida Pao Thaba",
            lblMsg: "Pao (Message)",
            lblPhoto: "Photo URL",
            btnPost: "Pao Thaba"
        },
        doctor: {
            title: "Longitudinal Clinical Report — Patient #p001",
            subtitle: "Doctor: Dr. Phukan | MDoNER Tele-Health Protocol",
            exportBtn: "Official Report Print / PDF",
            stats: {
                sessions: "Apunba Game Sessions",
                accuracy: "Average Accuracy",
                latency: "Average Latency",
                diff: "Current AI Level"
            },
            headers: {
                time: "Matam",
                module: "Game Module",
                acc: "Accuracy",
                lat: "Latency",
                diff: "Difficulty",
                outcome: "AI Result"
            }
        },
        schemes: {
            title: "Leingakki Thourang & Senior Citizen Resources",
            subtitle: "MoHFW amadi MDoNER na sougatpa national policies",
            cards: [
                {
                    title: "Tele-Mental Health Programme (Tele-MANAS)",
                    desc: "24x7 toll-free helpline (14416) wakhalgi anaba amadi telemedicine.",
                    meta: "Toll-Free: 14416 / 1800-891-4416"
                },
                {
                    title: "Elder Line: Senior Citizen Helpline (14567)",
                    desc: "Senior citizens gi ayeng-yensin amadi legal aid helpline.",
                    meta: "Toll-Free: 14567 | Govt of India"
                },
                {
                    title: "MDoNER North Eastern Tele-Health Initiative",
                    desc: "ASHA workers gi matengna grassroots offline tele-health protocol.",
                    meta: "MDoNER Ministry"
                },
                {
                    title: "Ayushman Bharat PM-JAY Senior Citizen Health Cover",
                    desc: "Chahi 70 mathakki senior citizens ta ₹5 Lakh insurance cover.",
                    meta: "NHA Authority"
                }
            ]
        },
        footer: {
            brandTitle: "MINDSET-NER Portal",
            aboutText: "SIH 2026 gi makhaada MDoNER & MoHFW gidamak semba AI Dementia Platform.",
            sihNote: "Problem ID: <strong>SIH26003</strong> | MDoNER",
            qlTitle: "Thuna Changba",
            links: ["Elderly Assistance App", "Caregiver Dashboard", "Doctor Portal", "Govt Schemes"],
            polTitle: "Support & Policy",
            policies: ["Privacy Policy", "Website Policies (GIGW)", "Accessibility", "Feedback"],
            helpTitle: "Emergency Helpline",
            helplines: [
                "📞 Elder Helpline: <span style='color: var(--gov-saffron);'>14567</span>",
                "🧠 Tele-MANAS: <span style='color: var(--gov-saffron);'>14416</span>",
                "🚨 Emergency: <span style='color: var(--gov-saffron);'>112</span>"
            ],
            copyText: "© 2026 MINDSET-NER Portal | National Health Mission & MDoNER.",
            updateText: "Last Updated: <strong>24 October 2026</strong> | Version: <strong>v2.6 (Govt Edition)</strong>"
        }
    },

    // --------------------------------------------------------------------------
    // 6. MIZO (Mizo ṭawng)
    // --------------------------------------------------------------------------
    'mzo': {
        toast: "Ṭawng thlak a ni: Mizo ṭawng (Mizo)",
        topHelpline: "Helpline: 14567 | Tele-MANAS: 14416",
        contrast: "Fiah Zual (Contrast)",
        nerBadge: "🌸 NER Content: ON",
        nav: {
            elderly: "👴 Pitar Putar Portal (Elderly App)",
            caregiver: "👩‍⚕️ Enkawltu Dashboard (Caregiver)",
            doctor: "🧑‍⚕️ Daktor Portal (Doctor & Clinic)",
            schemes: "🏛️ Sawrkar Ruahmanna (Govt Schemes)"
        },
        bulletin: {
            label: "Hriattirna / Bulletin",
            text: "📢 <strong>MDoNER & MoHFW:</strong> North East state 8 a pitar putar te tana offline AI dementia enkawlna leh hriatrengna infiamna hawn a ni."
        },
        journey: {
            title: "Hriatrengna Zinkawng",
            streak: "Ni 7 chhung chhunzawm a ni",
            nodes: ["Bul Ṭanna", "Hriatrengna Vawn", "Rilru Sawrbing", "Hriatrengna Hun", "Hnehna"]
        },
        asha: {
            title: "AI Thian Asha (Mizo)",
            subtext: "Ṭawng hrang hrang thiam Voice Assistant",
            greeting: "Chibai Ramesh ji! Kei hi Asha ka ni. Damdawi ei hun, tui in hun leh chhungkaw chanchin min zawt thei ang.",
            mic: "Asha Be Rawh",
            listenAgain: "Ngaithla Nawn Rawh",
            quickTitle: "Zawhna Tlangpui:",
            prompts: [
                "Ka damdawi ei a hun tawh em?",
                "Ka fanu hming eng nge?",
                "Vawiin ka tih tur eng nge?",
                "Tui in ka ngai em?"
            ]
        },
        subtabs: {
            games: "Thluak Sawizawina Infiamna",
            dmb: "Hriatrengna Lehkhabu",
            music: "Hla Hmanga Hriatrengna",
            family: "Chhungkua",
            mood: "Vawiin Ka Awmdan",
            reminders: "Hriattirna (Reminders)"
        },
        games: {
            diffBadge: "<i class='fa-solid fa-robot'></i> AI Level: Laizawl (Medium)",
            scoreBadge: "<i class='fa-solid fa-award'></i> Vawiin Score: ",
            arenaBack: "Infiamna List-ah Kir Rawh",
            arenaRound: "Round",
            aiHeader: "AI Thutlukna Engine",
            lblAcc: "Diktatna:",
            lblSpeed: "Hunduh:",
            lblNext: "Level Tharlam:",
            aiReason: "🤖 AI chhutdan: I ti tha hle mai! Thluak chet vel a chak tha e.",
            btnNextRound: "Zawhna Dawt",
            marketPrompt: "🧺 Bazar thil 5 te hi ngun takin vawng rawh:",
            marketHidePrompt: "⏱️ Second 10 hnuah bawmah thuhruk a ni ang...",
            marketReadyBtn: "Ka hre tawh e, zawhna min zawt rawh",
            marketQuestion: "Bazar bawmah eng ber nge dah a nih?",
            celebTitle: "I ti tha lutuk Ramesh Ji!",
            celebSub: "Vawiin atan thluak sawizawina i hlawhtling takin i zo e.",
            celebScore: "Vawiin Score Apuingun:",
            celebStreak: "✓ Ni 7 chhunzawmna a him e!",
            celebAgain: "Khel Nawn Rawh",
            celebOther: "Infiamna Dang",
            cards: [
                { type: "market", ribbon: "⭐ NER Special", title: "1. Khawpui Bazar Chona", desc: "Bazar thil 5 te second 10 chhung enin vawng rawh.", btn: "Khel Rawh (Play)" },
                { type: "local_ner", ribbon: "⭐ NER Heritage", title: "2. Hmar-Chhak Rohlu", desc: "Kamakhya, Loktak dil, Cherrapunji leh hnam thil hriat hran.", btn: "En Rawh" },
                { type: "family", title: "3. Chhungkua Hriat Hran", desc: "Chhungkaw thlalak leh inlaichinna hming dik hriat hran.", btn: "Khel Rawh" },
                { type: "routine", title: "4. Nitin Tihdan Indawt", desc: "Nitin tih thin (damdawi ei, ha nawh, tukthuan) indawt dika dah.", btn: "Dah Dawk" },
                { type: "pattern", title: "5. Rawng & Zia Hriat Hran", desc: "Rawng leh pianhmang zia dika remkhawm.", btn: "Chinfel Rawh" }
            ]
        },
        dmb: {
            title: "Hriatrengna Lehkhabu (Memory Book)",
            subtitle: "Chhungkaw thlalak, hmun ngainatawm leh hriatrengna hlu",
            addBtn: "Thlalak Tharlam Dah Rawh",
            prevBtn: "Hmasa",
            nextBtn: "Dawt",
            browseTitle: "Thlalak Zawng Zawng:",
            promptHeading: "AI Hriatrengna Sawizawi:",
            correctFeedback: "✓ I hre dik chiah e!",
            wrongFeedback: "Hriatrengna chhinchhiah a ni"
        },
        music: {
            title: "Hla Hmanga Hriatrengna",
            subtitle: "Hmar-Chhak hnam hla mawi hmanga lunglenna leh hlimna",
            tracks: ["1. Bihu Rawthei Tawtawrawt", "2. Classical Bamboo Raga", "3. Manipuri Pena"],
            yesBtn: "😊 Aw, ka hria e!",
            againBtn: "🔁 Ti-nawn Leh Rawh"
        },
        family: {
            title: "Chhungkua (Family Connect Feed)",
            subtitle: "Fa leh tute hnen atanga hmangaihna thuchah",
            replyBtn: "Aw Thawn Rawh"
        },
        mood: {
            title: "Vawiin i awmdan eng nge? (Daily Mood)",
            subtitle: "I rilru awmdan sawi la, chhungte leh daktor ten an hre thei ang",
            lblGood: "Tha / Hlim",
            lblOkay: "Pangngai",
            lblSad: "Rilru Hah / Lungngai",
            lblRestless: "Thlamuanglo",
            lblTired: "Chau / Mut khamlo",
            fbHead: "Awmdan Chhinchhiah A Ni!",
            fbText: "Ka lawm e Ramesh ji! I hriselna hi kan ngaih pawimawh ber a ni."
        },
        reminders: {
            title: "Vawiin Hriselna & Nitin Hriattirna",
            subtitle: "Damdawi, tui in leh sawizawina tana sawrkar digital schedule",
            addBtn: "Hriattirna Tharlam",
            doneBtn: "Zo Tawh",
            markBtn: "Zo Tawh Entirna",
            statusCompleted: "✓ Zo Tawh",
            statusPending: "Tih Tur La Awm",
            items: [
                { title: "Zing BP leh thluak chakna damdawi", time: "09:00 AM" },
                { title: "Tui lum no 1 in rawh", time: "11:00 AM" },
                { title: "Chhun damdawi (Pill B)", time: "02:00 PM" },
                { title: "Tlailam vakchhuak & Bazar game", time: "05:00 PM" }
            ]
        },
        caregiver: {
            patTitle: "Damazual: Ramesh Sharma (Kum: 74)",
            patSubtext: "Enkawltu Ber: Ananya Sharma (Fanu) | Patient ID: #p001 | Guwahati",
            scoreLbl: "Thluak Hnathawh Score",
            scoreSub: "Daily AI Trend Analysis",
            briefTitle: "Chibai Zinglam, Ananya",
            briefSub: "Ramesh Ji — Vawiin AI Hriselna Thuchah",
            statChips: {
                eng: "Thluak Score",
                games: "Game Khelh Zat",
                med: "Damdawi Ei",
                water: "Tui In Zat",
                mood: "Rilru Awmdan"
            },
            alertPrefix: "AI Hriattirna:",
            alertMsg: "Rilru sawrbingna ni 7 liamta aia tlem a hniam deuh.",
            recPrefix: "AI Rawtna:",
            recText: "Vawiin chu Ramesh ji nen Hriatrengna Lehkhabu en dun emaw Hla ngaithla dun rawh u.",
            domainTitle: "Thluak Hnathawh Metrik",
            domains: {
                memory: "Hriatna",
                attention: "Rilru Sawrbing",
                pattern: "Zia Hriat Hran",
                routine: "Nitin Tihdan"
            },
            trendTitle: "Ni 14 Chhung Hnathawh Kalhmang",
            trendDay1: "Ni 1",
            trendDay7: "Ni 7",
            trendToday: "Vawiin (Ni 14)",
            trendNote: "MDoNER AI Trend Analyzer Protocol",
            circleTitle: "Enkawltu Pawl Member-te",
            postTitle: "Damlo hnenah Thuchah Thawn Rawh",
            lblMsg: "Thuchah (Message)",
            lblPhoto: "Thlalak URL (Duh chuan)",
            btnPost: "Thawn Rawh"
        },
        doctor: {
            title: "Clinical Report Kimchang — Patient #p001",
            subtitle: "Daktor: Dr. Phukan (Neurologist) | MDoNER Protocol",
            exportBtn: "Official Report Print / PDF",
            stats: {
                sessions: "Game Khelh Zawng",
                accuracy: "Diktatna Vawng",
                latency: "Chhan Rang Lam",
                diff: "AI Level Awm Mek"
            },
            headers: {
                time: "Hun",
                module: "Game Module",
                acc: "Diktatna",
                lat: "Chhan Hun",
                diff: "Harsa Lam",
                outcome: "AI Result"
            }
        },
        schemes: {
            title: "Sawrkar Ruahmanna & Pitar Putar Hamṭhatna",
            subtitle: "MoHFW leh MDoNER hmalakna sawrkar thil",
            cards: [
                {
                    title: "Tele-Mental Health Programme (Tele-MANAS)",
                    desc: "24x7 toll-free helpline (14416) rilru hriselna tana a thlawna biak theih.",
                    meta: "Toll-Free: 14416 / 1800-891-4416"
                },
                {
                    title: "Elder Line: Senior Citizen Helpline (14567)",
                    desc: "Pitar putar te tana dan leh hriselna lama puihna helpline.",
                    meta: "Toll-Free: 14567 | India Sawrkar"
                },
                {
                    title: "MDoNER North Eastern Tele-Health Initiative",
                    desc: "ASHA workers te kaltlanga khaw hla zawk te tana tele-health.",
                    meta: "MDoNER Ministry"
                },
                {
                    title: "Ayushman Bharat PM-JAY Pitar Putar Insurance",
                    desc: "Kum 70 chunglam tan cheng nuai 5 thleng a thlawna inenkawlna.",
                    meta: "National Health Authority"
                }
            ]
        },
        footer: {
            brandTitle: "MINDSET-NER Portal",
            aboutText: "Smart India Hackathon (SIH 2026) hnuaia MDoNER & MoHFW tana buatsaih.",
            sihNote: "Problem ID: <strong>SIH26003</strong> | MDoNER",
            qlTitle: "Link Rang",
            links: ["Pitar Putar App", "Enkawltu Dashboard", "Daktor Portal", "Sawrkar Schemes"],
            polTitle: "Puihna & Dan",
            policies: ["Privacy Policy", "Website Policies (GIGW)", "Accessibility", "Feedback"],
            helpTitle: "Emergency Helpline",
            helplines: [
                "📞 Pitar Putar Helpline: <span style='color: var(--gov-saffron);'>14567</span>",
                "🧠 Tele-MANAS: <span style='color: var(--gov-saffron);'>14416</span>",
                "🚨 Emergency: <span style='color: var(--gov-saffron);'>112</span>"
            ],
            copyText: "© 2026 MINDSET-NER Portal | National Health Mission & MDoNER.",
            updateText: "Ennawn Hnuhnun: <strong>24 October 2026</strong> | Version: <strong>v2.6 (Govt Edition)</strong>"
        }
    },

    // --------------------------------------------------------------------------
    // 7. KHASI (Ka Khasi)
    // --------------------------------------------------------------------------
    'kha': {
        toast: "La pynkylla ktien: Ka Khasi (Khasi)",
        topHelpline: "Helpline: 14567 | Tele-MANAS: 14416",
        contrast: "High Contrast",
        nerBadge: "🌸 NER Content: ON",
        nav: {
            elderly: "👴 Portal ki Tymmen (Elderly App)",
            caregiver: "👩‍⚕️ Dashboard Nongsumar (Caregiver)",
            doctor: "🧑‍⚕️ Doctor Portal (Doctor & Clinic)",
            schemes: "🏛️ Ki Scheme Sorkar (Govt Schemes)"
        },
        bulletin: {
            label: "Khubor / Bulletin",
            text: "📢 <strong>MDoNER & MoHFW:</strong> Ha ki 8 tylli ki jylla North East la plie ia ka offline AI dementia care na ka bynta ki tymmen ki kro."
        },
        journey: {
            title: "Ka Lynti Jingkynmaw",
            streak: "7 sngi kaba bteng",
            nodes: ["Sdang", "Pynkhlain Jingkynmaw", "Pynleit Jingmut", "Ki Por Jingkynmaw", "Nongjop"]
        },
        asha: {
            title: "AI Lok Asha (Ka Khasi)",
            subtext: "Voice Assistant ba bun ktien",
            greeting: "Khublei Ramesh ji! Nga dei ka Asha. Phi lah ban kylli ia ki dawai, ka por dih um, bad ki jingkynmaw jong ka iing.",
            mic: "Kren bad ka Asha",
            listenAgain: "Sngap Biang",
            quickTitle: "Ki Jingkylli ba Khah:",
            prompts: [
                "Ka por dih dawai jong nga ka dei lano?",
                "Kumno ka kyrteng ka khun jong nga?",
                "Kaei ka prokram jong nga mynta ka sngi?",
                "Lano nga dei ban dih um?"
            ]
        },
        subtabs: {
            games: "Jingialehkai Pyrkhat",
            dmb: "Kot Jingkynmaw",
            music: "Jingkynmaw lyngba ki Jingrwai",
            family: "Ka Iing ka Sem",
            mood: "Ka Jingmut Jingpyrkhat",
            reminders: "Ki Jingpyrkhing (Reminders)"
        },
        games: {
            diffBadge: "<i class='fa-solid fa-robot'></i> AI Level: Pdeng (Medium)",
            scoreBadge: "<i class='fa-solid fa-award'></i> Score Mynta: ",
            arenaBack: "Phai sha ka List Jingialehkai",
            arenaRound: "Round",
            aiHeader: "AI Decision Engine",
            lblAcc: "Jingthikna:",
            lblSpeed: "Por:",
            lblNext: "Level ban bud:",
            aiReason: "🤖 AI analysis: Phi la leh bha shibun! Ka jingmut jingpyrkhat ka long kaba stet.",
            btnNextRound: "Jingkylli ba bud",
            marketPrompt: "🧺 Kynmaw ia kine ki 5 tylli ki tiar Iew:",
            marketHidePrompt: "⏱️ Ha ka 10 second kin rieh hapoh ka shang...",
            marketReadyBtn: "Nga la kynmaw, pyni ia ka jingkylli",
            marketQuestion: "Kano na kine ki tiar ba la buh ha ka shang iew?",
            celebTitle: "Phi la leh bha shibun, Ramesh Ji!",
            celebSub: "Phi la pyndep pura ia ka session pyrkhat jong mynta ka sngi.",
            celebScore: "Score baroh mynta:",
            celebStreak: "✓ 7 Sngi kaba bteng la tyngkai!",
            celebAgain: "Lehkai Biang",
            celebOther: "Jied Jingialehkai Pat",
            cards: [
                { type: "market", ribbon: "⭐ NER Special", title: "1. Ka Jingialehkai Iew Nongkyndong", desc: "Kynmaw ia ki 5 tylli ki tiar iew hapoh 10 second.", btn: "Lehkai (Play)" },
                { type: "local_ner", ribbon: "⭐ NER Heritage", title: "2. Ka Kolshor North East", desc: "Ithuh ia ka Kamakhya, Pung Loktak, Sohra bad kiwei.", btn: "Wad Bniah" },
                { type: "family", title: "3. Ithuh ia ki Kynja Iing", desc: "Ithuh ia ki dur bad ki kyrteng jong ki kur ki kha.", btn: "Lehkai" },
                { type: "routine", title: "4. Ka Ryntih Kam Man ka Sngi", desc: "Buh ryntih ia ki kam (dih dawai, sait bniat, bam step).", btn: "Buh Ryntih" },
                { type: "pattern", title: "5. Ithuh ia ki Dur & Rong", desc: "Pyndep ia ki jingthoh dur bad ki rong ba ryntih.", btn: "Pynbeit" }
            ]
        },
        dmb: {
            title: "Kot Jingkynmaw (Memory Book)",
            subtitle: "Ki dur ka iing, ki jaka ba sngewtynnad bad ki jingkynmaw kiba thiang",
            addBtn: "Thep Dur Thymmai",
            prevBtn: "Kaba Mynshuwa",
            nextBtn: "Kaba Bud",
            browseTitle: "Ki Dur Jingkynmaw Baroh:",
            promptHeading: "AI Memory Exercise:",
            correctFeedback: "✓ La ithuh thikna!",
            wrongFeedback: "La record ia ka jingkynmaw"
        },
        music: {
            title: "Jingkynmaw lyngba ki Jingrwai",
            subtitle: "Pynkynmaw ia ki por ba kmen lyngba ki sur tynrai North East",
            tracks: ["1. Besli Bihu (Assam)", "2. Besli Shnong Raga", "3. Sur Pena Manipuri"],
            yesBtn: "😊 Ho-oid, Nga Kynmaw!",
            againBtn: "🔁 Rwai Biang"
        },
        family: {
            title: "Ka Iing ka Sem (Family Connect)",
            subtitle: "Ki khubor ieid na ki khun bad ki ksiew jong phi",
            replyBtn: "Phah Voice Note"
        },
        mood: {
            title: "Kumno phi sngew mynta ka sngi? (Mood)",
            subtitle: "Iathuh ia ka jingmut khnang ba ki iing bad ki doctor kin tip",
            lblGood: "Bha / Kmen",
            lblOkay: "Bha hi",
            lblSad: "Sngewsih",
            lblRestless: "Sngewkulmar",
            lblTired: "Thait / Shoh samthiah",
            fbHead: "La Record ia ka Jingmut!",
            fbText: "Khublei shibun Ramesh ji! Ka koit ka khiah jong phi ka long kaba kongsan tam."
        },
        reminders: {
            title: "Ki Jingpyrkhing Koit-Khiah Mynta",
            subtitle: "Ka prokram dih dawai, dih um bad kam man ka sngi",
            addBtn: "Buh Jingpyrkhing Thymmai",
            doneBtn: "La Dep",
            markBtn: "Dien ba la dep",
            statusCompleted: "✓ La Dep",
            statusPending: "Dang Sah",
            items: [
                { title: "Dawai BP step bad kynmaw buit", time: "09:00 AM" },
                { title: "Dih 1 klat ka um syaid", time: "11:00 AM" },
                { title: "Dawai sngi (Pill B)", time: "02:00 PM" },
                { title: "Iaid kai janmiet & Village Market game", time: "05:00 PM" }
            ]
        },
        caregiver: {
            patTitle: "Nongpang: Ramesh Sharma (Rta: 74)",
            patSubtext: "Nongsumar Bakongsan: Ananya Sharma (Khun) | ID: #p001 | Guwahati",
            scoreLbl: "Cognitive Engagement Score",
            scoreSub: "Daily AI Trend Analysis",
            briefTitle: "Khublei Step, Ananya",
            briefSub: "Ramesh Ji — Ka Kaiphod Koit-Khiah Mynta",
            statChips: {
                eng: "Score Pyrkhat",
                games: "Jingialehkai ba la dep",
                med: "Dih Dawai",
                water: "Dih Um",
                mood: "Jingmut Jingpyrkhat"
            },
            alertPrefix: "AI Alert:",
            alertMsg: "Ka jingpynleit jingmut ka la hiar khyndiat na ka baseline 7 sngi.",
            recPrefix: "AI Recommendation:",
            recText: "Sngewbha pynlut 10 min bad u Ramesh ji ban pule Kot Jingkynmaw lane sngap jingrwai mynta.",
            domainTitle: "Cognitive Domain Metrics",
            domains: {
                memory: "Kynmaw",
                attention: "Pynleit Jingmut",
                pattern: "Ithuh Dur",
                routine: "Ryntih Kam"
            },
            trendTitle: "Ka Jingiaid 14 Sngi",
            trendDay1: "Sngi 1",
            trendDay7: "Sngi 7",
            trendToday: "Mynta (Sngi 14)",
            trendNote: "MDoNER AI Trend Analyzer Protocol",
            circleTitle: "Ki Dkhot Care Circle",
            postTitle: "Phah Khubor sha u Ramesh Ji",
            lblMsg: "Khubor (Message)",
            lblPhoto: "Dur URL (Lada don)",
            btnPost: "Phah Khubor"
        },
        doctor: {
            title: "Longitudinal Clinical Report — Patient #p001",
            subtitle: "Doctor: Dr. Phukan (Neurologist) | MDoNER Protocol",
            exportBtn: "Official Report Print / PDF",
            stats: {
                sessions: "Jingialehkai Baroh",
                accuracy: "Jingthikna Averiji",
                latency: "Por Jubab Averiji",
                diff: "AI Level Mynta"
            },
            headers: {
                time: "Por",
                module: "Game Module",
                acc: "Accuracy",
                lat: "Latency",
                diff: "Difficulty",
                outcome: "AI Result"
            }
        },
        schemes: {
            title: "Ki Scheme Sorkar & Jingiarap ia ki Tymmen",
            subtitle: "Ki policy ba kyrshan da ka MoHFW bad MDoNER",
            cards: [
                {
                    title: "Tele-Mental Health Programme (Tele-MANAS)",
                    desc: "24x7 toll-free helpline (14416) na ka bynta ka jingkoit jingkhiah ha kiba jngai.",
                    meta: "Toll-Free: 14416 / 1800-891-4416"
                },
                {
                    title: "Elder Line: Senior Citizen Helpline (14567)",
                    desc: "Helpline iarap ai buit bad ai jingsumar ia ki tymmen ki kro.",
                    meta: "Toll-Free: 14567 | Sorkar India"
                },
                {
                    title: "MDoNER North Eastern Tele-Health Initiative",
                    desc: "Ka jingpeit koit-khiah lyngba ki nongtrei ASHA ha ki 8 tylli ki jylla.",
                    meta: "MDoNER Ministry"
                },
                {
                    title: "Ayushman Bharat PM-JAY Senior Citizen Insurance",
                    desc: "Ka jingiada insurance haduh 5 lak tyngka na ka bynta ki ba 70 snem shaneng.",
                    meta: "National Health Authority"
                }
            ]
        },
        footer: {
            brandTitle: "MINDSET-NER Portal",
            aboutText: "La shna hapoh Smart India Hackathon (SIH 2026) na ka bynta MDoNER & MoHFW.",
            sihNote: "Problem ID: <strong>SIH26003</strong> | MDoNER",
            qlTitle: "Ki Link ba Kham Kongsan",
            links: ["App iarap Tymmen", "Caregiver Dashboard", "Doctor Portal", "Ki Scheme Sorkar"],
            polTitle: "Jingkyrshan & Policy",
            policies: ["Privacy Policy", "Website Policies (GIGW)", "Accessibility", "Feedback"],
            helpTitle: "Emergency Helpline",
            helplines: [
                "📞 Tymmen Helpline: <span style='color: var(--gov-saffron);'>14567</span>",
                "🧠 Tele-MANAS: <span style='color: var(--gov-saffron);'>14416</span>",
                "🚨 Emergency: <span style='color: var(--gov-saffron);'>112</span>"
            ],
            copyText: "© 2026 MINDSET-NER Portal | National Health Mission & MDoNER.",
            updateText: "La pynthymmai: <strong>24 October 2026</strong> | Version: <strong>v2.6 (Govt Edition)</strong>"
        }
    }
};
