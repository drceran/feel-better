import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.jotters import (
    JottersRepository,
    JottersOutWithPassword,
    JottersOut,
)


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        accounts: JottersRepository,
    ):
        # Use your repo to get the account based on the
        # email (which could be an email)
        return accounts.get_one_by_email(email)

    def get_account_getter(
        self,
        accounts: JottersRepository = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: JottersOutWithPassword):
        # Return the encrypted password value from your
        # account object
        return account.password

    def get_account_data_for_cookie(self, account: JottersOut):
        # Return the email and the data for the cookie.
        # You must return TWO values from this method.
        return account.email, JottersOut(**account.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
