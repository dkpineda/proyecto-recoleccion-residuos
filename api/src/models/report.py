# src/models/report.py

from sqlalchemy import Column, DateTime, Float, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from database.connection import Base

class Report(Base):
    __tablename__ = "reports"

    id              = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id         = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    waste_type      = Column(String,   nullable=False)
    date            = Column(DateTime, nullable=False)
    weight          = Column(Float,    nullable=False)
    description     = Column(String)
    neighborhood_id = Column(UUID(as_uuid=True), ForeignKey("neighborhoods.id"), nullable=False)

    user = relationship(
        "User",
        back_populates="reports"
    )
    neighborhood = relationship(
        "Neighborhood",
        back_populates="reports"
    )

