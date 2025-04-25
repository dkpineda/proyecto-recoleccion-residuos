# models/report.py

import uuid
from sqlalchemy import Column, String, DateTime, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database.connection import Base

class Report(Base):
    __tablename__ = "reports"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    waste_type   = Column(String,   nullable=False)
    date         = Column(DateTime, nullable=False)
    weight       = Column(Float,    nullable=False)
    description  = Column(String)

    # ⚠️ Aquí debe ir el nombre de la CLASE User, no de la tabla
    user = relationship("User", back_populates="reports")
