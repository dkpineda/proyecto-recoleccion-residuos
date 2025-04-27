# controllers/report_controller.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from services.report_service import get_report
from database.connection import get_db
from typing import Optional
from datetime import datetime
from fastapi.responses import StreamingResponse
from io import BytesIO
import pandas as pd
from services.report_service import get_report

router = APIRouter()

@router.get("/")
def get_reports(
    user_id: Optional[str] = Query(None),
    waste_type: Optional[str] = Query(None),
    date_star: Optional[datetime] = Query(None),
    date_end: Optional[datetime] = Query(None),
    neighborhood_id: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    # Sólo parseamos si hay valor
    ds = datetime.fromisoformat(date_star) if date_star else None
    de = datetime.fromisoformat(date_end)   if date_end   else None
    return get_report(db, user_id, waste_type, ds, de, neighborhood_id)

@router.get("/export/excel")
def export_reports_excel(
    user_id: Optional[str] = Query(None),
    waste_type: Optional[str] = Query(None),
    date_star: Optional[datetime] = Query(None),
    date_end: Optional[datetime] = Query(None),
    neighborhood_id: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    # Sólo parseamos si hay valor
    ds = datetime.fromisoformat(date_star) if date_star else None
    de = datetime.fromisoformat(date_end)   if date_end   else None
    import pandas as pd
    from io import BytesIO
    from fastapi.responses import StreamingResponse

    # 1) Traemos los reportes como ORM
    reports = get_report(db, user_id, waste_type, ds, de, neighborhood_id)

    # 2) Convertimos a lista de diccionarios
    rows = []
    for r in reports:
        rows.append({
            "Fecha":               r.date.isoformat(),
            "Usuario":             f"{r.user.firstname} {r.user.lastname}",
            "Tipo de Residuo":      r.waste_type,
            "Peso (kg)":            r.weight,
            "Descripción":         r.description or "",
            "Barrio":              r.neighborhood.name,
            "Localidad":           r.neighborhood.location.name,
        })

    # 3) Crear DataFrame de pandas
    df = pd.DataFrame(rows)

    # 4) Guardar el DataFrame a un Excel en memoria
    output = BytesIO()
    with pd.ExcelWriter(output, engine="openpyxl") as writer:
        df.to_excel(writer, index=False, sheet_name="Reportes")

    output.seek(0)

    # 5) Retornar el archivo como respuesta
    return StreamingResponse(
        output,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=reportes.xlsx"}
    )

@router.get("/export/pdf")
def export_reports_pdf(
    user_id: Optional[str] = Query(None),
    waste_type: Optional[str] = Query(None),
    date_star: Optional[datetime] = Query(None),
    date_end: Optional[datetime] = Query(None),
    neighborhood_id: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
    from reportlab.lib.pagesizes import letter
    from reportlab.lib import colors
    from reportlab.lib.styles import getSampleStyleSheet

    # Sólo parseamos si hay valor
    ds = datetime.fromisoformat(date_star) if date_star else None
    de = datetime.fromisoformat(date_end)   if date_end   else None
 # 1) extraemos ORM objects
    reports = get_report(db, user_id, waste_type, ds, de, neighborhood_id)

    # 2) los transformamos en lista de dicts
    rows = []
    for r in reports:
        rows.append({
            "date":               r.date.isoformat(),
            "user_name":          f"{r.user.firstname} {r.user.lastname}",
            "waste_type":         r.waste_type,
            "weight":             r.weight,
            "description":        r.description or "",
            "neighborhood_name":  r.neighborhood.name,
            "location_name":      r.neighborhood.location.name,
        })

    # 3) Preparamos los datos para ReportLab
    table_data = [[
       "Fecha", "Usuario", "Tipo", "Peso (kg)",
       "Descripción", "Barrio", "Localidad"
    ]]
    for r in rows:
        table_data.append([
            r["date"],
            r["user_name"],
            r["waste_type"],
            str(r["weight"]),
            r["description"],
            r["neighborhood_name"],
            r["location_name"],
        ])

    # 4) El resto igual que antes...
    stream = BytesIO()
    doc = SimpleDocTemplate(stream, pagesize=letter)
    styles = getSampleStyleSheet()
    elems = [Paragraph("Reporte de Recolecciones", styles["Heading1"]), Spacer(1, 12)]
    tbl = Table(table_data, repeatRows=1)
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), colors.gray),
        ("TEXTCOLOR",  (0,0), (-1,0), colors.whitesmoke),
        ("GRID",       (0,0), (-1,-1), 0.5, colors.black),
        ("FONTNAME",   (0,0), (-1,0), "Helvetica-Bold"),
    ]))
    elems.append(tbl)
    doc.build(elems)
    stream.seek(0)
    return StreamingResponse(stream, media_type="application/pdf", headers={
        "Content-Disposition": 'attachment; filename="reportes.pdf"'
    })