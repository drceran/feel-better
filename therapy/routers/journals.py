from fastapi import APIRouter, Depends, Response
from queries.journals import JournalIn, JournalRepository, JournalOut, Error, JournalToken
from typing import Union, List, Optional
from authenticator import authenticator
from fastapi import APIRouter, Depends, Response, Request, HTTPException, status
from routers.accounts import AccountForm



router = APIRouter()


@router.get("/token", response_model=Union[JournalToken, None])
async def get_token(
    request: Request,
    journal: JournalToken = Depends(authenticator.try_get_current_account_data),
) -> Union[JournalToken, None]:
    if journal and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "journal": "journal",
        }


@router.post("/journals", response_model=Union[JournalOut, Error])
def create_journal(
    journal: JournalIn,
    response: Response,
    repo: JournalRepository = Depends(),
    journal_data: dict = Depends(authenticator.get_current_account_data),
):
    response.status_code = 400
    return repo.create(journal)

@router.get("/journals", response_model=Union[Error, List[JournalOut]])
def get_all(
    repo: JournalRepository = Depends(),
    journal_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all()


@router.put("/journals/{journal_id}", response_model=Union[JournalOut, Error])
def update_journal(
    journal_id: int,
    journal: JournalIn,
    repo: JournalRepository = Depends(),
    journal_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, JournalOut]:
        return repo.update(journal_id, journal)


@router.delete("/journals/{journal_id}", response_model=bool)
def delete_journal(
    journal_id: int,
    repo: JournalRepository = Depends(),
    journal_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(journal_id)


@router.get("/journals/{journal_id}", response_model=Optional[JournalOut])
def get_journal(
    journal_id: int,
    response: Response,
    repo: JournalRepository = Depends(),
    journal_data: dict = Depends(authenticator.get_current_account_data),
) -> JournalOut:
    journal = repo.get_one(journal_id)
    if journal is None:
        response.status_code = 404
    return journal
