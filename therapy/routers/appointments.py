from fastapi import APIRouter
from queries.appointments import AppointmentIn

router = APIRouter()


@router.post("/appointments")
def create_appointment(appointment: AppointmentIn):
    print("appointment", appointment)
    return appointment
