from apscheduler.schedulers.background import BackgroundScheduler
from backend.db.database import get_db
from backend.router.router_tweet import *

scheduler = BackgroundScheduler()

def start_scheduler():
    scheduler.add_job(fetch_and_process_csv_data, 'interval', minutes=5, args=[next(get_db())])

    scheduler.start()

def shutdown_scheduler():
    scheduler.shutdown()

