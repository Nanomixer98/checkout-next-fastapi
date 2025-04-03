from dependency_injector.wiring import Provide
from fastapi import APIRouter, Depends
from uuid import UUID
from app.core.container import Container
from app.core.middleware import inject
from app.schema.transaction_schema import Transaction
from app.services.transaction_service import TransactionService

router = APIRouter(prefix="/transactions", tags=["transactions"], dependencies=[])


@router.get("", response_model=str)
@inject
def get_transaction_list():
    return "NOT IMPLEMENTED YET"
    # return service.get_list(find_query)


@router.post("", response_model=str)
@inject
def post_transaction():
    return "NOT IMPLEMENTED YET"
    # return service.add(user)


@router.get("/{transaction_id}", response_model=Transaction)
@inject
def get_transaction(
    transaction_id: UUID,
    service: TransactionService = Depends(Provide[Container.transaction_service]),
):
    return service.get_by_id(transaction_id)
