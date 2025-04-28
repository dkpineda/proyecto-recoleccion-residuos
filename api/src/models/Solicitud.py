from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class Solicitud(BaseModel):
    id: int
    correo: EmailStr
    direccion: str
    fecha: date
    tipo: str  # orgánico, inorgánico, peligroso
    descripcion: Optional[str] = None
    estado: str  # pendiente, completado, cancelado