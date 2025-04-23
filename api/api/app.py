from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from controllers.auth_controller import router as auth_router
from database.connection import init_db

app = FastAPI(title="Waste Collection API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["authentication"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Waste Collection API"}

@app.on_event("startup")
async def startup_event():
    init_db()

if __name__ == "__main__":
    port = 5000
    print(f"\nServer running on http://127.0.0.1:{port}\n")
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True) 