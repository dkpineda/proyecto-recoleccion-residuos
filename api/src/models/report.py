
from sqlalchemy import Column, DateTime, Float, ForeignKey, String, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from database.connection import Base

class Report(Base):
    __tablename__ = "reports"

    id              = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id         = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    id_waste_type      = Column(Integer,  ForeignKey("waste_type.id"), nullable=False)
    date            = Column(DateTime, nullable=False)
    weight          = Column(Float,    nullable=False)
    description     = Column(String)
    neighborhood_id = Column(UUID(as_uuid=True), ForeignKey("neighborhoods.id"), nullable=False)
    points      = Column(Integer,   nullable=False)

    user = relationship(
        "User",
        back_populates="reports"
    )
    neighborhood = relationship(
        "Neighborhood",
        back_populates="reports"
    )
    waste_type = relationship(
        "Waste_Type",
        back_populates="reports"
    )   
