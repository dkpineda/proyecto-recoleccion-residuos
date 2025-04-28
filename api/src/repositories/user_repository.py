class UserRepository:
    def __init__(self):
        # Base de datos simulada
        self.solicitudes_db = []

    def crear_solicitud(self, data):
        self.solicitudes_db.append(data)
        return data

    def obtener_todas(self):
        return self.solicitudes_db

    def filtrar_por_estado(self, estado):
        return [s for s in self.solicitudes_db if s["estado"] == estado]

    def obtener_por_id(self, solicitud_id):
        return next((s for s in self.solicitudes_db if s["id"] == solicitud_id), None)