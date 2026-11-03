import os
import pandas as pd
import numpy as np

os.makedirs("data", exist_ok=True)
os.makedirs("models", exist_ok=True)

# ==========================================
# 1. GENERATE GAME SESSIONS DATASET
# ==========================================
data = []
np.random.seed(42)

for accuracy in range(20, 101, 5):
    for response_time in [2.5, 4.0, 6.0, 8.5, 12.0, 16.0, 22.0]:
        for mistakes in [0, 1, 2, 3, 4, 5]:
            for difficulty in [1, 2, 3]:
                # Realistic cognitive evaluation heuristic
                if accuracy >= 85 and response_time <= 7.5 and mistakes <= 1:
                    next_level = min(3, difficulty + 1)
                elif accuracy < 55 or response_time >= 15.0 or mistakes >= 4:
                    next_level = max(1, difficulty - 1)
                else:
                    next_level = difficulty

                data.append({
                    "accuracy": accuracy,
                    "response_time": round(response_time + np.random.uniform(-0.3, 0.3), 2),
                    "mistakes": mistakes,
                    "current_difficulty": difficulty,
                    "next_difficulty": next_level
                })

df_games = pd.DataFrame(data)
df_games.to_csv("data/game_sessions.csv", index=False)
print(f"Generated data/game_sessions.csv with {len(df_games)} records")

# ==========================================
# 2. GENERATE INTENT PHRASES DATASET (Hindi, Hinglish, English)
# ==========================================
raw_intent_templates = {
    "MEDICINE_REMINDER": [
        # Hindi
        "मेरी दवाई कब है?", "दवाई का समय क्या है?", "क्या मुझे दवाई लेनी है?", 
        "सुबह की गोली कब खानी है?", "दवा की याद दिलाओ", "आज की दवाई बाकी है क्या?",
        "दवा खाने का वक्त हो गया क्या?", "शाम की गोली कब लेनी है?", "दवाइयों का टाइम टेबल बताओ",
        "बीपी की गोली का समय", "शुगर की दवा कब लेनी है?", "रात की खुराक कब खानी है?",
        "मेरी दवाइयां दिखाओ", "क्या मैंने दवा ले ली?", "दवा का अलार्म लगाओ",
        "दवा लेने का समय स्मरण कराएं", "मुझे गोली खानी है", "आज की गोलियां कौन सी हैं?",
        # Hinglish
        "meri dawai kab hai", "dawa ka time kya hai", "kya mujhe dawai leni hai",
        "subah ki goli kab khani hai", "dawa yaad dilao", "goli lene ka time ho gaya",
        "aaj ki dawa baki hai kya", "medicine ka time batao", "dawai lene ka waqt",
        "shaam ki goli", "bp ki dawai kab leni hai", "dawa khane ka time",
        "dawai li ya nahi", "aaj ki dawaiyan", "pill lene ka reminder",
        # English
        "When is my medicine?", "What time do I take my pill?", "Remind me about my medication",
        "Is it time for blood pressure medicine?", "When should I take my morning pills?",
        "Do I have any medications pending today?", "Medication reminder please",
        "What time is my evening tablet?", "Have I taken my sugar pills today?",
        "Show my medication schedule", "Is my dose due now?", "Medicine alert",
        "Check my prescription timings", "Time for my tablets", "Did I miss any pills today?"
    ],
    "HYDRATION": [
        # Hindi
        "मुझे पानी पीना है", "पानी पीने का समय कब है?", "मुझे प्यास लगी है",
        "क्या मुझे पानी पीना चाहिए?", "एक गिलास पानी लाओ", "पानी पीने की याद दिलाओ",
        "आज मैंने कितना पानी पिया?", "पानी का घूंट लेना है", "थोड़ा सा ताजा पानी दो",
        "पानी का समय हो गया क्या?", "गले में सूखापन है पानी पीना है", "पानी का अलार्म",
        "जल ग्रहण का समय", "मुझे प्यास महसूस हो रही है", "साफ पीने का पानी",
        # Hinglish
        "paani peena hai", "pani kab piyu", "mujhe pyaas lagi hai",
        "pani peene ka time", "ek glass pani chahiye", "pani pina hai",
        "aaj kitna pani piya", "thoda paani do", "pyas lag rahi hai",
        "water peene ka reminder", "pani ka glass", "pani ka reminder lagao",
        # English
        "I need to drink water", "When should I drink water?", "Hydration reminder please",
        "Have I had enough water today?", "I feel thirsty", "Remind me to drink water",
        "Can I have a glass of water?", "Is it time for a water break?", "Track my water intake",
        "I need some fresh water", "Time for hydration", "Bring me a cup of water",
        "Water reminder now", "How many glasses of water have I had?", "Drink some water"
    ],
    "START_GAME": [
        # Hindi
        "मेमोरी गेम शुरू करो", "कोई खेल खेलें", "बाज़ार वाला खेल खेलना है",
        "विलेज मार्केट गेम लगाओ", "दिमागी कसरत वाला खेल", "नया गेम चालू करो",
        "याददाश्त का खेल खेलना है", "कार्ड मिलान का खेल लगाओ", "दिमाग की परीक्षा वाला गेम",
        "चलो एक खेल खेलते हैं", "मुझे खेल पसंद है शुरू करो", "पहेली खेल चालू करें",
        "आसान गेम शुरू करो", "कठिन खेल खेलना चाहता हूँ", "मस्तिष्क संवर्धन खेल",
        # Hinglish
        "khel shuru karo", "game khelna hai", "memory game chalu karo",
        "market wala game lagao", "koi game khelen", "village market game",
        "dimag ka khel", "khelna chahta hu", "game play karo", "chalo game khelein",
        "brain exercise game", "card matching game chalu karo", "khel shuru kijiye",
        # English
        "Start a cognitive game", "Play the village market challenge", "Let's play memory game",
        "Open brain games", "Start memory cards challenge", "I want to play a game",
        "Launch cognitive exercise", "Play village market game", "Start pattern recall",
        "Begin a new puzzle session", "Can we play a brain game?", "Play the market game",
        "Open cognitive puzzles", "Start memory match", "Let us play a game now"
    ],
    "DAILY_ROUTINE": [
        # Hindi
        "आज क्या करना है?", "आज की दिनचर्या क्या है?", "मेरा आज का शेड्यूल बताओ",
        "दिन भर का कार्यक्रम क्या है?", "आज का प्लान क्या है?", "दोपहर में क्या करना है?",
        "सुबह की सैर का समय", "आज की गतिविधियां बताओ", "आज का टाइम टेबल क्या है?",
        "दैनिक कार्य सूची दिखाओ", "आज कौन सा दिन और तारीख है?", "दिनचर्या की जानकारी",
        "शाम को क्या कार्यक्रम है?", "आज के मुख्य काम", "दिन का विवरण दो",
        # Hinglish
        "aaj kya karna hai", "routine kya hai aaj ka", "schedule batao aaj ka",
        "aaj ka program kya hai", "aaj ka plan kya hai", "din bhar ka schedule",
        "aaj kya kya activities hain", "mera time table", "aaj ke tasks",
        "subah se sham ka schedule", "aaj ki dincharya", "daily routine bataiye",
        # English
        "What is my schedule today?", "Tell me my daily routine", "What should I do this afternoon?",
        "What are my activities today?", "Show my daily planner", "What is planned for today?",
        "What day and date is it today?", "Give me my schedule for the morning",
        "What is on my agenda today?", "Daily task list", "What are my events today?",
        "Show my morning routine", "What activities are scheduled?", "Today's itinerary",
        "Review today's plan"
    ],
    "FAMILY_MEMORY": [
        # Hindi
        "मेरी बेटी का नाम क्या है?", "मेरी बेटी की फोटो दिखाओ", "अनन्या कौन है?",
        "मेरे परिवार की तस्वीरें दिखाओ", "मेरे बेटे राहुल की यादें", "मेरा पोता कैसा है?",
        "हमारे पुराने घर की फोटो", "मेरी पत्नी की तस्वीर दिखाओ", "पारिवारिक एल्बम खोलो",
        "मेरे बच्चों के नाम क्या हैं?", "मेरी शादी की फोटो दिखाओ", "अनन्या का जन्मदिन कब है?",
        "परिवार के सदस्यों की यादें", "राहुल कहां रहता है?", "मेरे रिश्तेदार कौन हैं?",
        # Hinglish
        "meri beti ka naam kya hai", "family photos dikhao", "ananya kaun hai",
        "meri beti ananya ki photo", "bete rahul ki photo", "parivar ki yaadein",
        "purani photos dikhao", "meri family album", "ananya ki photo dikhao",
        "mere bachhe kahan hain", "family pictures dekhna hai", "meri beti ke baare me batao",
        # English
        "What is my daughter's name?", "Show me photos of my family", "Who is Ananya?",
        "Show my grandchildren pictures", "Where does my son Rahul live?", "Open family album",
        "Show photos of my wife", "Tell me about my grandchildren", "Who are the people in this picture?",
        "Show old family memories", "What is my son's profession?", "Pictures of Ananya and Rahul",
        "Can I see our ancestral home pictures?", "Show my daughter's picture", "Family photo gallery"
    ],
    "MUSIC_REMINISCENCE": [
        # Hindi
        "गाना सुनाओ", "बिहू का संगीत बजाओ", "बांसुरी की धुन सुनाओ",
        "पुराने लोकगीत सुनना है", "शास्त्रीय संगीत लगाओ", "आसमिया लोकगीत बजाएं",
        "मधुर धुन सुनाओ", "शांतिदायक संगीत चालू करो", "पुराने भजन सुनाओ",
        "रेडियो पर संगीत चलाओ", "बांसुरी वादन सुनाइए", "मनपसंद गाना बजाओ",
        "शाम का संगीत चालू करें", "सुरीली आवाज में गाना", "शांति देने वाला गीत",
        # Hinglish
        "gaana bajao", "music sunao", "bihu ka music bajao", "bansuri ki dhun",
        "purane gaane sunao", "classical music lagao", "bina gaana bajao",
        "kuch music play karo", "bhajan sunao", "song sunna hai",
        "traditional music bajao", "relaxing music chalu karo", "gaane play kijiye",
        # English
        "Play some traditional music", "Play Bihu flute melody", "I want to listen to folk music",
        "Play old classical songs", "Start relaxing instrumental tunes", "Play devotional songs",
        "Can you play Assam folk music?", "Play some calming melodies", "I want to hear flute music",
        "Put on some gentle music", "Play soothing traditional songs", "Start music player",
        "Play retro melodies", "Acoustic folk music please", "Play serene tunes"
    ],
    "MOOD_CHECKIN": [
        # Hindi
        "आज मुझे अच्छा लग रहा है", "आज बहुत उदास हूँ", "थोड़ी थकान महसूस हो रही है",
        "आज मन खुश है", "मुझे घबराहट हो रही है", "आज बहुत शांति महसूस हो रही है",
        "मन थोड़ा बेचैन है", "आज बहुत ऊर्जावान लग रहा है", "सिर में थोड़ा भारीपन है",
        "आज मेरा मूड बहुत अच्छा है", "थोड़ा अकेलापन लग रहा है", "मन प्रसन्न है",
        "आज थोड़ी चिंता हो रही है", "सब कुछ ठीक लग रहा है", "मन हल्का महसूस हो रहा है",
        # Hinglish
        "kaisa lag raha hai", "aaj mood kaisa hai", "aaj achha lag raha hai",
        "thoda thakan feel ho raha hai", "aaj udass lag raha hai", "mood check karo",
        "aaj bahut khush hu", "bechaini ho rahi hai", "sab theek hai aaj",
        "feeling good today", "thoda relax feel kar raha hu", "aaj thoda low feel ho raha hai",
        # English
        "I am feeling great today", "I feel a little tired", "Feeling restless today",
        "I feel very happy and cheerful", "I am feeling a bit lonely", "Today I feel peaceful",
        "I feel anxious this morning", "My mood is calm and serene", "I am having a wonderful day",
        "Feeling a little confused", "How is my mood status?", "I feel relaxed and energized",
        "I am feeling down today", "Everything feels pleasant today", "I feel good and refreshed"
    ]
}

intent_rows = []
for intent, phrases in raw_intent_templates.items():
    for p in phrases:
        p_clean = p.strip()
        if p_clean:
            intent_rows.append({"phrase": p_clean, "intent": intent})

df_intents = pd.DataFrame(intent_rows)
# Remove duplicate phrases if any
df_intents = df_intents.drop_duplicates(subset=["phrase"]).reset_index(drop=True)
df_intents.to_csv("data/intent_phrases.csv", index=False)
print(f"Generated data/intent_phrases.csv with {len(df_intents)} records across {df_intents['intent'].nunique()} intents")

