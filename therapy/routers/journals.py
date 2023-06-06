from fastapi import APIRouter, Depends, Response
from queries.journals import (
    JournalIn,
    JournalRepository,
    JournalOut,
    Error,
    JournalToken,
)
from typing import Union, List, Optional
from authenticator import authenticator
from fastapi import (
    APIRouter,
    Depends,
    Response,
    Request,
    HTTPException,
    status,
)
from routers.accounts import AccountForm, get_token


router = APIRouter()


@router.post("/journals/", response_model=Union[JournalOut, Error])
async def create_journal(
    journal: JournalIn,
    response: Response,
    repo: JournalRepository = Depends(),
    journal_data: dict = Depends(authenticator.get_current_account_data),
):
    if journal_data and authenticator.cookie_name:
        journal.user_id = journal_data["id"]
        return repo.create(journal)
    return Error(message="Authentication failed")


@router.get("/journals/", response_model=Union[Error, List[JournalOut]])
async def get_all(
    repo: JournalRepository = Depends(),
    journal_data: dict = Depends(authenticator.get_current_account_data),
):
    if journal_data and authenticator.cookie_name:
        user_id = journal_data["id"]
        return repo.get_all(user_id)
    return Error(message="Authentication failed")


@router.put("/journals/{journal_id}", response_model=Union[JournalOut, Error])
async def update_journal(
    journal_id: int,
    journal: JournalIn,
    repo: JournalRepository = Depends(),
    journal_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, JournalOut]:
    return repo.update(journal_id, journal)


@router.delete("/journals/{journal_id}", response_model=bool)
async def delete_journal(
    journal_id: int,
    repo: JournalRepository = Depends(),
    journal_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(journal_id)


@router.get("/journals/{journal_id}", response_model=Optional[JournalOut])
async def get_journal(
    journal_id: int,
    response: Response,
    repo: JournalRepository = Depends(),
    journal_data: dict = Depends(authenticator.get_current_account_data),
) -> JournalOut:
    if journal_data and authenticator.cookie_name:
        user_id = journal_data["id"]
        return repo.get_one(user_id, journal_id)
    return Error(message="Authentication failed")

    # journal = repo.get_one(journal_id)
    # if journal is None:
    #     response.status_code = 404
    # return journal
