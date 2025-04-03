from dependency_injector.wiring import Provide
from fastapi import APIRouter, Depends
from uuid import UUID
from app.core.container import Container
from app.core.middleware import inject
from app.schema.transaction_schema import (
    Transaction,
    TransactionCreate,
    TransactionsResult,
    FindTransaction,
)
from app.services.transaction_service import TransactionService

router = APIRouter(prefix="/transactions", tags=["transactions"], dependencies=[])


@router.get("", response_model=TransactionsResult)
@inject
def get_transaction_list(
    find_query: FindTransaction = Depends(),
    service: TransactionService = Depends(Provide[Container.transaction_service]),
):
    return service.get_list(find_query)


@router.post("", response_model=Transaction)
@inject
def post_transaction(
    transaction: TransactionCreate,
    service: TransactionService = Depends(Provide[Container.transaction_service]),
):
    return service.process_transaction(transaction)


@router.get("/{transaction_id}", response_model=Transaction)
@inject
def get_transaction(
    transaction_id: UUID,
    service: TransactionService = Depends(Provide[Container.transaction_service]),
):
    return service.get_by_id(transaction_id)
