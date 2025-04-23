import os
from datetime import datetime, timedelta
from typing import Optional

from dotenv import load_dotenv
from jose import JWTError, jwt
from passlib.context import CryptContext

# Load environment variables
load_dotenv()

# Security configuration
SECRET_KEY = os.getenv("SECRET_KEY", "")
if not SECRET_KEY:
    raise ValueError(
        "No SECRET_KEY set in environment. "
        "Please set it with a secure key. "
        "You can generate one using: python -c 'import secrets; print(secrets.token_urlsafe(64))'"
    )

ALGORITHM = os.getenv("ALGORITHM", "HS256")
if not ALGORITHM:
    raise ValueError(
        "No ALGORITHM set in environment. "
        "Please set it with a secure algorithm. "
        "You can use 'HS256', 'HS384', or 'HS512'."
    )

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Generate password hash."""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create a new access token
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, str(SECRET_KEY), algorithm=ALGORITHM)

def decode_access_token(token: str) -> Optional[dict]:
    """
    Decode an access token and return the payload if valid
    """
    try:
        return jwt.decode(token, str(SECRET_KEY), algorithms=[ALGORITHM])
    except JWTError:
        return None

def create_refresh_token(data: dict) -> str:
    """
    Create a new refresh token with longer expiration
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7)  # 7 days expiration for refresh token
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, str(SECRET_KEY), algorithm=ALGORITHM)

def decode_refresh_token(token: str) -> Optional[dict]:
    """
    Decode a refresh token and return the payload if valid
    """
    try:
        return jwt.decode(token, str(SECRET_KEY), algorithms=[ALGORITHM])
    except JWTError:
        return None
