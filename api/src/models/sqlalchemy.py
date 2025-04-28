from sqlalchemy import Column, Integer, String, Date
from database.connection import Base

class SolicitudDB(Base):
    __tablename__ = "solicitudes"
    id = Column(Integer, primary_key=True, index=True)
    correo = Column(String, index=True)
    direccion = Column(String)
    fecha = Column(Date)
    tipo = Column(String)
    descripcion = Column(String)
    estado = Column(String)