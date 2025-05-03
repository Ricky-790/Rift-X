from fastapi import FastAPI, APIRouter
from routers import User_router, Tournament_router

app = FastAPI()
app.include_router(User_router.router)
app.include_router(Tournament_router.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}