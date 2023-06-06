from fastapi.testclient import TestClient
from therapy.main import app
from fastapi import FastAPI


app = FastAPI()

client = TestClient(app)


def test_create_appointment():
    appointment_data = {
        "user_id": "1",
        "therapist_id": "1",
        "appointment_date": "2023-06-06",
        "appointment_time": "10:00:00",
        "cost": 0,
    }

    response = client.post("/appointments", json=appointment_data)

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "user_id": 1,
        "therapist_id": 1,
        "appointment_date": "2023-06-06",
        "appointment_time": "10:00:00",
        "cost": 0,
    }


def test_get_all_appointments_for_user():
    response = client.get("/appointments")

    assert response.status_code == 200
    assert response.json() == {
            "id": 1,
            "user_id": 1,
            "therapist_id": 1,
            "appointment_date": "2023-06-06",
            "appointment_time": "10:00:00",
            "cost": 0,
    }


def test_update_appointment():
    appointment_id = 1
    updated_appointment_data = {
        "id": 1,
        "user_id": 1,
        "therapist_id": 1,
        "appointment_date": "2023-01-01",
        "appointment_time": "11:11:00",
        "cost": 1,
    }

    response = client.put(f"/appointments/{appointment_id}", json=updated_appointment_data)

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "user_id": 1,
        "therapist_id": 1,
        "appointment_date": "2023-01-01",
        "appointment_time": "11:11:00",
        "cost": 1,
    }





def test_get_one_appointment():
    appointment_id = 1

    response = client.get(f"/appointments/{appointment_id}")

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "user_id": 1,
        "therapist_id": 1,
        "appointment_date": "2023-01-01",
        "appointment_time": "11:11:00",
        "cost": 1,
    }


def test_delete_appointment():
    appointment_id = 1

    response = client.delete(f"/appointments/{appointment_id}")

    assert response.status_code == 200
    assert response.json() == True
