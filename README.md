# InfinityEcho

## Presidential Election Results and Electoral Map Project Setup:

Prerequisite

## Follow Docs folder to make project environment ready

1. Install_MySQL.txt
2. Install_Apache_Spark.txt
3. Install_Apache_Kafka.txt
4. Install_InfluxDB.txt
5. Install_Telegraf.txt

## Clone the source code from Github

git clone https://github.com/DaXuaBa/InfinityEcho.git

## Install dependency packages:

cd InfinityEcho

cd backend

pip install -r requirements.txt

cd

npm install

cd frontend

npm install

## Run Data Processing Pipeline application(Spark Streaming):

spark-submit --master local[*] --packages org.apache.spark:spark-sql-kafka-0-10_2.13:3.5.1 ./InfinityEcho/stream_processing/data_processing/streaming.py

## Run Website:

cd InfinityEcho

npm start

using below url,

http://127.0.0.1:5173
