from fastapi import APIRouter, Depends, Response
from queries.journals import JournalIn, JournalRepository, JournalOut, Error, JournalToken
from typing import Union, List, Optional
from authenticator import authenticator
from fastapi import APIRouter, Depends, Response, Request, HTTPException, status
from routers.accounts import AccountForm, get_token



router = APIRouter()


# @router.get("/token", response_model=Union[JournalToken, None])
# async def get_token(
#     request: Request,
#     journal: JournalToken = Depends(authenticator.try_get_current_account_data),
# ) -> Union[JournalToken, None]:
#     if journal and authenticator.cookie_name in request.cookies:
#         return {
#             "access_token": request.cookies[authenticator.cookie_name],
#             "type": "Bearer",
#             "journal": "journal",
#         }


@router.post("/api/journals", response_model=Union[JournalOut, Error])
async def create_journal(
    journal: JournalIn,
    response: Response,
    repo: JournalRepository = Depends(),
    journal_data: dict = Depends(authenticator.get_current_account_data),
):
    response.status_code = 400
    return repo.create(journal)

@router.get("/api/journals", response_model=Union[Error, List[JournalOut]])
async def get_all(
    repo: JournalRepository = Depends(),
    journal_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all()


@router.put("/api/journals/{journal_id}", response_model=Union[JournalOut, Error])
async def update_journal(
    journal_id: int,
    journal: JournalIn,
    repo: JournalRepository = Depends(),
    journal_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, JournalOut]:
        return repo.update(journal_id, journal)


@router.delete("/api/journals/{journal_id}", response_model=bool)
async def delete_journal(
    journal_id: int,
    repo: JournalRepository = Depends(),
    journal_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(journal_id)


@router.get("/api/journals/{journal_id}", response_model=Optional[JournalOut])
async def get_journal(
    journal_id: int,
    response: Response,
    repo: JournalRepository = Depends(),
    journal_data: dict = Depends(authenticator.get_current_account_data),
) -> JournalOut:
    journal = repo.get_one(journal_id)
    if journal is None:
        response.status_code = 404
    return journal
