# services/location_service.py
from sqlalchemy.orm import Session
from models.location import Location
from typing import List
from datetime import datetime

def get_location(
    db: Session,
    number: int = None,
    name: str =None
) -> List[Location]:
    query = db.query(Location)

    if number:
        query = query.filter(Location.number == number)
    if name:
        query = query.filter(Location.name == name)

    return query.all()
