from collections.abc import Iterable


CAREER_SKILLS = {
    "software developer": {"python", "java", "javascript", "react", "sql", "git", "dsa"},
    "data scientist": {"python", "sql", "statistics", "pandas", "numpy", "machine learning"},
    "data analyst": {"sql", "excel", "python", "pandas", "power bi", "statistics"},
    "web developer": {"html", "css", "javascript", "react", "node.js", "git"},
    "ai/ml engineer": {"python", "numpy", "pandas", "machine learning", "scikit-learn", "statistics"},
}


def normalize(value: str) -> str:
    return value.strip().lower()


def get_required_skills(career_goal: str | None) -> set[str]:
    goal = normalize(career_goal or "")
    for career, skills in CAREER_SKILLS.items():
        if goal and (career in goal or goal in career):
            return skills
    return set()


def build_insights(profile: dict, skills: Iterable[dict]) -> dict:
    skills = list(skills)
    known_skills = {normalize(skill["name"]) for skill in skills}
    required_skills = get_required_skills(profile.get("career_goal"))
    missing_skills = sorted(required_skills - known_skills)
    strengths = [skill["name"] for skill in skills if skill.get("level", 0) >= 75]
    improvements: list[str] = []

    if (profile.get("attendance") or 0) < 75:
        improvements.append("Improve attendance to at least 75%.")
    if (profile.get("assignment_completion") or 0) < 80:
        improvements.append("Complete at least 80% of assignments consistently.")
    if (profile.get("study_hours_per_day") or 0) < 2:
        improvements.append("Build a regular study routine of at least 2 hours a day.")
    if missing_skills:
        improvements.append("Focus on career-relevant skill gaps: " + ", ".join(missing_skills[:3]) + ".")

    readiness_parts = [
        min(max(profile.get("attendance") or 0, 0), 100) * 0.20,
        min(max(profile.get("assignment_completion") or 0, 0), 100) * 0.15,
        min(max((profile.get("cgpa") or 0) * 10, 0), 100) * 0.25,
        (sum(skill.get("level", 0) for skill in skills) / len(skills) if skills else 0) * 0.25,
        min((profile.get("coding_problems_per_month") or 0) * 2, 100) * 0.15,
    ]
    readiness_score = round(sum(readiness_parts))

    roadmap = []
    for position, skill in enumerate(missing_skills[:4], start=1):
        roadmap.append({"position": position, "title": f"Strengthen {skill.title()}", "priority": "High", "status": "Not started", "duration": "2 weeks"})
    for improvement in improvements:
        if len(roadmap) >= 6:
            break
        roadmap.append({"position": len(roadmap) + 1, "title": improvement, "priority": "Medium", "status": "Not started", "duration": "1-2 weeks"})

    return {
        "readiness_score": readiness_score,
        "strengths": strengths,
        "skill_gaps": missing_skills,
        "recommendations": improvements or ["Maintain your current learning routine and update your profile regularly."],
        "suggested_roadmap": roadmap,
        "engine": "rule-based-v1",
    }
