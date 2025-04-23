from datetime import datetime, timedelta
from typing import Optional

from fastapi import HTTPException, status
from jose import jwt
from sqlalchemy.orm import Session

from models.user import User
from repositories.user_repository import UserRepository
from schemas.user import UserCreate
from utils.security import get_password_hash, verify_password


class AuthService:
    def __init__(self, db: Session):
        self.user_repository = UserRepository(db)

    def authenticate_user(self, email: str, password: str) -> Optional[User]:
        user = self.user_repository.get_by_email(email)
        if not user:
            return None
        if not verify_password(password, str(user.password)):
            return None
        return user

    def register_user(self, user_data: UserCreate) -> User:
        if self.user_repository.get_by_email(user_data.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        hashed_password = get_password_hash(user_data.password)
        return self.user_repository.create(user_data, hashed_password)

    def create_access_token(
        self,
        data: dict,
        expires_delta: Optional[timedelta] = None
    ) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=15))
        to_encode.update({"exp": expire})

        from utils.security import ALGORITHM, SECRET_KEY
        return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
