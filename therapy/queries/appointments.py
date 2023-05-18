from pydantic import BaseModel
from datetime import datetime
from queries.pool import pool
from typing import List, Union, Optional

class Error(BaseModel):
    message : str

class AppointmentsIn(BaseModel):
    body : str
    user : int
    date_time : datetime
    is_private : bool
    mood : str

class AppointmentsOut(BaseModel):
    id : int
    body : str
    user : int
    date_time : datetime
    is_private : bool
    mood : str


class AppointmentsRepository:
    def get_one(self, appointment_id: int) -> Optional[AppointmentsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, body, user, date_time, is_private, mood
                        FROM appointments
                        WHERE id = %s;
                        """,
                        [appointment_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_appointment_out(record)
        except Exception as e:
            print(e)
            return {"message": "could not get appointment"}


    def delete(self, appointment_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM appointments
                        WHERE id = %s
                        """,
                        [appointment_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, appointment_id: int, appointments: AppointmentsIn) -> Union[AppointmentsOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE appointments
                        SET body = %s, user = %s, date_time = %s, is_private = %s, mood = %s
                        WHERE id = %s;
                        """,
                        [
                            appointments.body,
                            appointments.user,
                            appointments.date_time,
                            appointments.is_private,
                            appointments.mood,
                            appointment_id,
                        ]
                    )
                    old_data = appointments.dict()
                    return AppointmentsOut(id=appointment_id, **old_data)
                    #return self.appointments_in_to_out(appointment_id, appointments)
        except Exception as e:
            print(e)
            return {"message": "could not update appointment"}

    def get_all(self) -> Union[Error, List[AppointmentsOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, body, user, date_time, is_private, mood
                        FROM appointments
                        ORDER BY date_time DESC;
                        """

                    )
                    result = []
                    for record in db:
                        appointment = AppointmentsOut(
                            id=record[0],
                            body=record[1],
                            user=record[2],
                            date_time=record[3],
                            is_private=record[4],
                            mood=record[5],
                        )
                        result.append(appointment)
                    return result


        except Exception as e:
            print(e)
            return {"message": "could not get all appointments"}

    def create(self, appointments: AppointmentsIn) -> AppointmentsOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO appointments (body, user, date_time, is_private, mood)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id ;
                    """,
                    [appointments.body, appointments.user, appointments.date_time, appointments.is_private, appointments.mood]
                )
                id = result.fetchone()[0]
                old_data = appointments.dict()
                return {"message": "error"}
                return AppointmentsOut(id=id, **old_data)
                #return self.appointments_in_to_out(id, appointments)

    # def appointments_in_to_out(self, id: int, appointments: AppointmentsIn):
    #     old_data = appointments.dict()
    #     return AppointmentsOut(id=id, **old_data)

    def record_to_appointment_out(self, record):
        return AppointmentsOut(
            id=record[0],
            body=record[1],
            user=record[2],
            date_time=record[3],
            is_private=record[4],
            mood=record[5],
        )
