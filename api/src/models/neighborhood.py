# models/neighborhood.py

import uuid
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database.connection import Base

class Neighborhood(Base):
    __tablename__ = "neighborhoods"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, index=True, nullable=False)
    location_id = Column(UUID(as_uuid=True), ForeignKey("locations.id"), nullable=False)

    # Relación con Location
    location = relationship("Location", back_populates="neighborhoods")

    # Relación con Report
    reports = relationship("Report", back_populates="neighborhood")
