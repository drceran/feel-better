steps = [
    [
        # "Up" SQL statement
        """
        CREATE TYPE user_type AS ENUM ('client', 'therapist');
        CREATE TABLE people (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name  VARCHAR(1000) NOT NULL,
            last_name VARCHAR(1000) NOT NULL,
            email VARCHAR(1000) NOT NULL,
            type user_type NOT NULL,
            phone_number INTEGER NOT NULL,
            city VARCHAR(1000) NOT NULL,
            state VARCHAR(1000) NOT NULL,
            balance INTEGER,
            certificates VARCHAR(2000),
            graduated_college VARCHAR(1000),
            profile_picture VARCHAR(1000),
            about_me VARCHAR(2000)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE people;
        """
    ],
]
