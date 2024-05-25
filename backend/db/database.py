from influxdb_client import InfluxDBClient

def connect_to_database(url, token, org):
    return InfluxDBClient(url=url, token=token, org=org)

def close_connection(client):
    client.close()

def query_data(client):
    query = '''
        from(bucket: "daxuba")
            |> range(start: -30d)
            |> filter(fn: (r) => r["_measurement"] == "trump" or r["_measurement"] == "biden")
            |> group(columns: ["state_code", "_measurement"])
            |> sum()
        '''
    query_api = client.query_api()
    return query_api.query(org='daxuba', query=query)

def query_time(client):
    query = '''
        from(bucket: "daxuba")
            |> range(start: -30d)
            |> filter(fn: (r) => r["_measurement"] == "trump" or r["_measurement"] == "biden")
            |> group(columns: ["state_code", "_measurement"])
            |> last()
        '''
    query_api = client.query_api()
    return query_api.query(org='daxuba', query=query)
