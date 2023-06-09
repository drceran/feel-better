from fastapi.testclient import TestClient
from main import app
from queries.messages import MessageRepository
from pydantic import BaseModel
from authenticator import authenticator
from datetime import datetime


client = TestClient(app)


class MessageOut(BaseModel):
    id: int
    user_id: int
    recipient: int
    subject: str
    body: str
    datetime: datetime


class emptyRepo:
    def get_all_messages(self, id=None):
        return []


def fake_message_data():
    message = MessageOut(
        id=1,
        user_id=1,
        recipient=2,
        subject="Hello",
        body="goodbye!",
        datetime=datetime.now(),
    )
    return message.dict()


def test_get_all_messages():
    app.dependency_overrides[MessageRepository] = emptyRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_message_data
    response = client.get("/messages/")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
