from dependency_injector import containers, providers

from app.core.config import configs
from app.core.database import Database
from app.repository import *
from app.services import *


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(
        modules=[
            "app.api.v1.endpoints.transaction",
            # "app.core.dependencies",
        ]
    )

    db = providers.Singleton(Database, db_url=configs.DATABASE_URI)

    transaction_repository = providers.Factory(
        TransactionRepository, session_factory=db.provided.session
    )

    transaction_service = providers.Factory(
        TransactionService, transaction_repository=transaction_repository
    )
