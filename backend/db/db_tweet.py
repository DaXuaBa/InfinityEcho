from influxdb_client import InfluxDBClient
from sqlalchemy import desc
from sqlalchemy.orm.session import Session
from backend.db.models import Summary
import csv
import io
import requests

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

def process_csv_data(client, db: Session):
    query = '''
        from(bucket: "daxuba")
            |> range(start: -30d)
            |> filter(fn: (r) => r["_measurement"] == "trump" or r["_measurement"] == "biden")
            |> group(columns: ["state", "_measurement"])
            |> sum()
        '''
    query_api = client.query_api()
    tables = query_api.query(org='daxuba', query=query)
    
    csv_data = []
    for table in tables:
        for record in table.records:
            csv_data.append({
                'name': record.get_measurement(),
                'state': record.values['state'],
                'total': int(record.get_value())
            })
    
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=["name", "state", "total"])
    writer.writeheader()
    writer.writerows(csv_data)
    output.seek(0)
    csv_text = output.getvalue()

    def create_election_summary(csv_text):
        summary = "Dưới đây là số phiếu bầu của Trump và Biden ở các bang của Mỹ:\n\n"
        lines = csv_text.splitlines()
        headers = lines[0].split(",")
        for line in lines[1:]:
            values = line.split(",")
            entry = dict(zip(headers, values))
            summary += f"Bang: {entry['state']}, Ứng cử viên: {entry['name']}, Số phiếu: {entry['total']}\n"
        summary += "\nViết một đoạn mô tả ngắn về lợi thế của Trump và Biden dựa trên các số liệu trên."
        return summary

    # Tạo nội dung cho "system" và "user"
    system_content = "Phân tích dữ liệu bầu cử và viết đoạn văn ngắn về lợi thế của các ứng cử viên bằng Tiếng Việt"
    user_content = create_election_summary(csv_text)

    payload = {
        "model": "llama-3-8b-chat",
        "messages": [
            {"role": "system", "content": system_content},
            {"role": "user", "content": user_content}
        ]
    }

    llama_url = "http://localhost:8084/v1/chat/completions"
    headers = {'Content-Type': 'application/json'}

    try:
        response = requests.post(llama_url, headers=headers, json=payload)
        
        if response.status_code == 200:
            data = response.json()
            if "choices" in data and len(data["choices"]) > 0:
                llama_response = data["choices"][0]["message"]["content"]
                add_summary = Summary(SUMMARY=llama_response)
                db.add(add_summary)
                db.commit()
                db.refresh(add_summary)
                return {"status": 200, "detail": "Thêm thành công"}
            else:
                return "Phản hồi rỗng từ Llama"
        else:
            return f"Lỗi từ Llama-3: {response.text}"
    except requests.exceptions.ReadTimeout:
        return "Yêu cầu tới Llama bị hết thời gian chờ"
    
async def get_summary(db: Session):
    try:
        last_summary = db.query(Summary).order_by(desc(Summary.CREATED_AT)).first()
        if last_summary:
            return last_summary
        else:
            return None 
    except Exception as e:
        print("Error occurred:", e)