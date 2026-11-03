import os
import sys
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Reconfigure stdout for UTF-8 on Windows terminal if supported
if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

# Ensure models directory exists
os.makedirs("models", exist_ok=True)

# 1. Load dataset
csv_path = os.path.join("data", "intent_phrases.csv")
if not os.path.exists(csv_path):
    print("Dataset not found! Running generate_data.py first...")
    import generate_data

df = pd.read_csv(csv_path)

X = df["phrase"]
y = df["intent"]

# 2. Stratified Train-Test Split (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)

# 3. Build TF-IDF (char_wb n-grams for multilingual generalization) + Logistic Regression Pipeline
pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(ngram_range=(2, 5), analyzer="char_wb", min_df=1, sublinear_tf=True)),
    ("clf", LogisticRegression(C=10.0, max_iter=500, random_state=42))
])

# 4. Train Model
pipeline.fit(X_train, y_train)

# 5. Evaluate on Test Set
predictions = pipeline.predict(X_test)
test_acc = accuracy_score(y_test, predictions)

print("=" * 65)
print("MINDSET-NER Multilingual Voice Intent Model Evaluation")
print("=" * 65)
print(f"Total Samples: {len(df)} | Classes: {df['intent'].nunique()} | Test: {len(X_test)}")
print(f"Test Accuracy: {test_acc * 100:.2f}%")
print("\nClassification Report:\n")
print(classification_report(y_test, predictions, zero_division=0))

# 6. Test Unseen Phrases
unseen_phrases = [
    "दवा लेने का टाइम हो गया क्या?",
    "thoda pani pina hai",
    "khelna chahta hu",
    "schedule batao aaj ka",
    "meri beti ananya ki photo",
    "bina gaana bajao",
    "Can you play a memory game?"
]

print("Unseen Phrase Inference Test:")
for ph in unseen_phrases:
    pred = pipeline.predict([ph])[0]
    probs = pipeline.predict_proba([ph])[0]
    conf = max(probs)
    try:
        print(f"  * '{ph}' -> {pred} ({conf*100:.1f}% confidence)")
    except Exception:
        print(f"  * [Phrase] -> {pred} ({conf*100:.1f}% confidence)")

# 7. Save Model Bundle
model_path = os.path.join("models", "intent_model.joblib")
joblib.dump({
    "pipeline": pipeline,
    "accuracy": float(test_acc),
    "classes": list(pipeline.classes_),
    "sample_count": len(df)
}, model_path)

print(f"\nModel saved successfully to '{model_path}'!")

