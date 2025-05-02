import pytest
from httpx import Response
from fastapi import FastAPI
from httpx import AsyncClient
import respx
from teams import router
from httpx import AsyncClient, ASGITransport

pytestmark = pytest.mark.asyncio

app = FastAPI()
app.include_router(router)

transport = ASGITransport(app=app)

@pytest.mark.asyncio
@respx.mock
async def test_get_team_data_success():
    team_code = "EDM"
    mock_url = f"https://api-web.nhle.com/v1/roster/{team_code}/20242025"
    mock_response_data = {"forwards": [{"id": 0o001, "name": "Connor McDavid"}, {"id": 0o002, "name": "Leon Draisaitl"}],
                          "defensemen": [{"id": 0o003, "name": "Evan Bouchard"}, {"id": 0o004, "name": "John Klingberg"}],
                          "goalies": [{"id": 0o005, "name": "Stuart Skinner"}]}

    respx.get(mock_url).mock(return_value=Response(200, json=mock_response_data))

    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get(f"/teams/team?team_code={team_code}")
        assert response.status_code == 200
        assert response.json() == mock_response_data

@pytest.mark.asyncio
@respx.mock
async def test_get_player_data_failure():
    team_code = ""
    mock_url = f"https://api-web.nhle.com/v1/roster/{team_code}/20242025"

    respx.get(mock_url).mock(return_value=Response(404))

    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get(f"/teams/team?team_code={team_code}")
        assert response.status_code == 500
        assert "detail" in response.json()
