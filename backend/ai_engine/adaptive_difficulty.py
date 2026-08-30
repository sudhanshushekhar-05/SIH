import numpy as np
try:
    from sklearn.ensemble import RandomForestClassifier
    SKLEARN_AVAILABLE = True
except ImportError:
    SKLEARN_AVAILABLE = False

class AdaptiveDifficultyEngine:
    """
    AI Adaptive Difficulty Engine for MINDSET-NER
    Evaluates patient cognitive game performance in real-time and adjusts game complexity dynamically.
    """
    def __init__(self):
        self.difficulties = ["Easy", "Medium", "Hard"]
        if SKLEARN_AVAILABLE:
            self._train_baseline_model()
            
    def _train_baseline_model(self):
        # Synthetic dataset representing cognitive game sessions
        # Features: [accuracy(0-100), response_time_sec(1-30), mistake_count(0-10), prev_diff_code(0,1,2)]
        # Target: Next difficulty code (0: Easy, 1: Medium, 2: Hard)
        X = [
            # High accuracy, low time -> upgrade
            [95, 4.0, 0, 0], [90, 5.0, 0, 0], [100, 3.5, 0, 0],
            [95, 5.5, 0, 1], [90, 4.5, 1, 1], [100, 4.0, 0, 1],
            # Moderate performance -> stay
            [75, 8.0, 1, 0], [80, 7.5, 1, 1], [70, 9.0, 2, 2],
            # Low accuracy, high time or mistakes -> downgrade to easy/medium
            [50, 15.0, 3, 2], [40, 18.0, 4, 1], [30, 20.0, 5, 1],
            [50, 12.0, 3, 0], [20, 25.0, 6, 2]
        ]
        # Targets
        y = [
            1, 1, 1, # to medium
            2, 2, 2, # to hard
            0, 1, 2, # stay same
            1, 0, 0, # downgrade
            0, 0     # downgrade
        ]
        self.clf = RandomForestClassifier(n_estimators=20, random_state=42)
        self.clf.fit(X, y)

    def evaluate_performance(self, accuracy: float, response_time: float, mistakes: int, current_difficulty: str) -> dict:
        diff_code_map = {"Easy": 0, "Medium": 1, "Hard": 2}
        code_to_diff = {0: "Easy", 1: "Medium", 2: "Hard"}
        curr_code = diff_code_map.get(current_difficulty, 0)
        
        if SKLEARN_AVAILABLE:
            features = [[accuracy, response_time, mistakes, curr_code]]
            predicted_code = int(self.clf.predict(features)[0])
            next_diff = code_to_diff[predicted_code]
        else:
            # High-accuracy fallback heuristic if sklearn not loaded
            if accuracy >= 85 and response_time <= 7.0 and mistakes <= 1:
                next_diff = code_to_diff[min(curr_code + 1, 2)]
            elif accuracy < 60 or response_time > 15.0 or mistakes >= 3:
                next_diff = code_to_diff[max(curr_code - 1, 0)]
            else:
                next_diff = current_difficulty
                
        # Generate human-readable AI rationale
        if next_diff == current_difficulty:
            reason = f"Performance is stable ({accuracy}% accuracy in {response_time:.1f}s). Maintaining {current_difficulty} level."
        elif diff_code_map[next_diff] > curr_code:
            reason = f"Excellent recall ({accuracy}% accuracy, {response_time:.1f}s speed)! AI increased difficulty to {next_diff}."
        else:
            reason = f"AI adjusted challenge to {next_diff} level to keep game engaging and stress-free."
            
        # Visual parameter mappings for demo presentation
        param_map = {
            "Easy": {"objects": 4, "time": 10},
            "Medium": {"objects": 5, "time": 8},
            "Hard": {"objects": 7, "time": 6}
        }
        
        curr_params = param_map.get(current_difficulty, {"objects": 5, "time": 8})
        next_params = param_map.get(next_diff, {"objects": 5, "time": 8})

        rating = "Excellent" if accuracy >= 85 else ("Good" if accuracy >= 65 else "Needs Support")
        
        return {
            "current_difficulty": current_difficulty,
            "next_difficulty": next_diff,
            "performance_rating": rating,
            "ai_reasoning": reason,
            "calculated_score": int(accuracy * 0.7 + max(0, (20 - response_time)) * 1.5),
            "adaptation_params": {
                "objects_before": curr_params["objects"],
                "objects_after": next_params["objects"],
                "time_before": curr_params["time"],
                "time_after": next_params["time"],
                "difficulty_transition": f"{current_difficulty.upper()} → {next_diff.upper()}"
            }
        }

# Global singleton engine
adaptive_engine = AdaptiveDifficultyEngine()
