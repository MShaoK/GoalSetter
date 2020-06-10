import os
import urllib.parse as up
import psycopg2
from dotenv import load_dotenv
load_dotenv()
url = up.urlparse(os.environ["DATABASE_URL"])
conn = psycopg2.connect(database=url.path[1:],
    user=url.username,
    password=url.password,
    host=url.hostname,
    port=url.port
)

print("successful connection")

cur = conn.cursor()
cur.execute("""

INSERT INTO users (id, first_name, last_name, email)
VALUES 
(1, 'Colin', 'Mai', 'Colinmaisk@gmail.com'),
(2, 'Elizabeth', 'Brown', 'ElizabethBrown@gmail.com'),
(3, 'Ali', 'S', 'Alis@gmail.com');

INSERT INTO projects (id, name, description,start_date, estimate_time, actual_time,user_id)
VALUES
(1, 'productivity project', 'google extension for productivity', '2020-06-06', '23:42:00', null, 1),
(2, 'bitcoin project', 'bitcoin miner', '2020-05-01', '00:50:00', '01:50:00', 3),
(3, 'data scraper', 'google extension for scraping company analytics', '2020-04-16', '02:20:00', '01:50:00', 2),
(4, 'security project', 'hush hush', '2020-8-01', '23:20:00', null, 1),
(5, 'interview takehome', 'job interview', '2020-07-01', '10:00:00', null, 2);

INSERT INTO whitelists (id, urls, project_id)
VALUES
(1, 'www.google.ca', 1),
(2, 'www.youtube.com', 1),
(3, 'www.google.ca', 2),
(4, 'www.google.com', 3),
(5, 'www.youtube.com', 2);

""")
try:
    conn.commit()
    print("inserted into tables successfully")
except:
    print("tables not inserted successfully")

    