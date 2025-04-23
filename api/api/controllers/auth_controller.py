from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import Any

from database.connection import get_db
from services.auth_service import AuthService
from schemas.user import UserCreate, UserInDB, LoginRequest
from utils.security import ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter()

@router.post("/register", response_model=UserInDB)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
) -> Any:
    """Register a new user."""
    auth_service = AuthService(db)
    return auth_service.register_user(user)

@router.post("/login")
def login(
    form_data: LoginRequest,
    db: Session = Depends(get_db)
) -> Any:
    """Login and get access token."""
    auth_service = AuthService(db)
    
    user = auth_service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth_service.create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": UserInDB.from_orm(user)
    } 