from fastapi import APIRouter, Depends, Response
from typing import Union, List, Dict
from authenticator import authenticator
from queries.messages import (
    MessageIn,
    MessageRepository,
    MessageOut,
    Error,
)

router = APIRouter()


@router.post("/messages", response_model=Union[MessageOut, Error])
def create_message(
    message: MessageIn,
    repo: MessageRepository = Depends(),
    # user_data: Dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(message)


@router.get("/messages", response_model=Union[List[MessageOut], Error])
def get_all_messages(
    repo: MessageRepository = Depends(),
    # user_data: Dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_messages()


@router.delete("/messages/{message_id}", response_model=bool)
def delete_message(
    message_id: int,
    repo: MessageRepository = Depends(),
    # user_data: Dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_message(message_id)


@router.get(
    "/messages/{message_id}",
    response_model=Union[Error, MessageOut],
)
def get_one_message(
    message_id: int,
    repo: MessageRepository = Depends(),
    # user_data: Dict = Depends(authenticator.get_current_account_data),
) -> Union[MessageOut, Error]:
    return repo.get_one_message(message_id)


@router.put(
    "/messages/{message_id}",
    response_model=Union[MessageOut, Error],
)
def update_message(
    message_id: int,
    message: MessageIn,
    repo: MessageRepository = Depends(),
    # user_data: Dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, MessageOut]:
    return repo.update_message(message_id, message)
