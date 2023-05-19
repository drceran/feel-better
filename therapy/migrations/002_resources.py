steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE resources (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(200) NOT NULL,
            body VARCHAR(1000) NOT NULL,
            writer VARCHAR(200) NOT NULL,
            posted_date TIMESTAMP NOT NULL,
            picture VARCHAR(500) NULL,
            url_link VARCHAR(500) NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE resources;
        """,
    ]
]