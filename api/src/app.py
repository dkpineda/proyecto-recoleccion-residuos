from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from database.db import engine

from api.endpoints import auth, users

app = FastAPI(title="Waste Collection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["authentication"])
app.include_router(users.router, prefix="/users", tags=["users"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Waste Collection API"}

@app.get("/health-check")
async def health_check():
    db_status = 'connected'
    try:
        # Try to connect to the database
        with engine.connect():
            pass
    except Exception as e:
        db_status = f'disconnected: {str(e)}'
    
    return {
        'status': 'healthy',
        'message': 'Server is running',
        'database': db_status
    }

if __name__ == "__main__":
    port = 5000
    print(f"\nServer running on port {port}\n")
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)
