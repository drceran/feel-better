steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE jotters (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            thoughts TEXT
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE jotters;
        """,
    ]
]
