from fastapi import APIRouter, Depends
from typing import Union, List, Dict
from authenticator import authenticator
from queries.appointments import (
    AppointmentIn,
    AppointmentRepository,
    AppointmentOut,
    Error,
)
from queries.jotters import JottersRepository


router = APIRouter()


@router.post("/appointments", response_model=Union[AppointmentOut, Error])
def create_appointment(
    appointment: AppointmentIn,
    repo: AppointmentRepository = Depends(),
    user_data: Dict = Depends(authenticator.get_current_account_data),
    jotter_repo: JottersRepository = Depends(),
):
    appointment.user_id = user_data["id"]
    current_balance = jotter_repo.get_one(user_data["id"]).balance
    if current_balance < 10:
        return Error(
            message="Your balance is insufficient to make an appointment"
        )
    result = repo.create(appointment)
    jotter_repo.change_balance(-10)
    return result


@router.get("/appointments", response_model=Union[List[AppointmentOut], Error])
def get_all_appointments_for_user(
    repo: AppointmentRepository = Depends(),
    user_data: Dict = Depends(authenticator.get_current_account_data),
):
    user_id = user_data["id"]
    return repo.get_all_appointments_for_user(user_id)


@router.delete(
    "/appointments/{appointment_id}",
    response_model=bool,
)
def delete_appointment(
    appointment_id: int,
    repo: AppointmentRepository = Depends(),
    user_data: Dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_appointment(appointment_id)


@router.get(
    "/appointments/{appointment_id}",
    response_model=Union[Error, AppointmentOut],
)
def get_one_appointment(
    appointment_id: int,
    repo: AppointmentRepository = Depends(),
    user_data: Dict = Depends(authenticator.get_current_account_data),
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
    user_data: Dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, AppointmentOut]:
    return repo.update_appointment(appointment_id, appointment)
