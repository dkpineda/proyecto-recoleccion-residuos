# services/neightborhood_service.py
from sqlalchemy.orm import Session
from models.neighborhood import Neighborhood
from typing import List
from datetime import datetime

def get_neighborhood(
    db: Session,
    location_id: str = None,
    name: str =None
) -> List[Neighborhood]:
    query = db.query(Neighborhood)

    if location_id:
        query = query.filter(Neighborhood.location_id == location_id)
    if name:
        query = query.filter(Neighborhood.name == name)

    return query.all()
