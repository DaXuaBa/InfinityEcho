from backend.db.database import get_db
from sqlalchemy.orm import Session
from backend.db.db_tweet import *
from backend.schemas import *
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

router = APIRouter(
    prefix='/tweet',
    tags=['tweet']
)

@router.get('/all', response_model=List[TweetDisplay])
def get_all_tweet_router(db: Session = Depends(get_db)):
    return get_all(db)
