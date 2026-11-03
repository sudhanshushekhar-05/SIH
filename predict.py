import os
import joblib
import pandas as pd

model_path = os.path.join("models", "adaptive_game_model.joblib")
if not os.path.exists(model_path):
    print("Model not found! Running train_model.py first...")
    import train_model

saved_data = joblib.load(model_path)
model = saved_data["model"] if isinstance(saved_data, dict) else saved_data

# Example results from one game session
test_scenarios = [
    {"name": "Scenario 1: High Accuracy & Fast Response", "data": {"accuracy": 95, "response_time": 4.5, "mistakes": 0, "current_difficulty": 1}},
    {"name": "Scenario 2: Moderate Performance", "data": {"accuracy": 70, "response_time": 9.0, "mistakes": 2, "current_difficulty": 2}},
    {"name": "Scenario 3: High Difficulty & Slow Response", "data": {"accuracy": 40, "response_time": 18.0, "mistakes": 5, "current_difficulty": 3}},
]

diff_names = {1: "Easy", 2: "Medium", 3: "Hard"}

print("=" * 65)
print("MINDSET-NER Adaptive Difficulty Predictor (Inference Test)")
print("=" * 65)

for sc in test_scenarios:
    session = pd.DataFrame([sc["data"]])
    predicted_level = int(model.predict(session)[0])
    curr = diff_names.get(sc["data"]["current_difficulty"])
    nxt = diff_names.get(predicted_level)
    print(f"\n{sc['name']}:")
    print(f"  Inputs: Accuracy={sc['data']['accuracy']}%, Latency={sc['data']['response_time']}s, Mistakes={sc['data']['mistakes']}, Level={curr}")
    print(f"  AI Recommendation: {curr} -> {nxt} (Level {predicted_level})")

print("\nPrediction script completed successfully!")
