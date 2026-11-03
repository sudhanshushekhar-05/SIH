import os
import sys
import joblib

# Reconfigure stdout for UTF-8 on Windows terminal if supported
if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

model_path = os.path.join("models", "intent_model.joblib")
if not os.path.exists(model_path):
    print(f"Error: Trained intent model not found at {model_path}!")
    print("Please run: python train_intent_model.py")
    sys.exit(1)

bundle = joblib.load(model_path)
pipeline = bundle["pipeline"]
acc = bundle.get("accuracy", 0.95)

print("=" * 65)
print(f"MINDSET-NER Voice Intent Inference Engine (Model Accuracy: {acc*100:.1f}%)")
print("=" * 65)

test_queries = [
    "दवा लेने का समय कब है?",
    "thoda pani peena hai",
    "khel shuru karo",
    "aaj ka routine kya hai",
    "meri beti ananya ki photo",
    "bihu ka gana bajao",
    "aaj bahut achha lag raha hai",
    "I need to take my blood pressure pills",
    "Can you play traditional flute melody?"
]

for q in test_queries:
    pred = pipeline.predict([q])[0]
    probs = pipeline.predict_proba([q])[0]
    conf = max(probs)
    try:
        print(f"Query: \"{q}\"")
        print(f"  -> Predicted Intent : {pred} (Confidence: {conf*100:.1f}%)\n")
    except Exception:
        print(f"Query: [Text]\n  -> Predicted Intent : {pred} (Confidence: {conf*100:.1f}%)\n")

print("Intent inference test completed successfully!")
