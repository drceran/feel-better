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
<<<<<<< HEAD
                        [appointment_id]
=======
                        [appointment_id],
>>>>>>> 77eab3f3fb490732073346d36138bc7bd231dd82
                    )
                    return True
        except Exception as e:
            print(e)
            return False

<<<<<<< HEAD
    def update(self, appointment_id: int, appointments: AppointmentsIn) -> Union[AppointmentsOut, Error]:
=======
    def update_appointment(
        self, appointment_id: int, appointment: AppointmentIn
    ) -> Union[AppointmentOut, Error]:
>>>>>>> 77eab3f3fb490732073346d36138bc7bd231dd82
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE appointments
<<<<<<< HEAD
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
=======
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
>>>>>>> 77eab3f3fb490732073346d36138bc7bd231dd82
