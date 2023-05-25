steps = [
    [
        """
        CREATE TYPE type AS ENUM ('client', 'therapist');

        CREATE TABLE resources (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(200) NOT NULL,
            body VARCHAR(1000) NOT NULL,
            writer INTEGER REFERENCES jotters(id),
            picture VARCHAR(500) NULL,
            url_link VARCHAR(500) NULL,
            posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );

        CREATE OR REPLACE FUNCTION check_writer_is_therapist() RETURNS TRIGGER AS $$
        BEGIN
            IF (SELECT type FROM jotters WHERE id = NEW.writer) != 'therapist' THEN
            RAISE EXCEPTION 'Writer must be a therapist';
        END IF;
        RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER writer_check BEFORE INSERT OR UPDATE ON resources
        FOR EACH ROW EXECUTE PROCEDURE check_writer_is_therapist();
        """,
        """
        DROP TABLE resources;
        """,
    ],
]

# $$ is a string literal and we need string literals to be able to filter through data
# after filtering we need to tell the PostgreSQL engine know what language to interpretate the data in
# we create a trigger to check if the writer is a client or therapist before we can insert or update resources
# execute procedure calls on function
