from pydantic import BaseModel
from typing import Optional, List, Union
from enum import Enum
from queries.pool import pool
from psycopg.rows import dict_row
from queries.packages import PackageOut


class Error(BaseModel):
    message: str


class JotterType(str, Enum):
    client = "client"
    therapist = "therapist"


class JottersIn(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    email: str
    type: Optional[JotterType]
    phone_number: Optional[str]
    city: Optional[str]
    state: Optional[str]
    certificates: Optional[str]
    graduated_college: Optional[str]
    profile_picture: Optional[str]
    about_me: Optional[str]
    password: Optional[str]


class JottersOut(BaseModel):
    id: int
    first_name: Optional[str]
    last_name: Optional[str]
    email: str
    type: JotterType
    phone_number: Optional[str]
    city: Optional[str]
    state: Optional[str]
    balance: int
    certificates: Optional[str]
    graduated_college: Optional[str]
    profile_picture: Optional[str]
    about_me: Optional[str]


class JottersOutWithPassword(JottersOut):
    password: str


class JottersRepository:
    def get_one(self, jotter_id: int) -> Optional[JottersOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    db.execute(
                        """
                        SELECT *
                        FROM jotters
                        WHERE id =%s
                        """,
                        [jotter_id],
                    )
                    record = db.fetchone()
                    if record is None:
                        return {"message": "No user found with this id"}
                    return JottersOut(**record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that jotter"}

    def get_one_by_email(self, email: str) -> Optional[JottersOutWithPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    db.execute(
                        """
                        SELECT *
                        FROM jotters
                        WHERE email =%s
                        """,
                        [email],
                    )
                    record = db.fetchone()
                    if record is None:
                        return None
                    return JottersOutWithPassword(**record)
        except Exception as e:
            print(e)
            return None

    def change_balance(self, jotter_id: int, change: int):
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    result = db.execute(
                        """
                        UPDATE jotters
                        SET balance = balance + %s
                        WHERE id = %s
                        RETURNING balance
                        """,
                        [change, jotter_id],
                    )
                    record = result.fetchone()
                    pck_result = PackageOut(total_credit=record["balance"])
                    return pck_result
        except Exception as e:
            print(e)
            error = Error()
            error.message = "Your balance could not be updated."
            return error

    def update_jotter(
        self, jotter_id: int, jotter: JottersIn
    ) -> Union[JottersOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    result = db.execute(
                        """
                        UPDATE jotters
                        SET first_name = %s
                        , last_name = %s
                        , email = %s
                        , phone_number = %s
                        , city = %s
                        , state = %s
                        , certificates = %s
                        , graduated_college = %s
                        , profile_picture = %s
                        , about_me = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        [
                            jotter.first_name,
                            jotter.last_name,
                            jotter.email,
                            jotter.phone_number,
                            jotter.city,
                            jotter.state,
                            jotter.certificates,
                            jotter.graduated_college,
                            jotter.profile_picture,
                            jotter.about_me,
                            jotter_id,
                        ],
                    )
                    record = result.fetchone()
                    # old_data = jotter.dict()
                    return JottersOut(**record)
        except Exception as e:
            print(e)
            return {"message": "Could not update that jotter"}

    def get_all_jotters(self) -> Union[Error, List[JottersOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM jotters
                        ORDER BY id;
                        """
                    )
                    # result = []
                    # for record in db:
                    #     jotter = JottersOut(
                    #         id=record[0],
                    #         first_name=record[1],
                    #         last_name=record[2],
                    #         email=record[3],
                    #         type=record[4],
                    #         phone_number=record[5],
                    #         city=record[6],
                    #         state=record[7],
                    #         balance=record[8],
                    #         certificates=record[9],
                    #         graduated_college=record[10],
                    #         profile_picture=record[11],
                    #         about_me=record[12],
                    #     )
                    #     result.append(jotter)
                    # return result
                    return [JottersOut(**record) for record in result]
        except Exception as e:
            print(e)
            return {"message": "Could not get all jotters"}

    def create(self, jotter: JottersIn) -> JottersOut:
        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as db:
                result = db.execute(
                    """
                    INSERT INTO jotters
                        (first_name,
                        last_name,
                        email,
                        type,
                        phone_number,
                        city,
                        state,
                        certificates,
                        graduated_college,
                        profile_picture,
                        about_me,
                        password)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING *;
                    """,
                    [
                        jotter.first_name,
                        jotter.last_name,
                        jotter.email,
                        jotter.type,
                        jotter.phone_number,
                        jotter.city,
                        jotter.state,
                        jotter.certificates,
                        jotter.graduated_college,
                        jotter.profile_picture,
                        jotter.about_me,
                        jotter.password,
                    ],
                )
                record = result.fetchone()
                # old_data = jotter.dict()
                # return JottersOut(id=id, **old_data)
                return JottersOut(**record)

    def delete(self, jotter_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM jotters
                        WHERE id =%s
                        """,
                        [jotter_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def jotter_in_to_out(self, id: int, jotter: JottersIn):
        old_data = jotter.dict()
        return JottersOut(id=id, **old_data)
