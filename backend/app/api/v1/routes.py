from fastapi import APIRouter

from app.api.v1.endpoints.transaction import router as transactions_router

routers = APIRouter()
router_list = [transactions_router]

for router in router_list:
    router.tags = routers.tags.append("v1")
    routers.include_router(router)
