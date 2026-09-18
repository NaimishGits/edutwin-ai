from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from .config import get_settings

settings = get_settings()
client = AsyncIOMotorClient(settings.mongodb_uri)
db: AsyncIOMotorDatabase = client[settings.database_name]


async def create_indexes() -> None:
    await db.users.create_index("email", unique=True)
    await db.skills.create_index([("user_id", 1), ("name", 1)])
    await db.academic_records.create_index([("user_id", 1), ("created_at", -1)])
    await db.roadmap_items.create_index([("user_id", 1), ("position", 1)])
