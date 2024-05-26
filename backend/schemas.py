from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SummaryBase(BaseModel):
    SUMMARY : Optional[str] =None
    CREATED_AT: Optional[datetime] =None 
    class Config:
        from_attributes = True