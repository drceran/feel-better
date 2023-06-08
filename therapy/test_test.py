from fastapi.testclient import TestClient
from main import app
from queries.jotters import JottersRepository
from pydantic import BaseModel
from authenticator import authenticator
from typing import Optional

client = TestClient(app)


class JottersOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    type: str
    phone_number: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    balance: Optional[int] = None
    certification: Optional[str] = None
    graduated_college: Optional[str] = None
    profile_picture: Optional[str] = None
    about_me: Optional[str] = None
    password: Optional[str] = None


class EmptyJotterRepo:
    def get_all_jotters(self, id=None):
        return []


def fake_jotters_account_data():
    jotter = JottersOut(
        id=1,
        first_name="Test",
        last_name="Account",
        email="a@a.com",
        type="client",
        phone_number="1234567890",
        city="LA",
        state="CA",
        balance=0,
        certification="Test",
        graduated_college="Test",
        profile_picture="Test",
        about_me="Test",
        password="password123",
    )
    return jotter.dict


def test_get_all_jotters():
    app.dependency_overrides[JottersRepository] = EmptyJotterRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
        ] = fake_jotters_account_data
    response = client.get("/jotters")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
