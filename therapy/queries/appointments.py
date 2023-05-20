from pydantic import BaseModel
from datetime import date, time
from typing import Optional, Union, List
from queries.pool import pool


class Error(BaseModel):
    message: str


class AppointmentDetail(BaseModel):
    pass


class AppointmentIn(BaseModel):
    user_id: int
    therapist_id: int
    appointment_date: date
    appointment_time: time
    cost: float


class AppointmentOut(BaseModel):
    id: int
    user_id: int
    therapist_id: int
    appointment_date: date
    appointment_time: time
    cost: float


class AppointmentRepository:
    def get_one_appointment(
        self, appointment_id: int
    ) -> Union[Error, AppointmentOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM appointments
                        WHERE id = %s
                        """,
                        [appointment_id],
                    )
                    record = db.fetchone()
                    print(record)
                    if record is None:
                        return {"message": "No appointment found with this id"}
                    else:
                        appointment = AppointmentOut(
                            id=record[0],
                            user_id=record[1],
                            therapist_id=record[2],
                            appointment_date=record[3],
                            appointment_time=record[4],
                            cost=record[5],
                        )
                    return appointment
        except Exception as e:
            print(e)
            return {
                "message": "An error occurred while fetching the appointment"
            }

    def delete_appointment(self, appointment_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM appointments
                        WHERE id = %s
                        """,
                        [appointment_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update_appointment(
        self, appointment_id: int, appointment: AppointmentIn
    ) -> Union[AppointmentOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE appointments
                        SET user_id = %s
                         , therapist_id = %s
                         , appointment_date = %s
                         , appointment_time = %s
                         , cost = %s
                         WHERE id = %s
                        """,
                        [
                            appointment.user_id,
                            appointment.therapist_id,
                            appointment.appointment_date,
                            appointment.appointment_time,
                            appointment.cost,
                            appointment_id,
                        ],
                    )

                    return self.appointment_in_to(appointment_id, appointment)
        except Exception as e:
            print(e)
            return {"Message": "something broke about the update"}

    def get_all_appointments(self) -> Union[Error, List[AppointmentOut]]:
        try:
            # connect to the database
            with pool.connection() as conn:
                # get a cursor (something to run SQ: with)
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, user_id, therapist_id, appointment_date, appointment_time, cost
                        FROM appointments
                        ORDER BY appointment_date ASC;
                        """
                    )
                    return [
                        AppointmentOut(
                            id=record[0],
                            user_id=record[1],
                            therapist_id=record[2],
                            appointment_date=record[3],
                            appointment_time=record[4],
                            cost=record[5],
                        )
                        for record in db
                    ]

        except Exception as e:
            print(e)
            return {"Message": "something broke about the appointments"}

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
                # this is a tuple! so we want the [0] for the id
                id = result.fetchone()[0]
                # old_data = appointment.dict()
                return self.appointment_in_to(id, appointment)

    def appointment_in_to(self, id: int, appointment: AppointmentIn):
        old_data = appointment.dict()
        return AppointmentOut(id=id, **old_data)
