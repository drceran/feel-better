from fastapi import APIRouter, Depends
from queries.appointments import AppointmentIn, AppointmentRepository

router = APIRouter()


@router.post("/appointments")
def create_appointment(
    appointment: AppointmentIn, repo: AppointmentRepository = Depends()
):
    return repo.create(appointment)
