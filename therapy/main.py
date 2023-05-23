from fastapi import FastAPI
from routers import appointments, jotters, resources, journals, messages
from authenticator import authenticator
from routers import accounts


app = FastAPI()

app.include_router(appointments.router)
app.include_router(jotters.router)
app.include_router(resources.router)
app.include_router(messages.router)
app.include_router(journals.router)
app.include_router(authenticator.router)
app.include_router(accounts.router)
