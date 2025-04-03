from datetime import datetime
from uuid import UUID

from sqlmodel import Column, DateTime, Field, SQLModel, func


class BaseModel(SQLModel):
    id: UUID = Field(primary_key=True, default_factory=UUID)
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), default=func.now())
    )
