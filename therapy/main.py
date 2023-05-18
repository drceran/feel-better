from fastapi import FastAPI
from routers import appointments, jotters


app = FastAPI()

app.include_router(appointments.router)
app.include_router(jotters.router)
