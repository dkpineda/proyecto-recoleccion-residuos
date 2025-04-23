from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from repositories.user_repository import UserRepository
from schemas.user import UserCreate, UserInDB
from utils.security import verify_password, get_password_hash
from models.user import User

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
        # Check if user exists
        if self.user_repository.get_by_email(user_data.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user
        hashed_password = get_password_hash(user_data.password)
        return self.user_repository.create(user_data, hashed_password)

    def create_access_token(
        self,
        data: dict,
        expires_delta: Optional[timedelta] = None
    ) -> str:
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        
        from utils.security import SECRET_KEY, ALGORITHM
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt 