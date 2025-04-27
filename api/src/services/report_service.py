# services/report_service.py
from sqlalchemy.orm import Session
from models.report import Report
from models.neighborhood import Neighborhood
from typing import List
from datetime import datetime
from sqlalchemy.orm import joinedload

def get_report(
    db: Session,
    user_id: str = None,
    waste_type: str = None,
    date_star: datetime = None,
    date_end: datetime = None,
    neighborhood_id: str =None
) -> List[Report]:
    query = db.query(Report).options(joinedload(Report.user), joinedload(Report.neighborhood).joinedload(Neighborhood.location))

    if user_id:
        query = query.filter(Report.user_id == user_id)
    if waste_type:
        query = query.filter(Report.waste_type == waste_type)
    if date_star and date_end:
        query = query.filter(Report.date.between(date_star, date_end))
    if neighborhood_id:
        query = query.filter(Report.neighborhood_id == neighborhood_id)

    return query.all()
