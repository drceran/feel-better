from fastapi import FastAPI
from routers import jotters


app = FastAPI()
app.include_router(jotters.router)
