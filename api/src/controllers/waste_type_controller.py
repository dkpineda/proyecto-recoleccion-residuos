# controllers/waste_type_controller.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from services.waste_type_service import get_waste_type
from database.connection import get_db
from typing import Optional
from datetime import datetime

router = APIRouter()

@router.get("/")
def get_waste_types(
    id: Optional[int] = None,
    name: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return get_waste_type(db, id, name)


