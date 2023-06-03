steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE messages (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES jotters(id),
            recipient INTEGER REFERENCES jotters(id),
            subject VARCHAR(1000),
            body TEXT,
            cost DECIMAL(10, 2),
            datetime timestamp NOT NULL DEFAULT now()
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE messages;
        """,
    ]
]
