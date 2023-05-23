steps = [
    [
        # "Up" Table jotter SQL statement
        """
        ALTER TABLE jotters
        ADD password VARCHAR(2000) NOT NULL;
        """,
        # DOWN SQL Statement
        """
        ALTER TABLE jotters
        DROP COLUMN password;
        """,
    ],
]
