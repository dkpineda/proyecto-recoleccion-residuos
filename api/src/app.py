from typing import Dict
import uvicorn
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from controllers.auth_controller import router as auth_router
from controllers.report_controller import router as report_router
from controllers.location_controller import router as location_router
from controllers.neighborhood_controller import router as neighborhood_router
from controllers.request_controller import router as request_router
from database.connection import init_db

app = FastAPI(title="Waste Collection API")

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers de las diferentes funcionalidades
app.include_router(auth_router, prefix="/auth", tags=["authentication"])
app.include_router(report_router, prefix="/reports", tags=["report"])
app.include_router(location_router, prefix="/locations", tags=["location"])
app.include_router(neighborhood_router, prefix="/neighborhoods", tags=["neighborhood"])
app.include_router(request_router, prefix="/requests", tags=["requests"])

# Montar archivos estáticos
app.mount("/", StaticFiles(directory="api/src/static", html=True), name="static")

@app.get("/")
def read_root() -> Dict[str, str]:
    return {"message": "Welcome to the Waste Collection API"}

@app.on_event("startup")
async def startup_event() -> None:
    init_db()

if __name__ == "__main__":
    port = 5000
    print(f"\nServer running on http://127.0.0.1:{port}\n")
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)