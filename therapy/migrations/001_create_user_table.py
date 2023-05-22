steps = [
    [
        # "Up" Table jotter SQL statement
        """
        CREATE TYPE user_type AS ENUM ('client', 'therapist');
        CREATE TABLE jotters (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name  VARCHAR(1000) NOT NULL,
            last_name VARCHAR(1000) NOT NULL,
            email VARCHAR(1000) NOT NULL,
            type user_type NOT NULL,
            phone_number VARCHAR(100) NOT NULL,
            city VARCHAR(1000) NOT NULL,
            state VARCHAR(1000) NOT NULL,
            balance INTEGER,
            certificates VARCHAR(2000),
            graduated_college VARCHAR(1000),
            profile_picture VARCHAR(1000),
            about_me VARCHAR(2000)
        );
        """,
        # DOWN SQL Statement
        """
        DROP TABLE jotters;
        """,
    ],
    [
        # "Up" Table journal SQL statement
        """
        CREATE TYPE mood AS ENUM ('happy', 'sad', 'angry', 'anxious', 'neutral', 'ambitious', 'carefree');
        CREATE TABLE journals (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER REFERENCES jotters(id),
            body TEXT NOT NULL,
            name VARCHAR(255) NOT NULL,
            date_time TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            is_private BOOLEAN NOT NULL DEFAULT FALSE,
            mood mood NOT NULL DEFAULT 'neutral'
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE journals;
        """,
    ],
]
