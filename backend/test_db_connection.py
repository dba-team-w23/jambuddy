import psycopg2
import os
import pytest


def test_db_connection():

    # Retrieve the database connection details from environment variables
    host = os.getenv("POSTGRES_HOST")
    port = os.getenv("POSTGRES_PORT")
    user = os.getenv("POSTGRES_USER")
    password = os.getenv("POSTGRES_PASSWORD")


    # Attempt to connect to the database
    try:
        conn = psycopg2.connect(
            host=host,
            port=port,
            user=user,
            password=password
        )
        conn.close()
    except Exception as e:
        pytest.fail(f"Error connecting to the database: {e}")
