from pydantic import BaseModel


class PackageIn(BaseModel):
    credits: int


class PackageOut(BaseModel):
    total_credit: int
