from fastapi import FastAPI
from backend.db import model
from backend.db.database import engine
from backend.router import router_tweet
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

list_router = [
    router_tweet.router
]

for router in list_router: 
    app.include_router(router,prefix="/sys-be") 

@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI!"}

model.Base.metadata.create_all(bind=engine)

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
