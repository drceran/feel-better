from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel


from queries.jotters import (
    JottersRepository,
    JottersIn,
    JottersOut,
)

from typing import Union


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: JottersOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/token", response_model=Union[AccountToken, None])
async def get_token(
    request: Request,
    account: JottersOut = Depends(authenticator.try_get_current_account_data),
    jottersRepo: JottersRepository = Depends(),
) -> Union[AccountToken, None]:
    if account and authenticator.cookie_name in request.cookies:
        print(account)
        accountFromDB = jottersRepo.get_one(account["id"])
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": accountFromDB,
        }


@router.post("/api/accounts", response_model=AccountToken)
async def create_account(
    info: JottersIn,
    request: Request,
    response: Response,
    accounts: JottersRepository = Depends(),
):
    plain_password = info.password
    hashed_password = authenticator.hash_password(info.password)
    try:
        info.password = hashed_password
        account = accounts.create(info)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=plain_password)

    token = await authenticator.login(response, request, form, accounts)

    return AccountToken(account=account, **token.dict())
