from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
import uuid
from database.connection import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    firstname = Column(String)
    lastname = Column(String)

    def __repr__(self):
        return f"<User {self.email}>" 