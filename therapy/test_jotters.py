from fastapi.testclient import TestClient
from main import app
from typing import Optional
from pydantic import BaseModel
from authenticator import authenticator
from queries.jotters import JottersRepository

client = TestClient(app)


class GetOneJotter:
    def get_one_jotter(self, jotter_id):
        jotter_id = 1
        return {
            "id": jotter_id,
            "first_name": "Test",
            "last_name": "Jotter",
            "email": "a@a.com",
            "type": "client",
            "phone_number": "1234567890",
            "city": "LA",
            "state": "CA",
            "balance": 0,
            "certification": "Test",
            "graduated_college": "Test",
            "profile_picture": "Test",
            "about_me": "Test",
            "password": "password123",
        }

class UpdateJotter:
    def update_jotter(self, jotter_id, jotter):
        jotter_id = 1
        return {
            "id": jotter_id,
            **jotter.dict(),
        }

class CreateJotter:
    def create_jotter(self, jotter):
        return {
            "id": 1,
            **jotter.dict(),
        }

def test_create_jotter():
    app.dependency_overrides[JottersRepository] = CreateJotter

    json = {
        "first_name": "Test",
        "last_name": "Jotter",
        "email": "a@a.com",
        "type": "client",
        "phone_number": "1234567890",
        "city": "LA",
        "state": "CA",
        "balance": 0,
        "certification": "Test",
        "graduated_college": "Test",
        "profile_picture": "Test",
        "about_me": "Test",
        "password": "password123",
    }

    expected = {
        "id": 1,
        **json,
    }

    response = client.post("/jotters", json=json, headers={"Authorization": "{token}"})
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


def test_get_one_jotter():
    app.dependency_overrides[JottersRepository] = GetOneJotter

    json = {
        "id": 1,
        "first_name": "Test",
        "last_name": "Jotter",
        "email": "a@a.com",
        "type": "client",
        "phone_number": "1234567890",
        "city": "LA",
        "state": "CA",
        "balance": 0,
        "certification": "Test",
        "graduated_college": "Test",
        "profile_picture": "Test",
        "about_me": "Test",
        "password": "password123",
    }

    expected = {
        "id": 1,
        **json,
    }

    response = client.get("/jotters/1")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


def test_update_jotter():
    app.dependency_overrides[JottersRepository] = UpdateJotter

    json = {
        "first_name": "Updated",
        "last_name": "Jotter",
        "email": "b@b.com",
        "type": "client",
        "phone_number": "1234567890",
        "city": "LA",
        "state": "CA",
        "balance": 0,
        "certification": "Test",
        "graduated_college": "Test",
        "profile_picture": "Test",
        "about_me": "Test",
        "password": "password123",
    }
    expected = {
        "id": 1,
        **json,
    }

    response = client.put("/jotters/1", json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
