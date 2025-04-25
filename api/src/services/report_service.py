# services/report_service.py
from sqlalchemy.orm import Session
from models.report import Report
from typing import List
from datetime import datetime

def get_report(
    db: Session,
    user_id: int = None,
    waste_type: str = None,
    date_star: datetime = None,
    date_end: datetime = None
) -> List[Report]:
    query = db.query(Report)

    if user_id:
        query = query.filter(Report.user_id == user_id)
    if waste_type:
        query = query.filter(Report.waste_type == waste_type)
    if date_star and date_end:
        query = query.filter(Report.date.between(date_star, date_end))

    return query.all()
