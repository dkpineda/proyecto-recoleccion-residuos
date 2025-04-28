from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date
from repositories.repository import crear_solicitud, obtener_todas, obtener_por_id, filtrar_por_estado

router = APIRouter()

class Solicitud(BaseModel):
    id: int
    correo: EmailStr
    direccion: str
    fecha: date
    tipo: str
    descripcion: Optional[str] = None
    estado: str

@router.post("/", response_model=Solicitud)
def crear_solicitud_endpoint(solicitud: Solicitud):
    solicitud.estado = "pendiente"
    return crear_solicitud(solicitud.dict())

@router.get("/", response_model=List[Solicitud])
def obtener_historial():
    return obtener_todas()

@router.get("/{solicitud_id}", response_model=Solicitud)
def obtener_solicitud(solicitud_id: int):
    solicitud = obtener_por_id(solicitud_id)
    if not solicitud:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")
    return solicitud