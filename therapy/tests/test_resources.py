from fastapi.testclient import TestClient
from therapy.main import app
from fastapi import FastAPI


app = FastAPI()

client = TestClient(app)

def test_create_resource():
    resource_data = {
        "user_id": "1",
        "title": "Test Resource",
        "body": "Test Resource Body",
        "writer": "Test Resource Writer",
        "url_link": "Test Resource URL Link",
    }

    response = client.post("/resources", json=resource_data)
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "user_id": 1,
        "title": "Test Resource",
        "body": "Test Resource Body",
        "writer": "Test Resource Writer",
        "url_link": "Test Resource URL Link",
    }


def test_get_all_resources():
    response = client.get("/resources")

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_resource():
    response = client.get("/resources/1")

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "user_id": 1,
        "title": "Test Resource",
        "body": "Test Resource Body",
        "writer": "Test Resource Writer",
        "url_link": "Test Resource URL Link",
    }

def test_update_resource():
    resource_data = {
        "user_id": "1",
        "title": "Update Test Resource",
        "body": "Update Test Resource Body",
        "writer": "Update Test Resource Writer",
        "url_link": "Update Test Resource URL Link",
    }

    response = client.put("/resources/1", json=resource_data)
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "user_id": 1,
        "title": "Update Test Resource",
        "body": "Update Test Resource Body",
        "writer": "Update Test Resource Writer",
        "url_link": "Update Test Resource URL Link",
    }

def test_delete_resource():
    response = client.delete("/resources/1")

    assert response.status_code == 200
    assert response.json() == True
