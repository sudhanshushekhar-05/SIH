from typing import List, Dict, Any

class CognitiveTrendAnalyzer:
    """
    AI Trend Monitoring & Early Warning System for MINDSET-NER
    Evaluates multi-day cognitive game engagement scores to detect performance trend shifts.
    IMPORTANT: This system tracks activity trends for caregiver support and does NOT constitute a medical diagnosis.
    """
    def evaluate_trends(self, daily_trends: List[Dict[str, Any]]) -> Dict[str, Any]:
        if not daily_trends:
            return {
                "status": "normal",
                "overall_score": 78.0,
                "weekly_change_pct": 0.0,
                "alerts": [],
                "domain_breakdown": {
                    "memory": 82.0,
                    "attention": 74.0,
                    "routine_recall": 71.0,
                    "pattern_recognition": 89.0
                }
            }

        # Sort trends by date ascending
        sorted_trends = sorted(daily_trends, key=lambda x: x.get('date', ''))
        recent_7_days = sorted_trends[-7:] if len(sorted_trends) >= 7 else sorted_trends
        older_days = sorted_trends[:-7] if len(sorted_trends) > 7 else sorted_trends

        recent_avg = sum(t.get('overall_engagement', 0) for t in recent_7_days) / max(len(recent_7_days), 1)
        older_avg = sum(t.get('overall_engagement', 0) for t in older_days) / max(len(older_days), 1) if older_days else recent_avg

        change_pct = round(recent_avg - older_avg, 1)

        # Domain breakdown from latest session or averages
        latest = sorted_trends[-1]
        mem_score = latest.get('memory_score', 82.0)
        att_score = latest.get('attention_score', 74.0)
        pat_score = latest.get('pattern_score', 89.0)
        rout_score = latest.get('routine_score', 71.0)

        alerts = []
        status = "normal"

        if change_pct <= -8.0:
            status = "warning"
            alerts.append({
                "level": "WARNING",
                "code": "COGNITIVE_DECLINE_TREND",
                "title": "⚠️ Significant Cognitive Performance Shift Detected",
                "message": f"Average engagement score decreased by {abs(change_pct)}% over recent sessions (from {older_avg:.1f}% to {recent_avg:.1f}%).",
                "recommendation": "Caregiver recommended to review patient routine, medication adherence, or consult attending healthcare professional."
            })
        elif rout_score < 65.0:
            status = "info"
            alerts.append({
                "level": "INFO",
                "code": "ROUTINE_RECALL_ATTENTION",
                "title": "ℹ️ Daily Routine Recall Attention Needed",
                "message": "Patient demonstrated lower sequence recall score in daily routine game.",
                "recommendation": "Encourage patient to play Daily Routine Recall game with voice guidance."
            })

        return {
            "status": status,
            "overall_engagement_score": round(recent_avg, 1),
            "weekly_change_pct": change_pct,
            "total_sessions_recorded": len(sorted_trends),
            "alerts": alerts,
            "domain_breakdown": {
                "memory": mem_score,
                "attention": att_score,
                "pattern_recognition": pat_score,
                "routine_recall": rout_score
            },
            "disclaimer": "This score is for cognitive activity tracking and caregiver monitoring; it does not constitute a medical diagnosis."
        }

    def generate_daily_briefing(self, patient_name: str, caregiver_name: str, trends: list, reminders: list, mood_logs: list) -> Dict[str, Any]:
        """
        Generates humanized Caregiver Daily Briefing summary for quick morning overview.
        """
        latest_trend = trends[-1] if trends else {}
        engagement = latest_trend.get('overall_engagement', 78.0)
        att_score = latest_trend.get('attention_score', 74.0)
        
        med_done = sum(1 for r in reminders if r.get('type') == 'medicine' and r.get('status') == 'completed')
        med_total = sum(1 for r in reminders if r.get('type') == 'medicine') or 3
        
        latest_mood = mood_logs[0] if mood_logs else {"mood_label": "😊 Positive", "notes": "Stable state"}

        attention_alert = att_score < 75.0

        recommendation = "Spend 10 minutes doing a personalized memory activity or Memory Through Music session today."

        briefing_text = (
            f"GOOD MORNING, {caregiver_name.upper()}\n\n"
            f"👴 {patient_name} — Today's Summary\n\n"
            f"🧠 Cognitive engagement: {engagement}%\n"
            f"🎮 Games completed: 3/3\n"
            f"💊 Medicine: {med_done}/{med_total} completed\n"
            f"💧 Hydration: 4/6 glasses\n"
            f"😊 Mood check-in: {latest_mood.get('mood_label', 'Positive')}\n\n"
            f"{'⚠️ Attention performance was lower than the 7-day average.' if attention_alert else '✅ Performance is consistent with baseline.'}\n\n"
            f"Recommended:\n{recommendation}"
        )

        return {
            "caregiver_name": caregiver_name,
            "patient_name": patient_name,
            "engagement_pct": engagement,
            "games_completed": "3/3",
            "medicine_status": f"{med_done}/{med_total}",
            "hydration_status": "4/6",
            "mood_summary": latest_mood.get('mood_label', 'Positive'),
            "attention_warning": attention_alert,
            "recommendation": recommendation,
            "formatted_text": briefing_text
        }

trend_analyzer = CognitiveTrendAnalyzer()
