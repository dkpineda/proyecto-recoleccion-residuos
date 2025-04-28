from sqlalchemy.orm import Session
from models.waste_type import Waste_Type
from typing import List
from datetime import datetime

def get_waste_type(
    db: Session,
    id: int = None,
    name: str =None
) -> List[Waste_Type]:
    query = db.query(Waste_Type)
    if id:
        query = query.filter(Waste_Type.id == id)
    if name:
        query = query.filter(Waste_Type.name == name)

    return query.all()
