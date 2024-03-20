from fastapi import FastAPI
from pydantic import BaseModel
from quantum import call_api

app = FastAPI()

class AnyData(BaseModel):
    pass

@app.post("/receive-json/")
async def receive_json(data: AnyData):
    call_api()
    return {"message": "Task completed"}