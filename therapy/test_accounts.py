from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator

client = TestClient(app)

class GetToken:
    def get_token(self):
        return {
            "access_token": "",
            "token_type": "",
        }


def test_create_account():
    account_data = {
        "first_name": "Test",
        "last_name": "Account",
        "email": "test@example.com",
        "type": "client",
        "password": "password123",
    }

    response = client.post("/api/accounts", json=account_data)

    assert response.status_code == 200
    assert response.json() is not None
    assert "access_token" in response.json()
    assert "account" in response.json()
    assert "type" in response.json()["account"]


def test_get_token():
    app.dependency_overrides[authenticator.get_current_account_data] = GetToken

    response = client.get("/token")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert "access_token" in response.json()
    assert "account" in response.json()
    assert "type" in response.json()["account"]
