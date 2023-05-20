from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Union, List
from queries.pool import pool


class Error(BaseModel):
    message: str


class MessageDetail(BaseModel):
    pass


class MessageIn(BaseModel):
    sender: int
    recipient: int
    subject: str
    body: str
    cost: float


class MessageOut(BaseModel):
    id: int
    sender: int
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
                            sender=record[1],
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
                        SET sender = %s
                        , recipient = %s
                        , subject = %s
                        , body = %s
                        , cost = %s
                        WHERE id = %s
                        """,
                        [
                            message.sender,
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
                            sender=record[1],
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

    def get_all_messages(self) -> Union[Error, List[MessageOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, sender, recipient, subject, body, cost, datetime
                        FROM messages
                        ORDER BY datetime ASC;
                        """
                    )
                    return [
                        MessageOut(
                            id=record[0],
                            sender=record[1],
                            recipient=record[2],
                            subject=record[3],
                            body=record[4],
                            cost=record[5],
                            datetime=record[6],
                        )
                        for record in db
                    ]

        except Exception as e:
            print(e)
            return {"message": "An error occurred fetching the messages"}

    def create(self, message: MessageIn) -> MessageOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO messages(
                        sender,
                        recipient,
                        subject,
                        body,
                        cost)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id, datetime;
                    """,
                    [
                        message.sender,
                        message.recipient,
                        message.subject,
                        message.body,
                        message.cost,
                    ],
                )
                id, datetime = result.fetchone()
                return MessageOut(id=id, datetime=datetime, **message.dict())

    def message_in_to_out(self, id: int, message: MessageIn):
        old_data = message.dict()
        return MessageOut(id=id, **old_data)
