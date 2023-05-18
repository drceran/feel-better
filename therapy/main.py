from fastapi import FastAPI
from routers import appointments


app = FastAPI()

# app.include_router(appointments.router)
