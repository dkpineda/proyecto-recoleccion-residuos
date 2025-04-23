# Waste Collection System

## Description
This is a REST API developed with FastAPI to manage waste collection, enabling efficient administration of routes, schedules, and collection points.

## Technologies Used
- Python 3.x
- FastAPI
- Uvicorn (ASGI server)
- PostgreSQL
- SQLAlchemy (ORM)
- Pydantic for data validation
- JWT for authentication

## Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- PostgreSQL

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd api
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
# On Windows
.\venv\Scripts\activate
# On Unix or MacOS
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables:
Create a `.env` file in the project root with:
```env
CONNECTION_URL=postgresql://user:password@localhost:5432/db_name
JWT_SECRET=your_jwt_secret
```

5. Start the server:
```bash
python src/app.py
```
The server will be available at `http://127.0.0.1:5000`

## Project Structure
```
api/
├── src/
│   ├── __pycache__/   # Python compiled files
│   ├── app.py         # Application entry point
│   ├── controllers/   # API Controllers
│   ├── database/     # Database configuration
│   ├── models/       # SQLAlchemy models
│   ├── repositories/ # Data access layer
│   ├── schemas/      # Pydantic schemas
│   ├── services/     # Business logic
│   └── utils/        # Utilities and helpers
├── .env             # Environment variables
└── requirements.txt # Project dependencies
```

## Main Endpoints

### Authentication
- POST /auth/login - User login
- POST /auth/register - User registration

### Base API
- GET / - Welcome endpoint

[Other endpoints will be documented as they are implemented]

## Features
- Layered architecture (Controllers, Services, Repositories)
- PostgreSQL database with SQLAlchemy ORM
- Data validation with Pydantic
- JWT Authentication
- CORS enabled
- Automatic documentation with Swagger UI (available at /docs)
- Hot reload during development

## Development

To run the server in development mode:
```bash
uvicorn src.app:app --reload --port 5000
```

## API Documentation
Interactive API documentation is available at:
- Swagger UI: http://localhost:5000/docs
- ReDoc: http://localhost:5000/redoc

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add some NewFeature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request 
