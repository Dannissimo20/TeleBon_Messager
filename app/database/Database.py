from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#engine = create_engine('postgresql+psycopg2://postgres:denchik2702@db:5432/telebon')
engine = create_engine('postgresql+psycopg2://postgres:denchik2702@localhost:5432/telebon')

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()