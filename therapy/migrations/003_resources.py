steps = [
    [
        """
        CREATE TABLE resources (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(200) NOT NULL,
            body VARCHAR(1000) NOT NULL,
            writer INTEGER REFERENCES jotters(id),
            picture VARCHAR(500) NULL,
            url_link VARCHAR(500) NULL,
            posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL

);
        """,
        """
        DROP TABLE resources;
        """,
    ],
]
