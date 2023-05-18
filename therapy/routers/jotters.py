from fastapi import APIRouter, Depends
from queries.jotters import JottersIn, JottersRepository


router = APIRouter()


@router.post("/jotters")
def create_jotter(jotter: JottersIn, repo: JottersRepository = Depends()):
    return repo.create(jotter)
