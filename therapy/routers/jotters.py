from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.jotters import (
    Error,
    JottersIn,
    JottersOut,
    JottersRepository,
)


router = APIRouter()


@router.post("/jotters", response_model=Union[JottersOut, Error])
def create_jotter(
    jotter: JottersIn, response: Response, repo: JottersRepository = Depends()
):
    response.status_code = 400
    return repo.create(jotter)


@router.get("/jotters", response_model=Union[Error, List[JottersOut]])
def get_all_jotters(
    repo: JottersRepository = Depends(),
):
    return repo.get_all_jotters()
