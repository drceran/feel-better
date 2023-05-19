from pydantic import BaseModel


class AppointmentIn(BaseModel):
    user_id: int
    therapist_id: int
    appointment_date: str
    appointment_time: str
    cost: int
