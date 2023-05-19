from pydantic import BaseModel
from typing import Optional
from datetime import date
from queries.pool import pool

class ResourceIn(BaseModel):
    title: str
    body: str
    writer: str
    posted_date: date
    picture: Optional[str]
    url_link: Optional[str]


class ResourceOut(ResourceIn):
    id: int


class ResourceRepository:
    def create(self, resource: ResourceIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO resources
                        (title, body, writer, posted_date, picture, url_link)
                    VALUES
                        (%s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [resource.title, resource.body, resource.writer, resource.posted_date, resource.picture, resource.url_link]
                )
                id = result.fetchone()[0]
                old = resource.dict()
                return ResourceOut(id=id, **old)
