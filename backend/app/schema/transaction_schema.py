from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum
from app.util.schema import AllOptional
from app.schema.base_schema import FindBase
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
    amount: Optional[float] = Field(None, description="Monto de la transacción")
    currency: Optional[str] = Field(None, description="Moneda de la transacción")
    status: Optional[TransactionStatus] = Field(
        default=TransactionStatus.PENDING, description="Estado de la transacción"
    )
    type: Optional[TransactionType] = Field(None, description="Tipo de transacción")
    description: Optional[str] = Field(
        None, description="Descripción opcional de la transacción"
    )
    metadata: Optional[dict] = Field(
        default={}, description="Metadatos adicionales de la transacción"
    )


class TransactionCreate(BaseModel):
    amount: float = Field(None, description="Monto de la transacción")
    currency: str = Field(None, description="Moneda de la transacción")
    description: str = Field(None, description="Descripción opcional de la transacción")
    customer_email: str = Field(None, description="Email del cliente")
    customer_name: str = Field(None, description="Nombre del cliente")


class TransactionInDB(TransactionBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


class FindTransaction(FindBase, TransactionBase): ...


class Transaction(TransactionInDB): ...


class TransactionsResult(BaseModel):
    founds: Optional[List[Transaction]]
