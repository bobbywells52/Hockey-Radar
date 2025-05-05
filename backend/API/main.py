from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routers.players import router as players_router
from routers.teams import router as teams_router
from mangum import Mangum
import uvicorn
app = FastAPI(debug=True)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(players_router)
app.include_router(teams_router)

Handler = Mangum(app)

@app.get("/")
async def root():
    return {"message": "Hello World"}

# @app.get("/nhl/player")
# async def get_player_data(player_id: int):
#     url = f"https://api-web.nhle.com/v1/player/{player_id}/landing?player_id={player_id}"
#
#     async with httpx.AsyncClient() as client:
#         try:
#             response = await client.get(url)
#             response.raise_for_status()
#             print("pulling data for player", player_id)
#             return response.json()
#         except httpx.HTTPError as e:
#             raise HTTPException(status_code=500, detail=str(e))


# @app.get("/nhl/team")
# async def get_team_data(team_code: str):
#     url = f"https://api-web.nhle.com/v1/roster/{team_code}/20242025"
#     async with httpx.AsyncClient() as client:
#         try:
#             response = await client.get(url)
#             response.raise_for_status()
#             return response.json()
#         except httpx.HTTPError as e:
#             raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)