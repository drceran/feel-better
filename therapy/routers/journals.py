from fastapi import APIRouter, Depends, Response
from queries.journals import JournalIn, JournalRepository, JournalOut, Error
from typing import Union, List, Optional

router = APIRouter()


@router.post("/journals", response_model=Union[JournalOut, Error])
def create_journal(
    journal: JournalIn,
    response: Response,
    repo: JournalRepository = Depends(),
):
    response.status_code = 400
    return repo.create(journal)

@router.get("/journals", response_model=Union[Error, List[JournalOut]])
def get_all(
    repo: JournalRepository = Depends(),
):
    return repo.get_all()


@router.put("/journals/{journal_id}", response_model=Union[JournalOut, Error])
def update_journal(
    journal_id: int,
    journal: JournalIn,
    repo: JournalRepository = Depends(),
) -> Union[Error, JournalOut]:
        return repo.update(journal_id, journal)


@router.delete("/journals/{journal_id}", response_model=bool)
def delete_journal(
    journal_id: int,
    repo: JournalRepository = Depends(),
) -> bool:
    return repo.delete(journal_id)


@router.get("/journals/{journal_id}", response_model=Optional[JournalOut])
def get_journal(
    journal_id: int,
    response: Response,
    repo: JournalRepository = Depends(),
) -> JournalOut:
    journal = repo.get_one(journal_id)
    if journal is None:
        response.status_code = 404
    return journal
