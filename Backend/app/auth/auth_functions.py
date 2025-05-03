from jose import JWTError, jwt
from fastapi import HTTPException, status, Header
from typing import Optional

SECRET_KEY = "TopSecret" #Secret key
ALGORITHM = "HS256"

def create_jwt_token(data: dict): #Create jwt token
    encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_jwt_token(token: str): #Decode jwt token
    try:
        decoded_jwt = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_jwt
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    

async def verify_token(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authorization header",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = authorization.split(" ")[1]
    try:
        # Just decode the token to verify it's valid
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload  # Return the decoded payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

# print(decode_jwt_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJXYWxsZXRBZGRyZXNzIjoid2FsbGV0aWQyIn0.qsi2qdmlumhYRxyH18bR2LVjJqPlWzNPlakel2relnU"))