from fastapi.testclient import TestClient
from datetime import datetime
from pydantic import BaseModel
from queries.resources import ResourceRepository
from main import app


client = TestClient(app)


class ResourceOut(BaseModel):
    id: int
    title: str
    body: str
    posted_date: datetime = datetime.now()


class emptyRepo:
    def get_all_resources(self, id=None):
        return []


def fake_resource_data():
    return ResourceOut(
        id=1,
        title="Hello",
        body="goodbye!",
        posted_date=datetime.now(),
    )


def test_get_all_resources():
    app.dependency_overrides[ResourceRepository] = emptyRepo
    response = client.get("/resources")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
