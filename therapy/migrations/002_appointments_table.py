steps = [
    [
        # "Up" SQL statement
        """
        CREATE TYPE appt_type AS ENUM ('client', 'therapist');

        CREATE TABLE appointments (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER REFERENCES jotters(id) NOT NULL,
            therapist_id INTEGER REFERENCES jotters(id) NOT NULL,
            appointment_date DATE NOT NULL,
            appointment_time TIME NOT NULL,
            cost DECIMAL(10, 2) NOT NULL
        );

        CREATE OR REPLACE FUNCTION check_therapist_id_is_therapist() RETURNS TRIGGER AS $$
        BEGIN
            IF (SELECT type FROM jotters WHERE id = NEW.therapist_id) != 'therapist' THEN
            RAISE EXCEPTION 'Appointee must be a therapist';
        END IF;
        RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER appointee_check BEFORE INSERT OR UPDATE ON appointments
        FOR EACH ROW EXECUTE PROCEDURE check_therapist_id_is_therapist();

        """,
        # "Down" SQL statement
        """
        DROP TABLE appointments;
        """,
    ],
]
