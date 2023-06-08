from fastapi.testclient import TestClient
from main import app
from queries.appointments import AppointmentRepository
from pydantic import BaseModel
from authenticator import authenticator
from datetime import date, time


client = TestClient(app)

class AppointmentOut(BaseModel):
    id: int
    user_id: int
    therapist_id: int
    appointment_date: date
    appointment_time: time
    cost: float

class EmptyRepo:
    def get_all_appointments(self, id=None):
        return []

    def get_all_appointments_for_user(self, user_id):
        return []

def fake_appointment_data():
    appointment = AppointmentOut(
        id=1,
        user_id=1,
        therapist_id=1,
        appointment_date=date.today(),
        appointment_time=time(12, 30),
        cost=100.00,
    )
    return appointment.__dict__


def test_get_all_appointments():
    app.dependency_overrides[AppointmentRepository] = EmptyRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_appointment_data
    response = client.get("/appointments")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
