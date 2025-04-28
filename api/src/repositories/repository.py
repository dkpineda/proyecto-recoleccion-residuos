# Base de datos simulada
solicitudes_db = []

def crear_solicitud(data):
    solicitudes_db.append(data)
    return data

def obtener_todas():
    return solicitudes_db

def filtrar_por_estado(estado):
    return [s for s in solicitudes_db if s["estado"] == estado]

def obtener_por_id(solicitud_id):
    return next((s for s in solicitudes_db if s["id"] == solicitud_id), None)