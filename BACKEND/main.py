import os
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import Optional

# Load environment variables
load_dotenv(override=True)

NASA_API_KEY = os.getenv("NASA_API_KEY", "DEMO_KEY")

app = FastAPI(title="NASA APOD API")

# Setup CORS to allow the frontend to interact with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production to specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class APODRequest(BaseModel):
    date: str # Format YYYY-MM-DD

@app.post("/api/apod")
async def get_apod(request: APODRequest):
    date = request.date
    if not date:
         raise HTTPException(status_code=400, detail="Date is required")

    url = f"https://api.nasa.gov/planetary/apod"
    api_key = os.getenv("NASA_API_KEY", "DEMO_KEY")
    params = {
        "api_key": api_key,
        "date": date
    }

    async with httpx.AsyncClient(verify=False) as client:
        try:
            response = await client.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            return data
        except httpx.HTTPError as e:
            raise HTTPException(status_code=response.status_code if hasattr(e, 'response') else 500, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail="An unexpected error occurred while fetching data from NASA API.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
