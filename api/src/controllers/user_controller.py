# controllers/user_controller.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from services.user_service import get_user
from database.connection import get_db
from typing import Optional
from datetime import datetime

router = APIRouter()

@router.get("/")
def get_users(
    number: Optional[int] = None,
    name: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return get_user(db, number, name)


