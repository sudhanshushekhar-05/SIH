import unittest
from fastapi.testclient import TestClient
from backend.main import app

class TestMindsetNerBackend(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_health_check(self):
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "online")
        self.assertTrue(data["ner_region_enabled"])

    def test_adaptive_difficulty_ai(self):
        # Test performance evaluation for high accuracy
        payload = {
            "accuracy": 95.0,
            "response_time": 4.5,
            "mistake_count": 0,
            "current_difficulty": "Medium"
        }
        response = self.client.post("/api/ai/adaptive-difficulty", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("next_difficulty", data)
        self.assertIn("ai_reasoning", data)

    def test_voice_nlp_intent(self):
        # Test medicine query
        payload = {
            "user_id": "p001",
            "query_text": "मेरी दवाई का समय कब है?"
        }
        response = self.client.post("/api/ai/voice-intent", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["detected_intent"], "MEDICINE_REMINDER")

        # Test daughter name personal memory query
        payload_daughter = {
            "user_id": "p001",
            "query_text": "मेरी बेटी का नाम क्या है?"
        }
        resp_daughter = self.client.post("/api/ai/voice-intent", json=payload_daughter)
        self.assertEqual(resp_daughter.status_code, 200)
        data_d = resp_daughter.json()
        self.assertIn("Ananya", data_d["speech_response"])

    def test_caregiver_dashboard_analytics(self):
        response = self.client.get("/api/caregiver/dashboard/p001")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("patient", data)
        self.assertIn("analytics", data)
        self.assertIn("domain_breakdown", data["analytics"])

    def test_caregiver_daily_briefing(self):
        response = self.client.get("/api/caregiver/briefing/p001")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("formatted_text", data)
        self.assertIn("engagement_pct", data)

    def test_digital_memory_book_api(self):
        # GET memory book items
        response = self.client.get("/api/memory-book/p001")
        self.assertEqual(response.status_code, 200)
        items = response.json()
        self.assertIsInstance(items, list)

        # POST new memory book item
        new_item = {
            "user_id": "p001",
            "category": "family",
            "title": "Grandson Aarav",
            "relationship": "Grandson",
            "last_met_date": "Yesterday",
            "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
        }
        res_post = self.client.post("/api/memory-book", json=new_item)
        self.assertEqual(res_post.status_code, 200)
        self.assertEqual(res_post.json()["status"], "created")

    def test_mood_check_in_api(self):
        payload = {
            "user_id": "p001",
            "mood_level": "good",
            "mood_label": "😊 Good / Happy",
            "notes": "Enjoyed morning garden walk"
        }
        response = self.client.post("/api/mood/check-in", json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "recorded")

    def test_music_and_family_connect_api(self):
        res_music = self.client.get("/api/music/tracks")
        self.assertEqual(res_music.status_code, 200)

        res_family = self.client.get("/api/family/posts/p001")
        self.assertEqual(res_family.status_code, 200)

    def test_ai_brain_analysis(self):
        response = self.client.get("/api/ai/brain-analysis/p001")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("feature_vector", data)
        self.assertIn("ai_decision", data)

    def test_offline_sync(self):
        payload = {
            "game_sessions": [
                {
                    "session_id": "sync_test_01",
                    "user_id": "p001",
                    "game_type": "local_ner",
                    "score": 95,
                    "accuracy": 95.0,
                    "response_time": 3.8,
                    "difficulty": "Medium",
                    "mistake_count": 0
                }
            ]
        }
        response = self.client.post("/api/sync", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "success")

    def test_security_headers_present(self):
        """Verify OWASP and GIGW 3.0 required security headers are injected."""
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers.get("x-frame-options"), "SAMEORIGIN")
        self.assertEqual(response.headers.get("x-content-type-options"), "nosniff")
        self.assertEqual(response.headers.get("x-xss-protection"), "1; mode=block")
        self.assertIn("Content-Security-Policy", response.headers)
        self.assertIn("Strict-Transport-Security", response.headers)

    def test_user_id_validation_sanitization(self):
        """Verify user_id format enforcement blocks path traversal or injection characters."""
        # Valid user_id
        res_valid = self.client.get("/api/user/p001")
        self.assertEqual(res_valid.status_code, 200)

        # Invalid user_id with unsafe injection characters
        res_invalid = self.client.get("/api/user/p001<script>")
        self.assertEqual(res_invalid.status_code, 400)
        self.assertIn("Invalid user ID format", res_invalid.json()["detail"])

    def test_retrain_rate_limiting(self):
        """Verify that rapid consecutive calls to /api/ai/retrain return HTTP 429 Too Many Requests."""
        # First call triggers training or cooldown
        res1 = self.client.post("/api/ai/retrain")
        # Second immediate call must be blocked by rate limiter
        res2 = self.client.post("/api/ai/retrain")
        self.assertEqual(res2.status_code, 429)
        self.assertIn("Rate limit exceeded", res2.json()["detail"])

if __name__ == "__main__":
    unittest.main()
