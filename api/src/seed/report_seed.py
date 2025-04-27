from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from models.report import Report
from database.connection import SessionLocal

def insert_data_of_test():
    db: Session = SessionLocal()

    datos = [
        Report(user_id=1, waste_type="Orgánico", date=datetime.now(), weight=2.5, description="Restos de comida"),
        Report(user_id=2, waste_type="Plástico", date=datetime.now() - timedelta(days=1), weight=1.0, description="Botellas PET"),
        Report(user_id=1, waste_type="Vidrio", date=datetime.now() - timedelta(days=2), weight=3.2, description="Botellas de vino"),
        Report(user_id=3, waste_type="Papel", date=datetime.now(), weight=0.8, description="Hojas usadas"),
        Report(user_id=2, waste_type="Orgánico", date=datetime.now() - timedelta(days=5), weight=1.7, description="Frutas podridas"),
    ]

    db.add_all(datos)
    db.commit()
    db.close()

if __name__ == "__main__":
    insert_data_of_test()
    print("Datos de prueba insertados con éxito.")
