from pydantic import BaseModel
from typing import Optional
from enum import Enum
from queries.pool import pool


# from datetime import date


class JotterType(str, Enum):
    client = 'client'
    therapist = 'therapist'


# these are called as typein
class JottersIn (BaseModel):
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
                    [jotter.first_name,
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
                     jotter.about_me
                     ]
                )
                id = result.fetchone()[0]
                old_data = jotter.dict()
                return JottersOut(id=id, **old_data)
