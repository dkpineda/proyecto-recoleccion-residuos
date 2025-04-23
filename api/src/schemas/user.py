import uuid
from typing import Optional

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr
    firstname: Optional[str] = None
    lastname: Optional[str] = None

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    firstname: str
    lastname: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    firstname: Optional[str] = None
    lastname: Optional[str] = None

class UserInDB(BaseModel):
    id: uuid.UUID
    email: EmailStr
    firstname: Optional[str] = None
    lastname: Optional[str] = None

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    username: str
    password: str
