from pydantic import BaseModel

class TweetDisplay(BaseModel):
    id: int
    state_code: str
    total: int
    name:str
    class Config:
        from_attributes = True