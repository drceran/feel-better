from pydantic import BaseModel
from enum import Enum
from queries.pool import pool
from datetime import datetime
from typing import Union, List, Optional
from jwtdown_fastapi.authentication import Token


class Error(BaseModel):
    message: str


class mood(str, Enum):
    happy = "happy"
    sad = "sad"
    angry = "angry"
    anxious = "anxious"
    neutral = "neutral"
    ambitious = "ambitious"
    carefree = "carefree"


class JournalIn(BaseModel):
    user_id: int
    body: str
    name: str
    date_time: datetime
    is_private: bool
    mood: mood


class JournalOut(BaseModel):
    id: int
    user_id: int
    body: str
    name: str
    date_time: datetime
    is_private: bool
    mood: mood


class JournalToken(Token):
    Journal: JournalOut


class JournalRepository:
    def get_one(self, journal_id: int) -> Optional[JournalOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, user_id, body, name, date_time, is_private, mood
                        FROM journals
                        WHERE id = %s
                        """,
                        [journal_id],
                    )
                    record = db.fetchone()
                    return JournalOut(
                        id=record[0],
                        user_id=record[1],
                        body=record[2],
                        name=record[3],
                        date_time=record[4],
                        is_private=record[5],
                        mood=record[6],
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not get that journal"}

    def delete(self, journal_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM journals
                        WHERE id = %s
                        """,
                        [journal_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
        self, journal_id: int, journal: JournalIn
    ) -> Union[JournalOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE journals
                        SET user_id = %s
                        , body = %s
                        , name = %s
                        , date_time = %s
                        , is_private = %s
                        , mood = %s
                        WHERE id = %s
                        """,
                        [
                            journal.user_id,
                            journal.body,
                            journal.name,
                            journal.date_time,
                            journal.is_private,
                            journal.mood,
                            journal_id,
                        ],
                    )
                    # old_data = journal.dict()
                    # return JournalOut(id=journal_id, **old_data)
                    return self.journal_in_to_out(journal_id, journal)
        except Exception as e:
            print(e)
            return {"message": "Could not update that journal"}

    def get_all(self, user_id: int) -> Union[Error, List[JournalOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT * FROM journals Where user_id = %s
                        ORDER BY date_time;
                        """,
                        [user_id],
                    )
                    result = []
                    for record in db:
                        journal = JournalOut(
                            id=record[0],
                            user_id=record[1],
                            body=record[2],
                            name=record[3],
                            date_time=record[4],
                            is_private=record[5],
                            mood=record[6],
                        )
                        result.append(journal)
                    return result
        except Exception as e:
            print(e)
            return Error(message="Could not get all journals")

    def create(self, journal: JournalIn) -> JournalOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO journals (user_id, body, name, date_time, is_private, mood)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
                            journal.user_id,
                            journal.body,
                            journal.name,
                            journal.date_time,
                            journal.is_private,
                            journal.mood,
                        ],
                    )
                    id = db.fetchone()[0]
                    # old_data = journal.dict()
                    # return JournalOut(id=id, **old_data)
                    return self.journal_in_to_out(id, journal)
        except Exception:
            return {"message": "Could not create journal"}

    def journal_in_to_out(self, id: int, journal: JournalIn):
        old_data = journal.dict()
        return JournalOut(id=id, **old_data)
