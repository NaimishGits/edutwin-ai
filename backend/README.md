# EduTwin AI backend

## Setup

1. Create a MongoDB Atlas cluster and database user, then allow your IP address in Atlas Network Access.
2. In this `backend` folder, copy `.env.example` to `.env` and set `MONGODB_URI` and a long `JWT_SECRET_KEY`.
3. Create and activate a virtual environment:

   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   ```

4. Run the API:

   ```powershell
   uvicorn app.main:app --reload
   ```

Open `http://127.0.0.1:8000/docs` for the interactive API documentation.

## Current endpoints

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/me`
- `PUT /api/profile`
- `POST/GET /api/academics`
- `POST/GET /api/skills`, `PATCH/DELETE /api/skills/{skill_id}`
- `GET /api/insights`, `GET /api/dashboard`

`GET /api/insights` uses an explainable rule-based scoring engine for now. Pandas and NumPy are listed in `requirements.txt` for the future ML data pipeline: dataset cleaning, feature preparation, model training, and evaluation.
