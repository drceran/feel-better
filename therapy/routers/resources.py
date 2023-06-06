from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional  # union means more than one thing
from queries.resources import (
    ResourceIn,
    ResourceRepository,
    ResourceOut,
    Error,
)

router = APIRouter()


@router.post("/resources", response_model=Union[ResourceOut, Error])
def create_resource(
    resource: ResourceIn,
    response: Response,
    repo: ResourceRepository = Depends(),
):
    return repo.create(resource)


@router.get("/resources", response_model=Union[Error, List[ResourceOut]])
def get_all_resources(
    repo: ResourceRepository = Depends(),
):
    return repo.get_all_resources()


@router.get("/resources/{resource_id}", response_model=Optional[ResourceOut])
def get_resource(
    resource_id: int, repo: ResourceRepository = Depends()
) -> bool:
    return repo.get_resource(resource_id)


@router.delete("/resources/{resource_id}", response_model=bool)
def delete_resource(
    resource_id: int, repo: ResourceRepository = Depends()
) -> bool:
    return repo.delete_resource(resource_id)


@router.put(
    "/resources/{resource_id}", response_model=Union[Error, ResourceOut]
)
def update_resource(
    resource_id: int,
    resource: ResourceIn,
    repo: ResourceRepository = Depends(),
) -> Union[Error, ResourceOut]:
    return repo.update(resource_id, resource)
