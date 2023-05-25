from fastapi import FastAPI
from routers import appointments, jotters, resources, journals, messages, accounts, chat
from authenticator import authenticator
from routers import accounts
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.include_router(appointments.router)
app.include_router(jotters.router)
app.include_router(resources.router)
app.include_router(messages.router)
app.include_router(journals.router)
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(chat.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
