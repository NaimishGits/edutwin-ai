import json

from google import genai
from google.genai import types
from pydantic import BaseModel, Field

from .config import get_settings


class PredictionResult(BaseModel):
    career_readiness_score: int = Field(ge=0, le=100)
    readiness_level: str
    strengths: list[str]
    skill_gaps: list[str]
    recommended_next_steps: list[str]
    summary: str
    disclaimer: str


def generate_gemini_prediction(
    profile: dict,
    skills: list[dict],
    academic_records: list[dict],
) -> PredictionResult:
    settings = get_settings()

    if not settings.gemini_api_key:
        raise ValueError("GEMINI_API_KEY is missing from .env")

    safe_profile = {
        "full_name": profile.get("full_name", ""),
        "course": profile.get("course", ""),
        "semester": profile.get("semester", ""),
        "college": profile.get("college", ""),
        "cgpa": profile.get("cgpa"),
        "attendance": profile.get("attendance"),
        "study_hours_per_day": profile.get("study_hours_per_day"),
        "assignment_completion": profile.get("assignment_completion"),
        "coding_problems_per_month": profile.get("coding_problems_per_month"),
        "interests": profile.get("interests", []),
        "career_goal": profile.get("career_goal", ""),
    }

    safe_skills = [
        {
            "name": skill.get("name", ""),
            "level": skill.get("level", 0),
        }
        for skill in skills
    ]

    safe_academics = [
        {
            "subject": record.get("subject", ""),
            "marks": record.get("marks"),
            "attendance": record.get("attendance"),
        }
        for record in academic_records
    ]

    prompt = f"""
You are EduTwin AI, an academic and career guidance assistant.

Analyse this student's profile and provide constructive, practical,
non-medical and non-guaranteed career-readiness guidance.

Student profile:
{json.dumps(safe_profile)}

Skills:
{json.dumps(safe_skills)}

Academic records:
{json.dumps(safe_academics)}

Rules:
- career_readiness_score must be an integer from 0 to 100.
- Give 3 to 5 strengths.
- Give 3 to 5 skill gaps.
- Give 3 to 5 specific next steps.
- Do not claim certainty or guarantee employment.
- Keep the summary concise and encouraging.
- Set disclaimer to: "This is AI-assisted guidance, not a guaranteed career prediction."
"""

    client = genai.Client(api_key=settings.gemini_api_key)

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=PredictionResult,
        ),
    )

    return PredictionResult.model_validate_json(response.text)