from uuid import UUID
from app.repository.transaction_repository import TransactionRepository
from app.services.base_service import BaseService
from app.schema.transaction_schema import (
    TransactionCreate,
    TransactionCreate,
    Transaction,
)


class TransactionService(BaseService):
    def __init__(self, transaction_repository: TransactionRepository):
        self.transaction_repository = transaction_repository
        super().__init__(transaction_repository)

    def process_transaction(self, transaction: TransactionCreate) -> Transaction:
        """
        Procesa una nueva transacción
        """
        # TODO: Check if here we can integrate blumonpay or must be somewhere else according with architecture

        return self.add(transaction)
