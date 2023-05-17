steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE appointments (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            therapist VARCHAR(255),
            appointment_date DATE,
            appointment_time TIME,
            cost DECIMAL(10, 2)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE appointments;
        """,
    ]
]
