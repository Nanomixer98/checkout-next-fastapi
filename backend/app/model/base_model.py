from datetime import datetime
from uuid import UUID, uuid4

from sqlmodel import Column, DateTime, Field, SQLModel, func


class BaseModel(SQLModel):
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), default=func.now())
    )
