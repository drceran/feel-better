from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional, Dict
from queries.jotters import (
    Error,
    JottersIn,
    JottersOut,
    JottersRepository,
)
from authenticator import authenticator

from queries.packages import PackageIn

from queries.packages import PackageOut

router = APIRouter()


@router.post("/jotters", response_model=Union[JottersOut, Error])
def create_jotter(
    jotter: JottersIn,
    response: Response,
    repo: JottersRepository = Depends(),
    account_data: Dict = Depends(authenticator.get_current_account_data),
):
    # response.status_code = 400
    return repo.create(jotter)


@router.get("/jotters", response_model=Union[Error, List[JottersOut]])
def get_all_jotters(
    repo: JottersRepository = Depends(),
    account_data: Dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_jotters()


@router.put("/jotters/{jotter_id}", response_model=Union[JottersOut, Error])
def update_jotter(
    jotter_id: int,
    jotter: JottersIn,
    repo: JottersRepository = Depends(),
    account_data: Dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, JottersOut]:
    try:
        return repo.update_jotter(jotter_id, jotter)
    except Exception as e:
        print(e)


@router.delete("/jotters/{jotter_id}", response_model=bool)
def delete_jotter(
    jotter_id: int,
    repo: JottersRepository = Depends(),
    account_data: Dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(jotter_id)


@router.get("/jotters/{jotter_id}", response_model=Optional[JottersOut])
def get_one_jotter(
    jotter_id: int,
    response: Response,
    repo: JottersRepository = Depends(),
    account_data: Dict = Depends(authenticator.get_current_account_data),
) -> JottersOut:
    jotter = repo.get_one(jotter_id)
    if jotter is None:
        response.status_code = 404
    return jotter


@router.put(
    "/packages/buy",
    response_model=Union[PackageOut, Error],
)
def buy_package(
    package: PackageIn,
    jotter_repo: JottersRepository = Depends(),
    user_data: Dict = Depends(authenticator.get_current_account_data),
) -> Union[PackageOut, Error]:
    return jotter_repo.change_balance(user_data["id"], package.credits)
