from fastapi import FastAPI
from backend.db import models
from backend.db.database import engine
from backend.router import router_tweet
from backend.router.job_update import *
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

list_router = [
    router_tweet.router
]

for router in list_router: 
    app.include_router(router) 

@app.get("/")
async def index():
    return "Một bông hoa đẹp, không nên thuộc về một kẻ chỉ biết ngắm chứ không biết chăm"

models.Base.metadata.create_all(bind=engine)

app.add_event_handler("startup", start_scheduler)
app.add_event_handler("shutdown", shutdown_scheduler)

origins = [
    'http://localhost:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)
