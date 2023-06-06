from fastapi.testclient import TestClient
from fastapi import FastAPI


app = FastAPI()

client = TestClient(app)


def test_create_journal():
    journal_data = {
        "user_id": "1",
        "body": "My Journal",
        "name": "This is my journal content.",
        "datetime": "2023-06-06T15:02:57.434Z",
        "is_private": False,
        "mood": "happy",
    }

    response = client.post("/journals/", json=journal_data)

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "user_id": 1,
        "body": "My Journal",
        "name": "This is my journal content.",
        "datetime": "2023-06-06T15:02:57.434Z",
        "is_private": False,
        "mood": "happy",
    }


def test_get_all_journals():
    response = client.get("/journals/")

    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "user_id": 1,
            "body": "My Journal",
            "name": "This is my journal content.",
            "datetime": "2023-06-06T15:02:57.434Z",
            "is_private": False,
            "mood": "happy",
        }
    ]


def test_update_journal():
    journal_id = 1
    updated_journal_data = {
        "id": "1",
        "user_id": "2",
        "body": "Update My Journal",
        "name": "Update This is my journal content.",
        "datetime": "2023-06-06T15:02:57.434Z",
        "is_private": True,
        "mood": "sad",
    }

    response = client.put(f"/journals/{journal_id}", json=updated_journal_data)

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "user_id": 2,
        "body": "Update My Journal",
        "name": "Update This is my journal content.",
        "datetime": "2023-06-06T15:02:57.434Z",
        "is_private": True,
        "mood": "sad",
    }



def test_get_journal():
    journal_id = 1

    response = client.get(f"/journals/{journal_id}")

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "user_id": 2,
        "body": "Update My Journal",
        "name": "Update This is my journal content.",
        "datetime": "2023-06-06T15:02:57.434Z",
        "is_private": True,
        "mood": "sad",
    }


def test_delete_journal():
    journal_id = 1

    response = client.delete(f"/journals/{journal_id}")

    assert response.status_code == 200
    assert response.json() == True
