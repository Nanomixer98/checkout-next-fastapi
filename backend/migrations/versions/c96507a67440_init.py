"""create payments_app schema and transactions table

Revision ID: c96507a67440
Revises:
Create Date: 2025-04-02 17:35:21.037920

"""

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "c96507a67440"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.execute("CREATE SCHEMA IF NOT EXISTS payments_app")

    op.create_table(
        "transactions",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            server_default=sa.text("gen_random_uuid()"),
            primary_key=True,
        ),
        sa.Column("amount", sa.Numeric(precision=12, scale=2), nullable=False),
        sa.Column("currency", sa.String(length=3), nullable=False),
        sa.Column("customer_email", sa.String(length=255), nullable=False),
        sa.Column("customer_name", sa.String(length=255), nullable=False),
        sa.Column(
            "status", sa.String(length=20), server_default="pending", nullable=False
        ),
        sa.Column("blumonpay_transaction_id", sa.String(length=255)),
        sa.Column(
            "created_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False
        ),
        schema="payments_app",
    )

    op.create_index(
        op.f("ix_payments_app_transactions_customer_email"),
        "transactions",
        ["customer_email"],
        schema="payments_app",
    )
    op.create_index(
        op.f("ix_payments_app_transactions_status"),
        "transactions",
        ["status"],
        schema="payments_app",
    )
    op.create_index(
        op.f("ix_payments_app_transactions_created_at"),
        "transactions",
        ["created_at"],
        schema="payments_app",
    )
    op.create_index(
        op.f("ix_payments_app_transactions_blumonpay_id"),
        "transactions",
        ["blumonpay_transaction_id"],
        unique=True,
        schema="payments_app",
    )


def downgrade():
    op.drop_index(
        op.f("ix_payments_app_transactions_blumonpay_id"),
        table_name="transactions",
        schema="payments_app",
    )
    op.drop_index(
        op.f("ix_payments_app_transactions_created_at"),
        table_name="transactions",
        schema="payments_app",
    )
    op.drop_index(
        op.f("ix_payments_app_transactions_status"),
        table_name="transactions",
        schema="payments_app",
    )
    op.drop_index(
        op.f("ix_payments_app_transactions_customer_email"),
        table_name="transactions",
        schema="payments_app",
    )

    op.drop_table("transactions", schema="payments_app")
