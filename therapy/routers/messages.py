from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from authenticator import authenticator
from queries.messages import (
    MessageIn,
    MessageRepository,
    MessageOut,
    Error,
)
from queries.jotters import JottersRepository

router = APIRouter()


@router.post("/messages", response_model=Union[MessageOut, Error])
async def create_message(
    message: MessageIn,
    response: Response,
    repo: MessageRepository = Depends(),
    message_data: dict = Depends(authenticator.get_current_account_data),
    jotter_repo: JottersRepository = Depends(),
):
    message.user_id = message_data["id"]
    current_balance = jotter_repo.get_one(message_data["id"]).balance
    if current_balance < 1:
        return Error(message="Your balance is insufficient to send a message")
    result = repo.create(message)
    jotter_repo.change_balance(message_data["id"], -1)
    return result


@router.get("/messages", response_model=Union[List[MessageOut], Error])
async def get_all_messages(
    repo: MessageRepository = Depends(),
    message_data: dict = Depends(authenticator.get_current_account_data),
):
    if message_data and authenticator.cookie_name:
        user_id = message_data["id"]
        return repo.get_all_messages(user_id)
    return Error(message="Authentication failed")


@router.delete("/messages/{message_id}", response_model=bool)
async def delete_message(
    message_id: int,
    repo: MessageRepository = Depends(),
    message_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_message(message_id)


@router.put("/messages/{message_id}", response_model=Union[MessageOut, Error])
async def update_message(
    message_id: int,
    message: MessageIn,
    repo: MessageRepository = Depends(),
    message_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, MessageOut]:
    return repo.update_message(message_id, message)


@router.get("/messages/{message_id}", response_model=Optional[MessageOut])
async def get_one_message(
    message_id: int,
    response: Response,
    repo: MessageRepository = Depends(),
    message_data: dict = Depends(authenticator.get_current_account_data),
) -> MessageOut:
    if message_data and authenticator.cookie_name:
        user_id = message_data["id"]
        return repo.get_one_message(user_id, message_id)
    return Error(message="Authentication failed")
