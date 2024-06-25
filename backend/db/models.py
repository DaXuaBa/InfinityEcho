from sqlalchemy import Column, Integer, DateTime, Text, String
from sqlalchemy.sql import func
from backend.db.database import Base

class BidenDatasetStatus(Base):
    __tablename__ = 'BIDENDATASETSTATUS'
    id = Column(Integer, primary_key=True, autoincrement=True)
    dataset_id = Column(String(255), nullable=False)
    status = Column(Integer, default=0)

class TrumpDatasetStatus(Base):
    __tablename__ = 'TRUMPDATASETSTATUS'
    id = Column(Integer, primary_key=True, autoincrement=True)
    dataset_id = Column(String(255), nullable=False)
    status = Column(Integer, default=0)

class BidenTweetData(Base):
    __tablename__ = 'BIDENTWEETDATA'
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime)
    tweet_id = Column(String(255))
    tweet = Column(Text)    
    source = Column(String(255))
    likes = Column(Integer)
    retweet_count = Column(Integer)
    user_id = Column(String(255))
    user_name = Column(String(255))
    user_screen_name = Column(String(255))
    user_description = Column(Text)
    user_join_date = Column(DateTime)
    user_followers_count = Column(Integer)
    user_location = Column(String(255))
    latitude = Column(String(255))
    longitude = Column(String(255))
    state_1 = Column(String(255))
    state_2 = Column(String(255))
    country = Column(String(255))
    status = Column(Integer, default=0)

class TrumpTweetData(Base):
    __tablename__ = 'TRUMPTWEETDATA'
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime)
    tweet_id = Column(String(255))
    tweet = Column(Text)
    source = Column(String(255))
    likes = Column(Integer)
    retweet_count = Column(Integer)
    user_id = Column(String(255))
    user_name = Column(String(255))
    user_screen_name = Column(String(255))
    user_description = Column(Text)
    user_join_date = Column(DateTime)
    user_followers_count = Column(Integer)
    user_location = Column(String(255))
    latitude = Column(String(255))
    longitude = Column(String(255))
    state_1 = Column(String(255))
    state_2 = Column(String(255))
    country = Column(String(255))
    status = Column(Integer, default=0)

class Summary(Base):
    __tablename__ = 'SUMMARY'
    SUMMARY_ID = Column(Integer, primary_key=True, autoincrement=True)
    SUMMARY = Column(Text)
    CREATED_AT = Column(DateTime, default=func.now())
