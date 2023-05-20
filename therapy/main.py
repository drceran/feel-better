from fastapi import FastAPI
from routers import appointments, jotters, resources, journals

app = FastAPI()

app.include_router(appointments.router)
app.include_router(jotters.router)
app.include_router(resources.router)
app.include_router(journals.router)
