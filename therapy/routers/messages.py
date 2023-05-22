from fastapi import APIRouter, Depends, Response
from typing import Union, List
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
):
    return repo.create(message)


@router.get("/messages", response_model=Union[List[MessageOut], Error])
def get_all_messages(
    repo: MessageRepository = Depends(),
):
    return repo.get_all_messages()


@router.delete(
    "/messages/{message_id}",
    response_model=bool,
)
def delete_message(
    message_id: int,
    repo: MessageRepository = Depends(),
) -> bool:
    return repo.delete_message(message_id)


@router.get(
    "/messages/{message_id}",
    response_model=Union[Error, MessageOut],
)
def get_one_message(
    message_id: int,
    repo: MessageRepository = Depends(),
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
) -> Union[Error, MessageOut]:
    return repo.update_message(message_id, message)
