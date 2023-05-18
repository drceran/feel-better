steps = [
    [
        # "Up" Table journal SQL statement
        """
        CREATE TYPE mood AS ENUM ('happy', 'sad', 'angry', 'anxious', 'neutral', 'ambitious', 'carefree');
        CREATE TABLE journals (
            id SERIAL PRIMARY KEY NOT NULL,
            body TEXT NOT NULL,
            user INTEGER NOT NULL,
            date_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            is_private BOOLEAN NOT NULL DEFAULT FALSE,
            mood mood NOT NULL DEFAULT 'neutral'

        );
        """,

        # "Down" SQL statement
        """
        DROP TABLE journal;
        """
    ]
]
