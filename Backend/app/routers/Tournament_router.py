from fastapi import APIRouter
from db.models.User import User
from db.models.Tournament import Tournament
from pydantic import BaseModel
from mongoengine import DoesNotExist
from dotenv import load_dotenv
import os
from auth.auth_functions import decode_jwt_token

load_dotenv()
connection_string = os.getenv("CONNECTION_URI")

class TournamentData(BaseModel):
    TournamentName: str
    Game: str
    PrizePool: float
    StartDate: str
    EndDate: str
    Description: str
    Rules: str

router = APIRouter(
    prefix="/tournaments",
    tags=["tournaments"],
)
@router.get("/")
def fetch_tournaments():
    # Fetch all tournaments
    tournaments = Tournament.objects()
    return {"tournaments": tournaments}

@router.post("/create_tournament/{auth_token}")
def create_tournament(tournament_data: TournamentData, auth_token: str):
    print('Hello')
    decoded_data = decode_jwt_token(auth_token)
    wallet_address = decoded_data["WalletAddress"]
    print(wallet_address)
    User.objects.get(WalletAddress=wallet_address)
    # print(user)
    # Tournament creation logic
    tournament = Tournament(
        title=tournament_data.TournamentName,
        organizer=User.objects.get(WalletAddress=wallet_address),
        game=tournament_data.Game,
        prize_pool=tournament_data.PrizePool,
        start_date=tournament_data.StartDate,
        end_date=tournament_data.EndDate,
        description=tournament_data.Description,
        rules=tournament_data.Rules
    )
    tournament.save()

    return {"message": "Tournament created successfully",}