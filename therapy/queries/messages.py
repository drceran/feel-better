from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Union, List
from queries.pool import pool


class Error(BaseModel):
    message: str


class MessageDetail(BaseModel):
    pass


class MessageIn(BaseModel):
    user_id: int
    recipient: int
    subject: str
    body: str
    cost: float


class MessageOut(BaseModel):
    id: int
    user_id: int
    recipient: int
    subject: str
    body: str
    cost: float
    datetime: datetime


class MessageRepository:
    def get_one_message(self, message_id: int) -> Union[Error, MessageOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM messages
                        WHERE id = %s
                        """,
                        [message_id],
                    )
                    record = db.fetchone()
                    print(record)
                    if record is None:
                        return {"message": "No message found with this id"}
                    else:
                        message = MessageOut(
                            id=record[0],
                            user_id=record[1],
                            recipient=record[2],
                            subject=record[3],
                            body=record[4],
                            cost=record[5],
                            datetime=record[6],
                        )
                    return message
        except Exception as e:
            print(e)
            return {"message": "An error occurred while fetching the message"}

    def delete_message(self, message_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM messages
                        WHERE id = %s
                        """,
                        [message_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update_message(
        self, message_id: int, message: MessageIn
    ) -> Union[MessageOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE messages
                        SET user_id = %s
                        , recipient = %s
                        , subject = %s
                        , body = %s
                        , cost = %s
                        WHERE id = %s
                        """,
                        [
                            message.user_id,
                            message.recipient,
                            message.subject,
                            message.body,
                            message.cost,
                            message_id,
                        ],
                    )
                    # Fetch the updated message from the database
                    db.execute(
                        """
                        SELECT * FROM messages
                        WHERE id = %s
                        """,
                        [message_id],
                    )
                    record = db.fetchone()
                    if record is None:
                        return {"message": "No message found with this id"}
                    else:
                        message_out = MessageOut(
                            id=record[0],
                            user_id=record[1],
                            recipient=record[2],
                            subject=record[3],
                            body=record[4],
                            cost=record[5],
                            datetime=record[6],
                        )
                    return message_out
        except Exception as e:
            print(e)
            return {
                "message": "Something went wrong while updating the message"
            }

    def get_all_messages(self, user_id: int) -> Union[Error, List[MessageOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, user_id, recipient, subject, body, cost, datetime
                        FROM messages
                        WHERE user_id = %s
                        """,
                        [user_id],
                    )
                    messages = []
                    for row in result.fetchall():
                        message = MessageOut(
                            id=row[0],
                            user_id=row[1],
                            recipient=row[2],
                            subject=row[3],
                            body=row[4],
                            cost=row[5],
                            datetime=row[6],
                        )
                        messages.append(message)
                    return messages
        except Exception as e:
            print(e)
            return {"message": "An error occurred while fetching the messages"}

    def create(self, message: MessageIn) -> Union[MessageOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                # Check if the user_id exists in the jotters table
                db.execute("SELECT id FROM jotters WHERE id = %s", [message.user_id])
                record = db.fetchone()
                if record is None:
                    return {"message": "User not found with the given user_id"}

                # User exists, proceed with message creation
                result = db.execute(
                    """
                    INSERT INTO messages (user_id, recipient, subject, body, cost)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id, datetime;
                    """,
                    [
                        message.user_id,
                        message.recipient,
                        message.subject,
                        message.body,
                        message.cost,
                    ],
                )
                id, datetime = result.fetchone()
                return MessageOut(id=id, datetime=datetime, **message.dict())
