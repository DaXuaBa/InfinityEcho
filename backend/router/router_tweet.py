from fastapi import APIRouter, Depends, BackgroundTasks
from backend.db.db_tweet import *
from backend.db.database import get_db
from backend.schemas import *
from backend.db.biden_data_processing import *
from backend.db.trump_data_processing import *
from pydantic import BaseModel

router = APIRouter()

class AnyData(BaseModel):
    pass

URL = 'http://172.207.210.69:8086'
TOKEN = '9AtNImvui60zbXXO-_n5WWoT2WSqlWCVi6xQvj4qxSYcBx3Vg-DHEEzQoXNqNbn7XKrb-K-0_H4U3KQtqOgiiw=='
ORG = 'daxuba'

@router.get('/get_data')
async def get_data():
    client = connect_to_database(URL, TOKEN, ORG)
    result = query_data(client)
    json_data = []
    for table in result:
        for record in table.records:
            fields = {
                'name': record.values['_measurement'],  
                'state_code': record.values['state_code'],
                'total': int(record.values['_value']),
            }
            json_data.append(fields)
    close_connection(client)
    return json_data

@router.get('/get_time')
async def get_time_router():
    client = connect_to_database(URL, TOKEN, ORG)
    result = query_time(client)
    json_data = []
    for table in result:
        for record in table.records:
            fields = {
                'state_code': record.values['state_code'],
                'time': record.values['_time'].strftime('%Y-%m-%d %H:%M:%S')
            }
            json_data.append(fields)
    close_connection(client)
    return json_data

def fetch_and_process_csv_data(db: Session = Depends(get_db)):
    client = connect_to_database(URL, TOKEN, ORG)
    try:
        csv_data = process_csv_data(client, db=db)
        close_connection(client)
        return csv_data
    except Exception as e:
        return print("error: " + str(e))
    
@router.get('/get_summary', response_model=SummaryBase)
async def get_last_summary(db: Session = Depends(get_db)):
    return await get_summary(db=db)

@router.post("/biden_receive")
def receive_json(background_tasks: BackgroundTasks, data: AnyData, db: Session = Depends(get_db)):
    background_tasks.add_task(call_api_biden, db)
    return {"message": "Task completed"}

@router.post("/trump_receive")
def receive_json(background_tasks: BackgroundTasks, data: AnyData, db: Session = Depends(get_db)):
    background_tasks.add_task(call_api_trump, db)
    return {"message": "Task completed"}