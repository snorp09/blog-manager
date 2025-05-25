from datetime import datetime

from pydantic import BaseModel

class PostIncoming(BaseModel):
    title: str
    body: str

class Post(BaseModel):
    id: int
    title: str
    date: datetime
    body: str