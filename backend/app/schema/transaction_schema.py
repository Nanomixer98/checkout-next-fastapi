from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum
from uuid import UUID


class TransactionStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"


class TransactionType(str, Enum):
    PURCHASE = "purchase"
    REFUND = "refund"
    WITHDRAWAL = "withdrawal"
    DEPOSIT = "deposit"


class TransactionBase(BaseModel):
    amount: float = Field(..., description="Monto de la transacción")
    currency: str = Field(default="USD", description="Moneda de la transacción")
    status: TransactionStatus = Field(
        default=TransactionStatus.PENDING, description="Estado de la transacción"
    )
    type: TransactionType = Field(..., description="Tipo de transacción")
    description: Optional[str] = Field(
        None, description="Descripción opcional de la transacción"
    )
    metadata: Optional[dict] = Field(
        default={}, description="Metadatos adicionales de la transacción"
    )


class TransactionCreate(TransactionBase):
    pass


class TransactionUpdate(TransactionBase):
    amount: Optional[float] = None
    currency: Optional[str] = None
    status: Optional[TransactionStatus] = None
    type: Optional[TransactionType] = None


class TransactionInDB(TransactionBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


class Transaction(TransactionInDB):
    pass
