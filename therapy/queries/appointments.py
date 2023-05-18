from pydantic import BaseModel
from datetime import date, time
from typing import Optional
from queries.pool import pool


class AppointmentIn(BaseModel):
    user_id: int
    therapist_id: int
    appointment_date: date
    appointment_time: time
    cost: int


class AppointmentOut(BaseModel):
    id: int
    user_id: int
    therapist_id: int
    appointment_date: date
    appointment_time: time
    cost: int


class AppointmentRepository:
    def create(self, appointment: AppointmentIn) -> AppointmentOut:
        # connect to the database
        with pool.connection() as conn:
            # get a cursor (something to run SQ: with)
            with conn.cursor() as db:
                # Run our INSERT statement
                result = db.execute(
                    """
                    INSERT INTO appointments(
                        user_id,
                        therapist_id,
                        appointment_date,
                        appointment_time,
                        cost)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        appointment.user_id,
                        appointment.therapist_id,
                        appointment.appointment_date,
                        appointment.appointment_time,
                        appointment.cost,
                    ],
                )
                id = result.fetchone()[
                    0
                ]  # this is a tuple! so we want the [0] for the id
                old_data = appointment.dict()
                return AppointmentOut(id=id, **old_data)
                # Return new data
