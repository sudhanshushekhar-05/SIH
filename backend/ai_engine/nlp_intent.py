import re
from typing import Dict, Any

class VoiceCompanionNLPEngine:
    """
    NLP Intent Classifier & Memory Retrieval Engine for MINDSET-NER Voice Companion ('Asha')
    Supports Hindi, English, and Regional context inputs.
    """
    def __init__(self):
        # Intent keyword patterns
        self.intent_patterns = {
            "MEDICINE_REMINDER": [
                r"दवाई", r"दवा", r"tablet", r"medicine", r"pill", r"kab hai", r"when is my medicine", r"pill time"
            ],
            "HYDRATION_REMINDER": [
                r"पानी", r"water", r"drink", r"paani", r"hydration", r"pyas", r"thirsty"
            ],
            "DAILY_ROUTINE": [
                r"आज", r"schedule", r"routine", r"kya karna hai", r"what to do", r"activities", r"din bhar"
            ],
            "PERSONAL_MEMORY_DAUGHTER": [
                r"बेटी", r"daughter", r"beti", r"ananya"
            ],
            "PERSONAL_MEMORY_SON": [
                r"बेटा", r"son", r"beta", r"rahul"
            ],
            "PERSONAL_MEMORY_PLACE": [
                r"मंदिर", r"temple", r"place", r"kamakhya", r"favorite place", r"bichar", r"assam"
            ],
            "PERSONAL_MEMORY_FESTIVAL": [
                r"त्योहार", r"festival", r"bihu", r"pooja"
            ],
            "GAME_START": [
                r"खेल", r"game", r"play", r"exercise", r"khelna", r"start game", r"memory game", r"market"
            ],
            "COGNITIVE_SCORE_QUERY": [
                r"स्कोर", r"score", r"performance", r"kaisa", r"progress", r"report"
            ],
            "MUSIC_MEMORY": [
                r"गाना", r"संगीत", r"song", r"music", r"bihu song", r"flute", r"gaana"
            ],
            "MOOD_CHECKIN": [
                r"mood", r"feeling", r"kaisa lag raha hai", r"kaise ho", r"feel"
            ],
            "MEMORY_BOOK": [
                r"memory book", r"यादें", r"photo", r"tasveer", r"book"
            ]
        }

    def process_voice_query(self, text: str, personal_memories: list = None, reminders: list = None) -> Dict[str, Any]:
        text_lower = text.lower().strip()
        detected_intent = "GENERAL_HELP"
        
        for intent, patterns in self.intent_patterns.items():
            for pat in patterns:
                if re.search(pat, text_lower):
                    detected_intent = intent
                    break
            if detected_intent != "GENERAL_HELP":
                break

        # Generate contextual speech response
        if detected_intent == "MEDICINE_REMINDER":
            med_reminders = [r for r in (reminders or []) if r.get('type') == 'medicine' and r.get('status') == 'pending']
            if med_reminders:
                next_med = med_reminders[0]
                speech = f"आपकी अगली दवाई {next_med.get('title')} का समय {next_med.get('time_scheduled')} है।"
            else:
                speech = "आज सुबह की दवाई ली जा चुकी है। अगली दवाई दोपहर 2:00 बजे है।"
                
        elif detected_intent == "HYDRATION_REMINDER":
            speech = "आपको अब 1 गिलास ताज़ा पानी पीने का समय हो गया है। स्वास्थ्य के लिए पानी बहुत ज़रूरी है।"
            
        elif detected_intent == "DAILY_ROUTINE":
            speech = "आज सुबह 9 बजे आपकी दवाई थी। 11 बजे आपका मेमोरी गेम सेशन है, और शाम 5 बजे हल्की सैर का समय है।"
            
        elif detected_intent == "PERSONAL_MEMORY_DAUGHTER":
            val = self._find_memory(personal_memories, 'daughter', 'Ananya')
            speech = f"आपकी बेटी का नाम {val} है। वह आपसे बहुत प्यार करती है!"
            
        elif detected_intent == "PERSONAL_MEMORY_SON":
            val = self._find_memory(personal_memories, 'son', 'Rahul')
            speech = f"आपके बेटे का नाम {val} है।"
            
        elif detected_intent == "PERSONAL_MEMORY_PLACE":
            val = self._find_memory(personal_memories, 'favorite_place', 'Kamakhya Temple, Assam')
            speech = f"आपकी पसंदीदा सांस्कृतिक जगह {val} है।"
            
        elif detected_intent == "PERSONAL_MEMORY_FESTIVAL":
            val = self._find_memory(personal_memories, 'favorite_festival', 'Bihu Celebration')
            speech = f"आपका मनपसंद त्यौहार {val} है!"
            
        elif detected_intent == "GAME_START":
            speech = "आइए आज का विलेज मार्केट गेम या मेमोरी गेम शुरू करते हैं!"
            
        elif detected_intent == "COGNITIVE_SCORE_QUERY":
            speech = "आपका आज का कॉग्निटिव स्कोर 78% है। आपकी याददाश्त और ध्यान केंद्रित करने की क्षमता बहुत अच्छी चल रही है!"

        elif detected_intent == "MUSIC_MEMORY":
            speech = "आइए आपका मनपसंद बिहू बांसुरी संगीत सुनते हैं और पुरानी सुखद यादें ताजा करते हैं।"

        elif detected_intent == "MOOD_CHECKIN":
            speech = "आप आज कैसा महसूस कर रहे हैं? नीचे दिए गए इमोजी बटन से बताइए!"

        elif detected_intent == "MEMORY_BOOK":
            speech = "आपकी डिजिटल मेमोरी बुक में आपके परिवार और पसंदीदा स्थानों की तस्वीरें सुरक्षित हैं।"
            
        else:
            speech = "नमस्ते! मैं आपकी AI साथी 'आशा' हूँ। आप मुझसे अपनी दवाई, डिजिटल मेमोरी बुक या संगीत के बारे में पूछ सकते हैं।"

        return {
            "query": text,
            "detected_intent": detected_intent,
            "speech_response": speech,
            "display_card": {
                "title": self._intent_title(detected_intent),
                "text": speech
            }
        }

    def _find_memory(self, memories: list, label: str, default: str) -> str:
        if memories:
            for m in memories:
                if m.get('label') == label:
                    return m.get('value')
        return default

    def _intent_title(self, intent: str) -> str:
        mapping = {
            "MEDICINE_REMINDER": "💊 दवाई रिमाइंडर (Medication Notice)",
            "HYDRATION_REMINDER": "💧 पानी पीने की सलाह (Hydration Alert)",
            "DAILY_ROUTINE": "📅 दैनिक दिनचर्या (Daily Schedule)",
            "PERSONAL_MEMORY_DAUGHTER": "❤️ पारिवारिक स्मृति (Daughter)",
            "PERSONAL_MEMORY_SON": "❤️ पारिवारिक स्मृति (Son)",
            "PERSONAL_MEMORY_PLACE": "🌸 पसंदीदा स्थान (Favorite Place)",
            "PERSONAL_MEMORY_FESTIVAL": "🎉 सांस्कृतिक त्यौहार (Regional Festival)",
            "GAME_START": "🧠 मेमोरी खेल (Brain Exercise)",
            "COGNITIVE_SCORE_QUERY": "📊 कॉग्निटिव रिपोर्ट (Cognitive Engagement)",
            "MUSIC_MEMORY": "🎵 संगीत से यादें (Memory Through Music)",
            "MOOD_CHECKIN": "😊 मूड चेक-इन (Daily Mood Check-In)",
            "MEMORY_BOOK": "📖 डिजिटल मेमोरी बुक (Digital Memory Book)",
            "GENERAL_HELP": "🤖 AI साथी आशा (MINDSET-NER Companion)"
        }
        return mapping.get(intent, "AI Assistant")

nlp_engine = VoiceCompanionNLPEngine()
