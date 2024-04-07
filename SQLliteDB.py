import csv
import sqlite3

 #Connecting to the SQLite database
connection = sqlite3.connect("fetal_health_CTG_data.db")

# Creating a cursor object to execute SQL queries on the database
cursor = connection.cursor()

# Table Definition
create_table = '''CREATE TABLE IF NOT EXISTS fetal_health_CTG_data(
                  baseline_FHR_bpm FLOAT,
                  accelerations FLOAT,
                  fetal_movement FLOAT,
                  uterine_contractions FLOAT,
                  light_decelerations FLOAT,
                  severe_decelerations FLOAT,
                  prolonged_decelerations FLOAT,
                  abnorm_ST_Var_Perc FLOAT,
                  mean_ST_Var FLOAT,
                  abnorm_LT_Var_Perc FLOAT,
                  mean_LT_Var FLOAT,
                  FHR_hist_width FLOAT,
                  FHR_hist_min FLOAT,
                  FHR_hist_max FLOAT,
                  FHR_hist_num_peaks FLOAT,
                  FHR_hist_num_zeroes FLOAT,
                  FHR_hist_mode FLOAT,
                  FHR_hist_mean FLOAT,
                  FHR_hist_median FLOAT,
                  FHR_hist_variance FLOAT,
                  FHR_hist_tendency FLOAT,
                  fetal_health INTEGER);'''

# Creating the table if it doesn't exist
cursor.execute(create_table)

# Opening the CSV file
with open("Resources/clean_fetal_health.csv", newline='', encoding='utf-8') as file:
    # Creating a CSV reader
    reader = csv.reader(file)
    # Skip the header row
    next(reader)
    # Iterate over each row in the CSV file and insert data into the table
    for row in reader:
        # Validate and convert data types as needed
        try:
            # SQL query to insert data into the table
            insert_records = '''INSERT INTO fetal_health_CTG_data
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'''
            # Execute the insert statement
            cursor.execute(insert_records, row)
        except ValueError as e:
            print(f"Error inserting row: {row}. Invalid data format: {e}")

# Commit the changes
connection.commit()

# Close the database connection
connection.close()

print("Data has been successfully uploaded to and saved in SQLite database 'fetal_health_CTG_data.db'.")
