from pydantic import BaseModel
from datetime import datetime
from typing import Union, List
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


class MessageOut(BaseModel):
    id: int
    user_id: int
    recipient: int
    subject: str
    body: str
    datetime: datetime


class MessageRepository:
    def get_one_message(
        self, user_id: int, message_id: int
    ) -> Union[Error, MessageOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM messages
                        WHERE id = %s AND user_id = %s
                        """,
                        [message_id, user_id],
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
                            datetime=record[5],
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
    ) -> Union[MessageOut, Error,]:
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
                        WHERE id = %s
                        """,
                        [
                            message.user_id,
                            message.recipient,
                            message.subject,
                            message.body,
                            message_id,
                        ],
                    )
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
                            datetime=record[5],
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
                        SELECT id, user_id, recipient,
                          subject, body, datetime
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
                            datetime=row[5],
                        )
                        messages.append(message)
                    return messages
        except Exception as e:
            print(e)
            return {"message": "An error occurred while fetching the messages"}

    def create(self, message: MessageIn) -> Union[MessageOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    "SELECT id FROM jotters WHERE id = %s", [message.user_id]
                )
                record = db.fetchone()
                if record is None:
                    return {"message": "User not found with the given user_id"}

                result = db.execute(
                    """
                    INSERT INTO messages (user_id, recipient,
                      subject, body)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id, datetime;
                    """,
                    [
                        message.user_id,
                        message.recipient,
                        message.subject,
                        message.body,
                    ],
                )
                id, datetime = result.fetchone()
                return MessageOut(id=id, datetime=datetime, **message.dict())
