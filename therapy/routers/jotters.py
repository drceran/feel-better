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


@router.put("/jotters/{jotter_id}", response_model=Union[JottersOut, Error])
def update_jotter(
    jotter_id: int,
    jotter: JottersIn,
    repo: JottersRepository = Depends(),
) -> Union[Error, JottersOut]:
    try:
        return repo.update_jotter(jotter_id, jotter)
    except Exception as e:
        print(e)
