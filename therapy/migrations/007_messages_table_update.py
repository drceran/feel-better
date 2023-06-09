steps = [
    [
        # "Up" Table messages SQL statement
        """
        ALTER TABLE messages
        ALTER COLUMN cost SET NOT NULL,
        ALTER COLUMN cost SET DEFAULT 1;
        """,
        # DOWN SQL Statement
        """
        DROP TABLE messages;
        """,
    ],
]
