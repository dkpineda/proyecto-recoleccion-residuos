from sqlalchemy.orm import Session
from models.user import User
from typing import List
from datetime import datetime

def get_user(
    db: Session,
    user_id: str = None,
    firstname: str = None,
    lastname: datetime = None,
    email: datetime = None
) -> List[User]:
    query = db.query(User)

    if user_id:
        query = query.filter(User.user_id == user_id)
    if firstname:
        query = query.filter(User.firstname == firstname)
    if lastname :
        query = query.filter(User.lastname == lastname)
    if email:
        query = query.filter(User.email == email)

    return query.all()
