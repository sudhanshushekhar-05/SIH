import sqlite3
import json
from datetime import datetime, timedelta
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "mindset_ner.db")

def get_db():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        user_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER,
        language TEXT DEFAULT 'hi',
        role TEXT DEFAULT 'patient',
        caregiver_id TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Game Sessions table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS game_sessions (
        session_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        game_type TEXT NOT NULL,
        score INTEGER NOT NULL,
        accuracy REAL NOT NULL,
        response_time REAL NOT NULL,
        difficulty TEXT NOT NULL,
        mistake_count INTEGER DEFAULT 0,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (user_id)
    )
    ''')
    
    # Reminders table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS reminders (
        reminder_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        type TEXT NOT NULL, -- medicine, hydration, activity, appointment
        title TEXT NOT NULL,
        time_scheduled TEXT NOT NULL,
        repeat_freq TEXT DEFAULT 'daily',
        status TEXT DEFAULT 'pending', -- pending, completed, missed
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Personal Memories (Memory Moments)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS personal_memories (
        memory_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        category TEXT NOT NULL, -- family, landmark, festival, habit
        label TEXT NOT NULL,
        value TEXT NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Cognitive Daily Trends
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS cognitive_trends (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        date TEXT NOT NULL,
        memory_score REAL DEFAULT 0,
        attention_score REAL DEFAULT 0,
        pattern_score REAL DEFAULT 0,
        routine_score REAL DEFAULT 0,
        overall_engagement REAL DEFAULT 0,
        UNIQUE(user_id, date)
    )
    ''')
    
    # Digital Memory Book table (Family, Home, Dates, Places, Foods, Songs, Photos)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS digital_memory_book (
        memory_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        category TEXT NOT NULL, -- family, place, date, food, song, photo
        title TEXT NOT NULL,
        relationship TEXT,
        last_met_date TEXT,
        image_url TEXT,
        audio_url TEXT,
        question_prompt_1 TEXT,
        question_prompt_2 TEXT,
        question_prompt_3 TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Mood Logs table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS mood_logs (
        log_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        date TEXT NOT NULL,
        mood_level TEXT NOT NULL, -- good, okay, sad, angry, tired
        mood_label TEXT NOT NULL,
        notes TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Family Posts (Family Connect) table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS family_posts (
        post_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        sender_name TEXT NOT NULL,
        sender_relation TEXT NOT NULL,
        media_url TEXT,
        text_message TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Music Tracks table (Memory Through Music)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS music_tracks (
        track_id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        artist_region TEXT NOT NULL,
        audio_url TEXT NOT NULL,
        question_prompt TEXT NOT NULL,
        category TEXT DEFAULT 'regional_folk'
    )
    ''')

    # Seed mock data if empty
    cursor.execute("SELECT COUNT(*) FROM users")
    if cursor.fetchone()[0] == 0:
        seed_mock_data(cursor)
        
    conn.commit()
    conn.close()

def seed_mock_data(cursor):
    # Default patient
    cursor.execute('''
        INSERT INTO users (user_id, name, age, language, role, caregiver_id)
        VALUES ('p001', 'Ramesh Sharma', 74, 'hi', 'patient', 'c001')
    ''')
    
    # Default caregiver
    cursor.execute('''
        INSERT INTO users (user_id, name, age, language, role, caregiver_id)
        VALUES ('c001', 'Ananya Sharma', 38, 'hi', 'caregiver', NULL)
    ''')
    
    # Personal memories
    memories = [
        ('m001', 'p001', 'family', 'daughter', 'Ananya', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'),
        ('m002', 'p001', 'family', 'son', 'Rahul', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'),
        ('m003', 'p001', 'landmark', 'favorite_place', 'Kamakhya Temple, Assam', 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400'),
        ('m004', 'p001', 'festival', 'favorite_festival', 'Bihu Celebration', 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=400'),
        ('m005', 'p001', 'doctor', 'attending_doctor', 'Dr. Phukan (Neurologist)', '')
    ]
    cursor.executemany('''
        INSERT INTO personal_memories (memory_id, user_id, category, label, value, image_url)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', memories)
    
    # Digital Memory Book items
    digital_memories = [
        ('dmb001', 'p001', 'family', 'Ananya Sharma', 'Daughter', 'Last Sunday', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', '', 'Who is this?', 'What is her name?', 'When was the last time you met her?'),
        ('dmb002', 'p001', 'family', 'Rahul Sharma', 'Son', '2 weeks ago', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', '', 'Who is this person?', 'What is his name?', 'Where does he live?'),
        ('dmb003', 'p001', 'place', 'Guwahati Home & Garden', 'Home Place', 'Living here since 1985', 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400', '', 'Which place is this?', 'Where is your home located?', 'What is your favorite memory here?'),
        ('dmb004', 'p001', 'food', 'Traditional Masor Tenga & Rice', 'Favorite Dish', 'Yesterday lunch', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', '', 'What food is shown here?', 'What is your favorite meal?', 'Who cooked this for you?'),
        ('dmb005', 'p001', 'song', 'Bihu Flute Melody', 'Favorite Music', 'Played daily', '', 'https://actions.google.com/sounds/v1/ambiences/outdoor_market.ogg', 'Do you recognize this melody?', 'What festival is this song played during?', 'Would you like to listen again?')
    ]
    cursor.executemany('''
        INSERT INTO digital_memory_book (memory_id, user_id, category, title, relationship, last_met_date, image_url, audio_url, question_prompt_1, question_prompt_2, question_prompt_3)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', digital_memories)

    # Family Posts (Family Connect)
    posts = [
        ('fp001', 'p001', 'Ananya (Daughter)', 'Daughter', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', 'Good morning Papa! ❤️ Wishing you a wonderful morning. Looking forward to visiting this weekend!'),
        ('fp002', 'p001', 'Aarav (Grandson)', 'Grandson', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'Dada ji! I won 1st prize in school drawing today! 🎉 Sending you big hugs!')
    ]
    cursor.executemany('''
        INSERT INTO family_posts (post_id, user_id, sender_name, sender_relation, media_url, text_message)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', posts)

    # Music Tracks (Memory Through Music)
    tracks = [
        ('mt001', 'Assamese Folk Bihu Flute', 'Assam Traditional', 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3', 'Do you remember this Bihu melody?', 'regional_folk'),
        ('mt002', 'Classical Bamboo Flute Raga', 'NER Classical', 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a8c8a8.mp3', 'How does this relaxing flute music make you feel?', 'relaxing')
    ]
    cursor.executemany('''
        INSERT INTO music_tracks (track_id, title, artist_region, audio_url, question_prompt, category)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', tracks)

    # Mood Logs
    today_str = datetime.now().strftime("%Y-%m-%d")
    cursor.execute('''
        INSERT INTO mood_logs (log_id, user_id, date, mood_level, mood_label, notes)
        VALUES ('ml001', 'p001', ?, 'good', '😊 Good / Happy', 'Felt energetic after morning walk')
    ''', (today_str,))

    # Default Reminders
    reminders = [
        ('r001', 'p001', 'medicine', 'Morning BP & Memory Supplement', '09:00 AM', 'daily', 'completed'),
        ('r002', 'p001', 'hydration', 'Drink 1 Glass of Water', '11:00 AM', 'every_2_hours', 'pending'),
        ('r003', 'p001', 'medicine', 'Afternoon Medication (Pill B)', '02:00 PM', 'daily', 'pending'),
        ('r004', 'p001', 'activity', 'Light Walk & Memory Game Session', '05:00 PM', 'daily', 'pending'),
        ('r005', 'p001', 'appointment', 'Dr. Phukan Neurological Checkup', '15 Sept 10:30 AM', 'once', 'pending')
    ]
    cursor.executemany('''
        INSERT INTO reminders (reminder_id, user_id, type, title, time_scheduled, repeat_freq, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', reminders)

    # Seed 14 days of realistic cognitive trends
    today = datetime.now()
    for i in range(14, -1, -1):
        dt_str = (today - timedelta(days=i)).strftime("%Y-%m-%d")
        base_mem = 82 - (i * 0.4) + (i % 3)
        base_att = 78 - (i * 0.3) + ((i*2) % 4)
        base_pat = 88 - (i * 0.2)
        base_rout = 75 - (i * 0.5) + (i % 2)
        overall = round((base_mem + base_att + base_pat + base_rout) / 4.0, 1)
        
        cursor.execute('''
            INSERT INTO cognitive_trends (user_id, date, memory_score, attention_score, pattern_score, routine_score, overall_engagement)
            VALUES ('p001', ?, ?, ?, ?, ?, ?)
        ''', (dt_str, round(base_mem, 1), round(base_att, 1), round(base_pat, 1), round(base_rout, 1), overall))

if __name__ == "__main__":
    init_db()
    print("Database initialized with expanded healthcare mock data successfully.")

