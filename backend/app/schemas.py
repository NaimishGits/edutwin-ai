from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ProfileUpdate(BaseModel):
    full_name: str | None = Field(default=None, min_length=2, max_length=100)
    college: str | None = Field(default=None, max_length=200)
    course: str | None = Field(default=None, max_length=100)
    semester: int | None = Field(default=None, ge=1, le=20)
    cgpa: float | None = Field(default=None, ge=0, le=10)
    attendance: float | None = Field(default=None, ge=0, le=100)
    study_hours_per_day: float | None = Field(default=None, ge=0, le=24)
    assignment_completion: float | None = Field(default=None, ge=0, le=100)
    coding_problems_per_month: int | None = Field(default=None, ge=0)
    career_goal: str | None = Field(default=None, max_length=150)
    interests: list[str] | None = None


class AcademicRecordCreate(BaseModel):
    subject: str = Field(min_length=1, max_length=100)
    score: float = Field(ge=0, le=100)
    maximum_score: float = Field(default=100, gt=0)
    attendance: float | None = Field(default=None, ge=0, le=100)
    assignment_completion: float | None = Field(default=None, ge=0, le=100)
    recorded_on: datetime | None = None

class AcademicRecordUpdate(BaseModel):
    subject: str | None = Field(default=None, min_length=1, max_length=100)
    score: float | None = Field(default=None, ge=0, le=100)
    maximum_score: float | None = Field(default=None, gt=0)
    attendance: float | None = Field(default=None, ge=0, le=100)
    assignment_completion: float | None = Field(default=None, ge=0, le=100)    


class SkillCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    category: str = Field(min_length=1, max_length=100)
    level: int = Field(ge=0, le=100)


class SkillUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=100)
    category: str | None = Field(default=None, min_length=1, max_length=100)
    level: int | None = Field(default=None, ge=0, le=100)

class RoadmapProgressUpdate(BaseModel):
    completed_titles: list[str] = []