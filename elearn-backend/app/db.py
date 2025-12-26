# MySQL connection setup for FastAPI
import mysql.connector
from mysql.connector import Error

# Update these with your XAMPP MySQL credentials
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',  # Set your MySQL root password if any
    'database': 'edusphere'
}

def get_db_connection():
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None
