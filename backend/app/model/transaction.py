from typing import Optional
from enum import Enum
from sqlmodel import Field
from app.model.base_model import BaseModel


class TransactionStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"


class Transaction(BaseModel, table=True):
    __tablename__ = "transactions"
    __table_args__ = {"schema": "payments_app"}

    amount: float = Field(nullable=False)
    currency: str = Field(max_length=3, nullable=False)
    customer_email: str = Field(max_length=255, nullable=False)
    customer_name: str = Field(max_length=255, nullable=False)
    status: TransactionStatus = Field(default=TransactionStatus.PENDING, nullable=False)
    blumonpay_transaction_id: Optional[str] = Field(
        default=None, max_length=255, unique=True
    )
