# models/user.py

import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database.connection import Base

class User(Base):
    __tablename__ = "users"

    id        = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email     = Column(String, unique=True, index=True, nullable=False)
    password  = Column(String, nullable=False)
    firstname = Column(String)
    lastname  = Column(String)

    # 🔗 Relación inversa: apunta a la CLASE Report
    reports = relationship("Report", back_populates="user")

    def __repr__(self):
        return f"<User {self.email}>"
