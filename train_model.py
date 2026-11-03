import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Ensure models directory exists
os.makedirs("models", exist_ok=True)

# 1. Load or generate training data for the prototype
csv_path = os.path.join("data", "game_sessions.csv")
if os.path.exists(csv_path):
    print(f"Loading session dataset from {csv_path}...")
    df = pd.read_csv(csv_path)
else:
    print("Generating synthetic demo dataset...")
    data = []
    for accuracy in range(20, 101, 10):
        for response_time in [3, 5, 8, 12, 18]:
            for mistakes in [0, 1, 3, 5]:
                for difficulty in [1, 2, 3]:
                    if accuracy >= 85 and response_time <= 8 and mistakes <= 1:
                        next_level = min(3, difficulty + 1)
                    elif accuracy < 50 or mistakes >= 5:
                        next_level = max(1, difficulty - 1)
                    else:
                        next_level = difficulty

                    data.append([
                        accuracy, response_time, mistakes,
                        difficulty, next_level
                    ])

    df = pd.DataFrame(data, columns=[
        "accuracy", "response_time", "mistakes",
        "current_difficulty", "next_difficulty"
    ])

# 2. Features and Target
X = df[[
    "accuracy", "response_time", "mistakes",
    "current_difficulty"
]]
y = df["next_difficulty"]

# 3. Stratified Train-Test Split (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 4. Train RandomForest Classifier
model = RandomForestClassifier(
    n_estimators=100, random_state=42
)
model.fit(X_train, y_train)

# 5. Evaluate on Held-out Test Set
predictions = model.predict(X_test)
test_acc = accuracy_score(y_test, predictions)

print("=" * 60)
print(f"MINDSET-NER Adaptive Difficulty Model Evaluation")
print("=" * 60)
print(f"Total Samples: {len(df)} | Train: {len(X_train)} | Test: {len(X_test)}")
print(f"Demo Test Accuracy: {test_acc * 100:.2f}%")
print("\nClassification Report:\n")
print(classification_report(y_test, predictions, zero_division=0))

# 6. Feature Importances
feature_names = ["accuracy", "response_time", "mistakes", "current_difficulty"]
importances = dict(zip(feature_names, model.feature_importances_))
print("Feature Importances:")
for f_name, imp in sorted(importances.items(), key=lambda x: x[1], reverse=True):
    print(f"  • {f_name:20s}: {imp * 100:.2f}%")

# 7. Save Model & Metadata
model_path = os.path.join("models", "adaptive_game_model.joblib")
joblib.dump({
    "model": model,
    "accuracy": test_acc,
    "feature_importances": importances,
    "sample_count": len(df)
}, model_path)

print(f"\nModel saved successfully to '{model_path}'!")
