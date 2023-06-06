from fastapi.testclient import TestClient
from fastapi import FastAPI


app = FastAPI()


client = TestClient(app)


def test_create_message():
    message_data = {
        "user_id": "1",
        "recipient": "1",
        "subject": "HELLO WORLD Subject",
        "body": "HELLO WORLD Body",
        "cost": 0,
        #"datetime": "2021-01-01",
    }

    response = client.post("/messages", json=message_data)

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "user_id": 1,
        "recipient": 1,
        "subject": "HELLO WORLD Subject",
        "body": "HELLO WORLD Body",
        "cost": 0
    }

def test_get_all_messages():
    response = client.get("/messages")

    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "user_id": 1,
            "recipient": 1,
            "subject": "HELLO WORLD Subject",
            "body": "HELLO WORLD Body",
            "cost": 0
        }
    ]



def test_update_message():
    message_id = 1
    updated_message_data = {
        "id": "1",
        "user_id": "2",
        "recipient": "2",
        "subject": "Update HELLO WORLD Subject",
        "body": "Update HELLO WORLD Body",
        "cost": 1,
        #"datetime": "2021-01-01",
    }

    response = client.put(f"/messages/{message_id}", json=updated_message_data)

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "user_id": 2,
        "recipient": 2,
        "subject": "Update HELLO WORLD Subject",
        "body": "Update HELLO WORLD Body",
        "cost": 1
    }

def test_get_one_message():
    message_id = 1

    response = client.get(f"/messages/{message_id}")

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "user_id": 2,
        "recipient": 2,
        "subject": "Update HELLO WORLD Subject",
        "body": "Update HELLO WORLD Body",
        "cost": 1
    }


def test_delete_message():
    message_id = 1
    response = client.delete(f"/messages/{message_id}")
    assert response.status_code == 200
    assert response.json() == True
