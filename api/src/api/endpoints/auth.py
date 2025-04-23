from fastapi import APIRouter, Depends, HTTPException, status, Form
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import Any
from pydantic import BaseModel

from database.db import SessionLocal
from database.models import User
from schemas.user import UserCreate, UserInDB
from core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from core.validators import validate_password

router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/register", response_model=UserInDB)
def register(user: UserCreate, db: Session = Depends(get_db)) -> Any:
    # Check if user already exists
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Validate password strength
    is_valid, error_message = validate_password(user.password)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error_message
        )
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        password=hashed_password,
        firstname=user.firstname,
        lastname=user.lastname
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login")
async def login(
    form_data: LoginRequest,
    db: Session = Depends(get_db)
) -> Any:
    # Debug print
    print("\nLogin attempt for:", form_data.username)
    
    # Authenticate user
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user:
        print(f"User not found: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Debug print for password verification
    print(f"Verifying password for user: {user.email}")
    print(f"Stored password hash: {user.password}")
    
    valid_password = verify_password(form_data.password, str(user.password))
    print(f"Password verification result: {'valid' if valid_password else 'invalid'}")

    if not valid_password:
        print("Invalid password for user:", form_data.username)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )
    
    print(f"\nSuccessful login for user: {user.email}")
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "firstname": user.firstname,
            "lastname": user.lastname
        }
    } 