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
    phone_number: Optional[str]
    city: Optional[str]
    state: Optional[str]
    balance: Optional[int]
    certification: Optional[str]
    graduated_college: Optional[str]
    profile_picture: Optional[str]
    about_me: Optional[str]
    password: Optional[str]


class EmptyJotterRepo:
    def get_all_jotters(self):
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
