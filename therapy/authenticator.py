import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountOut, AccountOutWithPassword
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


authenticator = MyAuthenticator(
    "eyJhbGciOiJIUzI1NiJ9.ew0KICAic3ViIjogIjEyMzQ1Njc4OTAiLA0KICAibmFtZSI6ICJBbmlzaCBOYXRoIiwNCiAgImlhdCI6IDE1MTYyMzkwMjINCn0.QNFyIFL5RDI3w2ZcxWPC_lIWj-xvp_EE7CwSTE0X-w8"
)
