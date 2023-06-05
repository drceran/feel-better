steps = [
    [
        # "Up" Table jotter SQL statement
        """
        ALTER TABLE jotters
        ALTER COLUMN first_name DROP NOT NULL ,
        ALTER COLUMN last_name DROP NOT NULL ,
        ALTER COLUMN phone_number DROP NOT NULL ,
        ALTER COLUMN city DROP NOT NULL ,
        ALTER COLUMN state DROP NOT NULL,
        ALTER COLUMN balance SET DEFAULT 0;
        """,
        # DOWN SQL Statement
        """
        ALTER TABLE jotters
        ALTER COLUMN first_name SET NOT NULL ,
        ALTER COLUMN last_name SET NOT NULL ,
        ALTER COLUMN phone_number SET NOT NULL ,
        ALTER COLUMN city SET NOT NULL ,
        ALTER COLUMN state SET NOT NULL,
        ALTER COLUMN balance DROP DEFAULT;
        """,
    ],
]
