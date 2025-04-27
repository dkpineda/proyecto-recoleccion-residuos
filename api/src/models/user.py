# models/user.py

import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship   # ← importa esto

from database.connection import Base

class User(Base):
    __tablename__ = "users"

    id        = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email     = Column(String, unique=True, index=True, nullable=False)
    password  = Column(String, nullable=False)
    firstname = Column(String)
    lastname  = Column(String)

    # ← relación inversa: coincide con back_populates="user" en Report
    reports = relationship(
        "Report",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<User {self.email}>"
