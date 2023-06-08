from fastapi.testclient import TestClient
from main import app
from typing import Optional
from pydantic import BaseModel
from authenticator import authenticator

client = TestClient(app)


class JottersIn(BaseModel):
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


def fake_get_current_jotters_data():
    return JottersOut(
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


def fake_jotters_in(jotter):
    return JottersIn(
        first_name=jotter.first_name,
        last_name=jotter.last_name,
        email=jotter.email,
        type=jotter.type,
        phone_number=jotter.phone_number,
        city=jotter.city,
        state=jotter.state,
        balance=jotter.balance,
        certification=jotter.certification,
        graduated_college=jotter.graduated_college,
        profile_picture=jotter.profile_picture,
        about_me=jotter.about_me,
        password=jotter.password,
    )


def test_get_all_jotters():
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_jotters_data
    )
    response = client.get("/jotters")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_one_jotters():
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_jotters_data
    )
    response = client.get("/jotters/1")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert isinstance(response.json(), dict)
    
