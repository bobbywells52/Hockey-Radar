from fastapi import APIRouter, HTTPException
import httpx

router = APIRouter(prefix="/teams")

@router.get("/team")
async def get_team_data(team_code: str):
    url = f"https://api-web.nhle.com/v1/roster/{team_code}/20242025"
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            print(url)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=str(e))