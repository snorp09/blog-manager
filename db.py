from sqlalchemy import create_engine, Identity, String, func, Text
from sqlalchemy.orm import sessionmaker, session, DeclarativeBase, Mapped, mapped_column
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from datetime import datetime
from models import Post

engine = create_engine("sqlite:///db.db", echo=True)
async_engine = create_async_engine("sqlite+aiosqlite:///db.db", echo=True)

class Base(DeclarativeBase):
    pass

db_Session = sessionmaker(bind=engine)
db_AsyncSession = async_sessionmaker(bind=async_engine)

class PostDB(Base):
    __tablename__ = "post"
    id: Mapped[int] = mapped_column(Identity(), primary_key=True)
    title: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    date: Mapped[datetime] = mapped_column(server_default=func.now())

    def to_model(self):
        return Post(id=self.id, title=self.title, body=self.body, date=self.date)

Base.metadata.create_all(engine)
