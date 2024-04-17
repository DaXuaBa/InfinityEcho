from backend.db.model import Tweet
from sqlalchemy.orm.session import Session
from sqlalchemy import func

def get_all(db: Session):
    subquery = (
        db.query(Tweet.name, Tweet.state_code, func.max(Tweet.batch_no).label('max_batch_no'))
        .group_by(Tweet.name, Tweet.state_code)
        .subquery()
    )

    query = (
        db.query(Tweet)
        .join(subquery, (Tweet.name == subquery.c.name) & (Tweet.state_code == subquery.c.state_code) & (Tweet.batch_no == subquery.c.max_batch_no))
        .all()
    )
    return query