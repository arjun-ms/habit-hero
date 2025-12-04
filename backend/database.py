# backend/database.py

from sqlmodel import SQLModel, create_engine, Session

# SQLite database (file will be created automatically)
DATABASE_URL = "sqlite:///./habit.db"

# connect_args is required for SQLite when using multithreading
engine = create_engine(DATABASE_URL, echo=True, connect_args={"check_same_thread": False})


def create_db_and_tables():
    """Create tables based on SQLModel models."""
    SQLModel.metadata.create_all(engine)


def get_session():
    """Dependency for getting a database session."""
    with Session(engine) as session:
        yield session
