from contextlib import asynccontextmanager
from datetime import datetime, timezone

from bson import ObjectId
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pymongo import ReturnDocument

from .config import get_settings
from .database import create_indexes, db
from .dependencies import get_current_user
from .schemas import (AcademicRecordCreate,AcademicRecordUpdate, LoginRequest, ProfileUpdate, RegisterRequest,RoadmapProgressUpdate,
                      SkillCreate, SkillUpdate, TokenResponse)
from .security import create_access_token, hash_password, verify_password
from .services import build_insights

from starlette.concurrency import run_in_threadpool
from .ai_prediction import generate_gemini_prediction


def serialize(document: dict | None) -> dict | None:
    if document is None:
        return None

    document = document.copy()
    document["id"] = str(document.pop("_id"))
    return document


@asynccontextmanager
async def lifespan(_: FastAPI):
    await create_indexes()
    yield


app = FastAPI(title="EduTwin AI API", version="0.1.0", lifespan=lifespan)

@app.get("/")
async def root():
    return {
        "message": "EduTwin AI backend is running",
        "docs": "/docs",
        "health": "/health",
    }
app.add_middleware(
    CORSMiddleware,
    allow_origins=[get_settings().frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    await db.command("ping")
    return {"status": "ok"}


@app.post("/api/auth/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(payload: RegisterRequest):
    if await db.users.find_one({"email": payload.email.lower()}):
        raise HTTPException(status_code=409, detail="An account with this email already exists")
    now = datetime.now(timezone.utc)
    result = await db.users.insert_one({
        "full_name": payload.full_name.strip(), "email": payload.email.lower(),
        "password_hash": hash_password(payload.password), "created_at": now, "updated_at": now,
    })
    return TokenResponse(access_token=create_access_token(str(result.inserted_id)))


@app.post("/api/auth/login", response_model=TokenResponse)
async def login(payload: LoginRequest):
    user = await db.users.find_one({"email": payload.email.lower()})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    return TokenResponse(access_token=create_access_token(str(user["_id"])))


@app.get("/api/me")
async def get_me(user: dict = Depends(get_current_user)):
    return serialize(user)


@app.put("/api/profile")
async def update_profile(payload: ProfileUpdate, user: dict = Depends(get_current_user)):
    changes = payload.model_dump(exclude_none=True)
    if "full_name" in changes:
        changes["full_name"] = changes["full_name"].strip()
    changes["updated_at"] = datetime.now(timezone.utc)
    await db.users.update_one({"_id": user["_id"]}, {"$set": changes})
    return serialize(await db.users.find_one({"_id": user["_id"]}))


@app.post("/api/academics", status_code=status.HTTP_201_CREATED)
async def create_academic_record(payload: AcademicRecordCreate, user: dict = Depends(get_current_user)):
    record = payload.model_dump()
    record.update({"user_id": str(user["_id"]), "created_at": datetime.now(timezone.utc)})
    result = await db.academic_records.insert_one(record)
    return serialize(await db.academic_records.find_one({"_id": result.inserted_id}))


@app.get("/api/academics")
async def list_academic_records(user: dict = Depends(get_current_user)):
    records = await db.academic_records.find({"user_id": str(user["_id"])}).sort("created_at", -1).to_list(200)
    return [serialize(record) for record in records]

@app.patch("/api/academics/{record_id}")
async def update_academic_record(
    record_id: str,
    payload: AcademicRecordUpdate,
    user: dict = Depends(get_current_user),
):
    if not ObjectId.is_valid(record_id):
        raise HTTPException(status_code=400, detail="Invalid academic record id")

    changes = payload.model_dump(exclude_none=True)

    if not changes:
        raise HTTPException(
            status_code=400,
            detail="Provide at least one field to update",
        )

    updated_record = await db.academic_records.find_one_and_update(
        {
            "_id": ObjectId(record_id),
            "user_id": str(user["_id"]),
        },
        {
            "$set": changes,
        },
        return_document=ReturnDocument.AFTER,
    )

    if not updated_record:
        raise HTTPException(status_code=404, detail="Academic record not found")

    return serialize(updated_record)


@app.delete("/api/academics/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_academic_record(
    record_id: str,
    user: dict = Depends(get_current_user),
):
    if not ObjectId.is_valid(record_id):
        raise HTTPException(status_code=400, detail="Invalid academic record id")

    result = await db.academic_records.delete_one(
        {
            "_id": ObjectId(record_id),
            "user_id": str(user["_id"]),
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Academic record not found")





@app.post("/api/skills", status_code=status.HTTP_201_CREATED)
async def create_skill(payload: SkillCreate, user: dict = Depends(get_current_user)):
    skill = payload.model_dump()
    skill.update({"user_id": str(user["_id"]), "created_at": datetime.now(timezone.utc)})
    result = await db.skills.insert_one(skill)
    return serialize(await db.skills.find_one({"_id": result.inserted_id}))


@app.get("/api/skills")
async def list_skills(user: dict = Depends(get_current_user)):
    skills = await db.skills.find({"user_id": str(user["_id"])}).sort("name", 1).to_list(200)
    return [serialize(skill) for skill in skills]


@app.patch("/api/skills/{skill_id}")
async def update_skill(skill_id: str, payload: SkillUpdate, user: dict = Depends(get_current_user)):
    if not ObjectId.is_valid(skill_id):
        raise HTTPException(status_code=400, detail="Invalid skill id")
    result = await db.skills.find_one_and_update(
        {"_id": ObjectId(skill_id), "user_id": str(user["_id"])},
        {"$set": payload.model_dump(exclude_none=True)}, return_document=ReturnDocument.AFTER,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Skill not found")
    return serialize(result)


@app.delete("/api/skills/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_skill(skill_id: str, user: dict = Depends(get_current_user)):
    if not ObjectId.is_valid(skill_id):
        raise HTTPException(status_code=400, detail="Invalid skill id")
    result = await db.skills.delete_one({"_id": ObjectId(skill_id), "user_id": str(user["_id"])})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Skill not found")


@app.get("/api/insights")
async def get_insights(user: dict = Depends(get_current_user)):
    skills = await db.skills.find({"user_id": str(user["_id"])}).to_list(200)
    return build_insights(user, skills)

@app.get("/api/roadmap-progress")
async def get_roadmap_progress(user: dict = Depends(get_current_user)):
    progress = await db.roadmap_progress.find_one(
        {"user_id": str(user["_id"])}
    )

    if not progress:
        return {
            "completed_titles": [],
        }

    return {
        "completed_titles": progress.get("completed_titles", []),
    }


@app.put("/api/roadmap-progress")
async def update_roadmap_progress(
    payload: RoadmapProgressUpdate,
    user: dict = Depends(get_current_user),
):
    await db.roadmap_progress.update_one(
        {"user_id": str(user["_id"])},
        {
            "$set": {
                "completed_titles": payload.completed_titles,
                "updated_at": datetime.now(timezone.utc),
            }
        },
        upsert=True,
    )

    return {
        "completed_titles": payload.completed_titles,
    }

@app.post("/api/predictions/gemini")
async def gemini_prediction(
    current_user: dict = Depends(get_current_user),
):
    user_id = str(current_user["_id"])

    skills = await db.skills.find(
        {"user_id": user_id}
    ).to_list(length=100)

    academic_records = await db.academic_records.find(
        {"user_id": user_id}
    ).to_list(length=100)

    try:
        prediction = await run_in_threadpool(
            generate_gemini_prediction,
            current_user,
            skills,
            academic_records,
        )

        return prediction.model_dump()

    except ValueError as error:
        raise HTTPException(status_code=500, detail=str(error))

    except Exception as error:
        print(f"Gemini prediction error: {type(error).__name__}: {error}")

        raise HTTPException(
             status_code=503,
            detail=f"Gemini prediction service is temporarily unavailable: {error}",
        )

@app.get("/api/dashboard")
async def get_dashboard(user: dict = Depends(get_current_user)):
    skills = await db.skills.find({"user_id": str(user["_id"])}).to_list(200)
    records = await db.academic_records.find({"user_id": str(user["_id"])}).sort("created_at", -1).to_list(10)
    return {"profile": serialize(user), "skills": [serialize(skill) for skill in skills], "recent_academics": [serialize(record) for record in records], "insights": build_insights(user, skills)}

