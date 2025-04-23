import os
from datetime import timedelta
from typing import Annotated, Dict

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.connection import get_db
from schemas.user import LoginRequest, UserCreate, UserInDB
from services.auth_service import AuthService

router = APIRouter()

ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")

@router.post("/register", response_model=UserInDB)
def register(
    user: UserCreate,
    db: Annotated[Session, Depends(get_db)]
) -> UserInDB:
    """Register a new user."""
    auth_service = AuthService(db)
    return auth_service.register_user(user)

@router.post("/login")
def login(
    form_data: LoginRequest,
    db: Annotated[Session, Depends(get_db)]
) -> Dict[str, str | UserInDB]:
    """Login and get access token."""
    auth_service = AuthService(db)

    user = auth_service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=float(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = auth_service.create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": UserInDB.from_orm(user)
    }
