from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.appointments import (
    AppointmentIn,
    AppointmentRepository,
    AppointmentOut,
    Error,
)

router = APIRouter()


@router.post("/appointments", response_model=Union[AppointmentOut, Error])
def create_appointment(
    appointment: AppointmentIn,
    repo: AppointmentRepository = Depends(),
):
    return repo.create(appointment)


@router.get("/appointments", response_model=Union[List[AppointmentOut], Error])
def get_all_appointments(
    repo: AppointmentRepository = Depends(),
):
    return repo.get_all_appointments()


@router.delete(
    "/appointments/{appointment_id}",
    response_model=bool,
)
def delete_appointment(
    appointment_id: int,
    repo: AppointmentRepository = Depends(),
) -> bool:
    return repo.delete_appointment(appointment_id)


@router.get(
    "/appointments/{appointment_id}",
    response_model=Union[Error, AppointmentOut],
)
def get_one_appointment(
    appointment_id: int,
    repo: AppointmentRepository = Depends(),
) -> Union[AppointmentOut, Error]:
    return repo.get_one_appointment(appointment_id)


@router.put(
    "/appointments/{appointment_id}",
    response_model=Union[AppointmentOut, Error],
)
def update_appointment(
    appointment_id: int,
    appointment: AppointmentIn,
    repo: AppointmentRepository = Depends(),
) -> Union[Error, AppointmentOut]:
    return repo.update_appointment(appointment_id, appointment)
