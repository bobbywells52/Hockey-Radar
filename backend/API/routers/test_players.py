import pytest
from httpx import Response
from fastapi import FastAPI
from httpx import AsyncClient
import respx
from players import router
from httpx import AsyncClient, ASGITransport

pytestmark = pytest.mark.asyncio

app = FastAPI()
app.include_router(router)

transport = ASGITransport(app=app)

@pytest.mark.asyncio
@respx.mock
async def test_get_player_data_success():
    player_id = 8478402
    mock_url = f"https://api-web.nhle.com/v1/player/{player_id}/landing?player_id={player_id}"
    mock_response_data = {"player": {"id": player_id, "name": "Connor McDavid"}}

    respx.get(mock_url).mock(return_value=Response(200, json=mock_response_data))

    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get(f"/players/player?player_id={player_id}")
        assert response.status_code == 200
        assert response.json() == mock_response_data

@pytest.mark.asyncio
@respx.mock
async def test_get_player_data_failure():
    player_id = 0
    mock_url = f"https://api-web.nhle.com/v1/player/{player_id}/landing?player_id={player_id}"

    respx.get(mock_url).mock(return_value=Response(404))

    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get(f"/players/player?player_id={player_id}")
        assert response.status_code == 500
        assert "detail" in response.json()
