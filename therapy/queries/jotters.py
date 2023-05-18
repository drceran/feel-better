from pydantic import BaseModel
from typing import Optional, List, Union
from enum import Enum
from queries.pool import pool


# from datetime import date


class Error(BaseModel):
    message: str


class JotterType(str, Enum):
    client = "client"
    therapist = "therapist"


# these are called as typein
class JottersIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    type: JotterType
    phone_number: int
    city: str
    state: str
    balance: int
    certificates: Optional[str]
    graduated_college: Optional[str]
    profile_picture: Optional[str]
    about_me: Optional[str]


class JottersOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    type: JotterType
    phone_number: int
    city: str
    state: str
    balance: int
    certificates: Optional[str]
    graduated_college: Optional[str]
    profile_picture: Optional[str]
    about_me: Optional[str]


class JottersRepository:
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
                    result = []
                    for record in db:
                        jotter = JottersOut(
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
                        result.append(jotter)
                    return result
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
                old_data = jotter.dict()
                # return {"message": "error!!"}
                return JottersOut(id=id, **old_data)
