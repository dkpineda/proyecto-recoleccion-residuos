# controllers/report_controller.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from services.report_service import get_report
from database.connection import get_db
from typing import Optional
from datetime import datetime

router = APIRouter()

@router.get("/")
def get_reports(
    user_id: Optional[int] = None,
    waste_type: Optional[str] = None,
    date_star: Optional[datetime] = None,
    date_end: Optional[datetime] = None,
    db: Session = Depends(get_db)
):
    return get_report(db, user_id, waste_type, date_star, date_end)


