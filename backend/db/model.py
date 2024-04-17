from backend.db.database import Base
from sqlalchemy import Column
from sqlalchemy.sql.sqltypes import Integer, String

class Tweet(Base):
    __tablename__='Tweet'
    id= Column(Integer, primary_key=True, autoincrement=True)
    batch_no = Column(Integer)
    state_code = Column(String(100))
    total = Column(Integer)
    name= Column(String(100))