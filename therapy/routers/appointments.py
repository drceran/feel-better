from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.appointments import AppointmentsIn, AppointmentsOut, AppointmentsRepository, Error

router = APIRouter()



@router.post("/appointments", response_model=Union[AppointmentsOut, Error])
def create_appointments(appointments: AppointmentsIn, response: Response, repo: AppointmentsRepository = Depends()):
   response.status_code = 400
   return repo.create(appointments)



@router.get("/appointments", response_model=Union[List[AppointmentsOut], Error])
def get_all_appointments(repo: AppointmentsRepository = Depends()):
   return repo.get_all()


@router.put("/appointments/{appointment_id}", response_model=Union[AppointmentsOut, Error])
def update_appointments(
   appointment_id: int,
   appointments: AppointmentsIn,
   response: Response,
   repo: AppointmentsRepository = Depends(),
) -> Union[Error, AppointmentsOut]:
   return repo.update(appointment_id, appointments)

@router.delete("/appointments/{appointment_id}", response_model=bool)
def delete_appointments(appointment_id: int, repo: AppointmentsRepository = Depends(),
) -> bool:
   return repo.delete(appointment_id)

@router.get("/appointments/{appointment_id}", response_model=Union[AppointmentsOut, Error])
def get_appointment(appointment_id: int, response: Response, repo: AppointmentsRepository = Depends(),
) -> Union[Error, AppointmentsOut]:
   appointment = repo.get_one(appointment_id)
   if appointment is None:
       response.status_code = 404
   return appointment
