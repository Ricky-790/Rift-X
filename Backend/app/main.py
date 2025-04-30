from fastapi import FastAPI, APIRouter
from routers import User_router

app = FastAPI()
app.include_router(User_router.router)



@app.get("/")
def read_root():
    return {"Hello": "World"}