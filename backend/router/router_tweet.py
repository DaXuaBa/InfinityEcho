from fastapi import APIRouter
from backend.db.database import *
router = APIRouter()

@router.get('/get_data')
async def get_data():
    client = connect_to_database(
        'http://34.105.70.61:8086', 
        'WQ4gPkdoKvsTeLlNEnDJlFYn4VawArsIhki2KcHK8rJBoiJYif1KIHB-oJHjYD0QDLJz0quk0cnldFplbYaunA==', 
        'daxuba'
    )
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
    client = connect_to_database(
        'http://34.105.70.61:8086', 
        'WQ4gPkdoKvsTeLlNEnDJlFYn4VawArsIhki2KcHK8rJBoiJYif1KIHB-oJHjYD0QDLJz0quk0cnldFplbYaunA==', 
        'daxuba'
    )
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
