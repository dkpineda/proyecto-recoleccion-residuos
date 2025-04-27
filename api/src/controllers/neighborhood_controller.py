# controllers/neighborhood_controller.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from services.neightborhood_servive import get_neighborhood
from database.connection import get_db
from typing import Optional
from datetime import datetime

router = APIRouter()

@router.get("/")
def get_neighborhoods(
    location_id: Optional[str] = None,
    name: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return get_neighborhood(db, location_id, name)
