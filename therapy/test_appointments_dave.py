from fastapi.testclient import TestClient
from main import app
from queries.appointments import AppointmentRepository
from pydantic import BaseModel
from authenticator import authenticator
from typing import Optional

client = TestClient(app)


class AppointmentsOut(BaseModel):
    id: int
    jotter_id: int
    client_id: int
    date: str
    time: str
    duration: int
    price: int
    status: str
    jotter_first_name: str
    jotter_last_name: str
    jotter_email: str
    jotter_type: str
    jotter_phone_number: Optional[str] = None
    jotter_city: Optional[str] = None
    jotter_state: Optional[str] = None
    jotter_balance: Optional[int] = None
    jotter_certification: Optional[str]
    jotter_graduated_college: Optional[str]
    jotter_profile_picture: Optional[str]
    jotter_about_me: Optional[str]
    jotter_password: Optional[str]
    client_first_name: str
    client_last_name: str
    client_email: str
    client_type: str
    client_phone_number: Optional[str] = None
    client_city: Optional[str] = None
    client_state: Optional[str] = None
    client_balance: Optional[int] = None
    client_certification: Optional[str]
    client_graduated_college: Optional[str]
    client_profile_picture: Optional[str]
    client_about_me: Optional[str]
    client_password: Optional[str]


class EmptyAppointmentRepo:
    def get_all_appointments(self, id=None):
        return []


def fake_appointment_data():
    appointment = AppointmentsOut(
        id=1,
        jotter_id=1,
        client_id=1,
        date="2021-09-01",
        time="12:00",
        duration=1,
        price=1,
    )
    return appointment.__dict__


def test_get_appointments():
    app.dependency_overrides[AppointmentRepository] = EmptyAppointmentRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_appointment_data
    response = client.get("/appointments/1")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert isinstance(response.json(), dict)
