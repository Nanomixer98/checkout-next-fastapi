from uuid import UUID
from app.repository.transaction_repository import TransactionRepository
from app.services.base_service import BaseService
from app.schema.transaction_schema import (
    TransactionCreate,
    TransactionUpdate,
    Transaction,
)


class TransactionService(BaseService):
    def __init__(self, transaction_repository: TransactionRepository):
        self.transaction_repository = transaction_repository
        super().__init__(transaction_repository)

    async def process_transaction(self, transaction: TransactionCreate) -> Transaction:
        """
        Procesa una nueva transacción
        """
        return await self.add(transaction)

    async def update_transaction_status(
        self, transaction_id: UUID, status: str
    ) -> Transaction:
        """
        Actualiza el estado de una transacción
        """
        return await self.patch(transaction_id, TransactionUpdate(status=status))

    async def get_transaction_by_id(self, transaction_id: UUID) -> Transaction:
        """
        Obtiene una transacción por su ID
        """
        return await self.get_by_id(transaction_id)
