from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Any

from database.db import SessionLocal
from database.models import User
from schemas.user import UserCreate, UserUpdate, UserInDB
from core.security import get_password_hash, get_current_user

router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/me", response_model=UserInDB)
def read_users_me(
    current_user: User = Depends(get_current_user)
) -> Any:
    return current_user

@router.put("/me", response_model=UserInDB)
def update_user_me(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Any:
    # Update user data
    if user_update.email:
        setattr(current_user, "email", str(user_update.email))
    if user_update.first_name:
        setattr(current_user, "first_name", str(user_update.first_name))
    if user_update.last_name:
        setattr(current_user, "last_name", str(user_update.last_name))
    if user_update.password:
        setattr(current_user, "password", str(get_password_hash(user_update.password)))
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_me(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db.delete(current_user)
    db.commit() 