from fastapi import APIRouter, Depends
from queries.resources import ResourceIn, ResourceRepository

router = APIRouter()


@router.post("/resources")
def create_resource(resource: ResourceIn, repo: ResourceRepository = Depends()):
    return repo.create(resource)
