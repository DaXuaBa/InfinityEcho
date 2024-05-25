from fastapi import FastAPI
from backend.router import router_tweet
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

list_router = [
    router_tweet.router
]

for router in list_router: 
    app.include_router(router) 

@app.get("/")
async def read_root():
    return {"message": "Hello, my name is Back!"}

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
