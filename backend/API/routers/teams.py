from fastapi import APIRouter, HTTPException, Query
import httpx

router = APIRouter(prefix="/teams")

@router.get("/{team_code}", status_code=200)
async def get_team_data(team_code: str, season: str = Query(default='20242025')):
    url = f"https://api-web.nhle.com/v1/roster/{team_code}/{season}"
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=str(e))