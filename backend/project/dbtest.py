import os
import psycopg2


def db_test():
    try:
        conn = getDbConn()
        cur = conn.cursor()

        # Get all rows
        sql = "SELECT * FROM MusicGenre"
        cur.execute(sql)
        print("--Number of rows: ", cur.rowcount)

        row = cur.fetchone()
        while row is not None:
            print(row)
            row = cur.fetchone()

        # Get one row, use prepared statement for security
        sql = "SELECT * FROM MusicGenre WHERE ID = %s"
        params = (3,)
        cur.execute(sql, params)
        row = cur.fetchone()
        print("--Just one row")
        print(row)

        # Get multiple rows, use prepared statement for security
        sql = "SELECT fname, lname, state, note \
            FROM Users \
            WHERE state = %s \
            AND note = %s"
        params = ("CA", "A")
        cur.execute(sql, params)

        print("--Multiple rows")
        row = cur.fetchone()
        while row is not None:
            print(row)
            row = cur.fetchone()

        cur.close()

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            conn.close()


def getDbConn():
    return psycopg2.connect(
        dbname=os.getenv("POSTGRES_USER"), 
        user=os.getenv("POSTGRES_USER"),
        password=os.getenv("POSTGRES_PASSWORD"),
        host=os.getenv("POSTGRES_HOST"))


if __name__ == '__main__':
    db_test()