from fastapi import APIRouter
from db.models.User import User
from pydantic import BaseModel
from mongoengine import connect, DoesNotExist
from dotenv import load_dotenv
import os
load_dotenv()

connection_string = os.getenv("CONNECTION_URI")

class UserProfileData(BaseModel):
    WalletAddress: str
    UserName: str
    Profile_pic: str
    bio: str


router = APIRouter(
    prefix="/users",
    tags=["users"],
)

@router.get("/")
def read_user():
    return {"Hello": "User"}

@router.post("/create_profile")
def create_profile(UserData: UserProfileData):
    # Profile creation logic
    # connection = connect(host=connection_string) # Connect to DB
    print("Connection Successful")

    try: 
        if((User.objects.get(WalletAddress=UserData.WalletAddress))): # Check for existing User
            return {"message": "WalletAddress already exists"}
        
    except(DoesNotExist):
        try:
            if((User.objects.get(UserName=UserData.UserName))): # Check for existing User
                return {"message": "UserName already exists"}
        except(DoesNotExist):
            user = User(
                WalletAddress=UserData.WalletAddress,
                UserName=UserData.UserName,
                Profile_pic=UserData.Profile_pic,
                bio=UserData.bio
            )
            user.save() # Save the user to the database
            print("Profile Created")


    return {"message": "Profile created"}