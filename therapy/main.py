from fastapi import FastAPI
from routers import (
    appointments,
    jotters,
    resources,
    journals,
    messages,
    accounts,
    chat,
)
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get(
            "CORS_HOST",
            "http://localhost:3000"
        ),
        "https://team-feeling-good.gitlab.io",
        "https://feb-23-pt-13-therapy.mod3projects.com",
        "localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(appointments.router)
app.include_router(jotters.router)
app.include_router(resources.router)
app.include_router(messages.router)
app.include_router(journals.router)
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(chat.router)


@app.get("/")
def launch_details():
    return {
        "launch_details": {
            "year": 2023,
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
            "tz": "PST",
        }
    }
