from pydantic import BaseModel
from typing import Optional, List, Union
from enum import Enum
from queries.pool import pool


class Error(BaseModel):
    message: str


class JotterType(str, Enum):
    client = "client"
    therapist = "therapist"


class JottersIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    type: JotterType
    phone_number: str
    city: str
    state: str
    balance: int
    certificates: Optional[str]
    graduated_college: Optional[str]
    profile_picture: Optional[str]
    about_me: Optional[str]
    password: str


class JottersOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    type: JotterType
    phone_number: str
    city: str
    state: str
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
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id,
                        first_name,
                        last_name,
                        email,
                        type,
                        phone_number,
                        city,
                        state,
                        balance,
                        certificates,
                        graduated_college,
                        profile_picture,
                        about_me
                        FROM jotters
                        WHERE id =%s
                        """,
                        [jotter_id],
                    )
                    record = db.fetchone()
                    if record is None:
                        return {"message": "No user found with this id"}
                    # return self.record_to_jotter_out(record)
                    return JottersOut(
                        id=record[0],
                        first_name=record[1],
                        last_name=record[2],
                        email=record[3],
                        type=record[4],
                        phone_number=record[5],
                        city=record[6],
                        state=record[7],
                        balance=record[8],
                        certificates=record[9],
                        graduated_college=record[10],
                        profile_picture=record[11],
                        about_me=record[12],
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not get that jotter"}

    def get_one_by_email(self, email: str) -> Optional[JottersOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id,
                        first_name,
                        last_name,
                        email,
                        type,
                        FROM jotters
                        WHERE email =%s
                        """,
                        [email],
                    )
                    record = db.fetchone()
                    if record is None:
                        return None
                    return JottersOut(
                        id=record[0],
                        first_name=record[1],
                        last_name=record[2],
                        email=record[3],
                        type=record[4],
                    )
        except Exception as e:
            print(e)
            return None

    def update_jotter(
        self, jotter_id: int, jotter: JottersIn
    ) -> Union[JottersOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE jotters
                        SET first_name = %s
                        , last_name = %s
                        , email = %s
                        , type = %s
                        , phone_number = %s
                        , city = %s
                        , state = %s
                        , balance = %s
                        , certificates = %s
                        , graduated_college = %s
                        , profile_picture = %s
                        , about_me = %s
                        WHERE id = %s
                        """,
                        [
                            jotter.first_name,
                            jotter.last_name,
                            jotter.email,
                            jotter.type,
                            jotter.phone_number,
                            jotter.city,
                            jotter.state,
                            jotter.balance,
                            jotter.certificates,
                            jotter.graduated_college,
                            jotter.profile_picture,
                            jotter.about_me,
                            jotter_id,
                        ],
                    )
                # old_data = jotter.dict()
                # return JottersOut(id=jotter_id, **old_data)
                return self.jotter_in_to_out(jotter_id, jotter)
        except Exception as e:
            print(e)
            return {"message": "Could not update that jotter"}

    def get_all_jotters(self) -> Union[Error, List[JottersOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        id,
                        first_name,
                        last_name,
                        email,
                        type,
                        phone_number,
                        city,
                        state,
                        balance,
                        certificates,
                        graduated_college,
                        profile_picture,
                        about_me
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
                    return [
                        self.record_to_jotter_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all jotters"}

    def create(self, jotter: JottersIn) -> JottersOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
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
                        balance,
                        certificates,
                        graduated_college,
                        profile_picture,
                        about_me)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        jotter.first_name,
                        jotter.last_name,
                        jotter.email,
                        jotter.type,
                        jotter.phone_number,
                        jotter.city,
                        jotter.state,
                        jotter.balance,
                        jotter.certificates,
                        jotter.graduated_college,
                        jotter.profile_picture,
                        jotter.about_me,
                    ],
                )
                id = result.fetchone()[0]
                # old_data = jotter.dict()
                # return JottersOut(id=id, **old_data)
                return self.jotter_in_to_out(id, jotter)

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

    def record_to_jotter_out(self, record):
        return JottersOut(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            email=record[3],
            type=record[4],
            phone_number=record[5],
            city=record[6],
            state=record[7],
            balance=record[8],
            certificates=record[9],
            graduated_college=record[10],
            profile_picture=record[11],
            about_me=record[12],
        )
