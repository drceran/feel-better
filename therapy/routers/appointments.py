from fastapi import APIRouter, Depends, Response
from typing import Union, List, Dict
from authenticator import authenticator
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
    user_data: Dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(appointment)


@router.get("/appointments", response_model=Union[List[AppointmentOut], Error])
def get_all_appointments_for_user(
    repo: AppointmentRepository = Depends(),
    user_data: Dict = Depends(authenticator.get_current_account_data),
):
    user_id = user_data["id"]
    return repo.get_all_appointments_for_user(user_id)


# from fast api get logged  in user id call repo.get_all_appointments_for_user(user_id)
# return repo.get_all_appointments()


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
