from sqlalchemy import Column, Integer, DateTime, Text
from sqlalchemy.sql import func
from backend.db.database import Base

class Summary(Base):
    __tablename__ = 'SUMMARY'
    SUMMARY_ID = Column(Integer, primary_key=True, autoincrement=True)
    SUMMARY = Column(Text)
    CREATED_AT = Column(DateTime, default=func.now())
