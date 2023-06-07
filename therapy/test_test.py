# from fastapi.testclient import TestClient
# from main import app
# from pydantic import BaseModel
# from datetime import datetime
# from authenticator import authenticator
# from queries.journals import JournalRepository

# client = TestClient(app)

# class AppointmentOut(BaseModel):
#     id: int
#     user_id: int
#     jotter_id: int
#     datetime: datetime
#     duration: int
#     cost: float
#     is_accepted: bool
#     is_paid: bool
#     is_completed: bool

# class EmptyRepo:
#     def get_all(self, id=None):
#         return []

# def fake_get_data():
#     appointments = AppointmentOut(
#         id=1,
#         user_id=1,
#         jotter_id=1,
#         datetime=datetime.utcnow().isoformat(),
#         duration=60,
#         cost=100.0,
#         is_accepted=False,
#         is_paid=False,
#         is_completed=False,
#     )
#     return appointments

# # def test_get_all_appointments():
# #     app.dependency_overrides[authenticator.get_current_account_data] = (
# #         fake_get_data
# #     )
# #     response = client.get("/appointments")
# #     app.dependency_overrides = {}
# #     assert response.status_code == 200
# #     assert response.json() == []

# # def test_get_all_journals():
# #     app.dependency_overrides[JournalRepository] = fake_get_data
# #     response = client.get("/appointments")
# #     app.dependency_overrides = {}
# #     assert response.status_code == 200
# #     assert response.json() == []


# # def test_get_all_jotters():
# #     app.dependency_overrides[authenticator.get_current_account_data] = (
# #         fake_get_current_jotters_data
# #     )
# #     response = client.get("/jotters")
# #     app.dependency_overrides = {}
# #     assert response.status_code == 200
# #     assert isinstance(response.json(), list)
