from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime
from queries.pool import pool

class Error(BaseModel):
    message: str

class ResourceIn(BaseModel):
    title: str
    body: str
    writer: str
    picture: Optional[str]
    url_link: Optional[str]


class ResourceOut(ResourceIn):
    id: int
    posted_date: datetime = datetime.now()


class ResourceRepository:
    def get_resource(self, resource_id: int) -> Union[Error, ResourceOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT * FROM resources
                        WHERE id = %s
                        """,
                        [resource_id,]
                    )
                    record = result.fetchone()
                if record:
                    return self.record_to_resource_out(record)
                else:
                    return {"message": "Resource does not exist."}
        except Exception as e:
            return {"message": "Cannot load resource details."}

    def delete_resource(self, resource_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        DELETE FROM resources
                        WHERE id = %s
                        """,
                        [resource_id,]
                    )
                    return True
        except Exception:
            return False

    def update(self, resource_id: int, resource:ResourceIn) -> Union[ResourceOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE resources
                        SET title = %s, body = %s, writer = %s, picture = %s, url_link = %s
                        WHERE id = %s
                        """,
                        [
                            resource.title,
                            resource.body,
                            resource.writer,
                            resource.picture,
                            resource.url_link,
                            resource_id,

                        ]
                    )
                return self.resource_in_to_out(resource_id, resource)
        except Exception:
            return {"message": "Could not update resource."}

    def get_all_resources(self) -> Union[Error, List[ResourceOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, title, body, writer, picture, url_link, posted_date
                        FROM resources
                        ORDER BY posted_date;
                        """
                    )
                    return [self.record_to_resource_out(record) for record in result]
        except Exception:
            return {"message": "Could not get resources."}

    def create(self, resource: ResourceIn) -> ResourceOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO resources
                            (title, body, writer, picture, url_link)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id, posted_date;
                        """,
                        [resource.title, resource.body, resource.writer, resource.picture, resource.url_link]
                    )
                    id, posted_date = result.fetchone()
                    old = resource.dict()
                return ResourceOut(id=id, posted_date=posted_date, **old)
        except Exception:
            return {"message": "Could not create resource."}

    def resource_in_to_out(self, id:int, resource: ResourceIn):
        old_data = resource.dict()
        return ResourceOut(id=id, **old_data)

    def record_to_resource_out(self, record):
        if record and len(record) >= 7:
            return ResourceOut(
                id=record[0],
                title=record[1],
                body=record[2],
                writer=record[3],
                picture=record[4],
                url_link=record[5],
                posted_date=record[6]
            )
        else:
            return None
