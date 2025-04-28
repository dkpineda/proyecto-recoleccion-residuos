from sqlalchemy.orm import Session
from models import SolicitudDB

def crear_solicitud(db: Session, solicitud: SolicitudDB):
    db.add(solicitud)
    db.commit()
    db.refresh(solicitud)
    return solicitud

def obtener_historial(db: Session):
    return db.query(SolicitudDB).all()