import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { InfluxDB } from '@influxdata/influxdb-client';
import moment from 'moment';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const token = '9AtNImvui60zbXXO-_n5WWoT2WSqlWCVi6xQvj4qxSYcBx3Vg-DHEEzQoXNqNbn7XKrb-K-0_H4U3KQtqOgiiw==';
const org = 'daxuba';
const bucket = 'daxuba';

const queryApi = new InfluxDB({ url: 'http://172.207.210.69:8086', token }).getQueryApi(org);

const RealTimeChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            const query = `
            from(bucket: "${bucket}")
            |> range(start: -30d)
            |> filter(fn: (r) => r["_measurement"] == "trump" or r["_measurement"] == "biden")
            |> group(columns: ["_measurement"])
            |> aggregateWindow(every: 1m, fn: sum, createEmpty: false)
            |> cumulativeSum(columns: ["_value"])
            |> yield(name: "cumulative_sum")
            `;

            let labels = [];
            let datasets = {
                trump: { label: 'Trump', data: [], borderColor: 'Red', fill: false, pointRadius: 0 },
                biden: { label: 'Biden', data: [], borderColor: 'Blue', fill: false, pointRadius: 0 }
            };

            queryApi.queryRows(query, {
                next: (row, tableMeta) => {
                    const o = tableMeta.toObject(row);
                    labels.push(moment(o._time).format('DD-MM HH:mm'));
                    datasets[o._measurement].data.push(o._value);
                },
                error: (error) => {
                    console.error(error);
                },
                complete: () => {
                    setChartData({
                        labels: labels,
                        datasets: [datasets.trump, datasets.biden]
                    });
                }
            });
        };

        fetchData();
    }, []);

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Total Vote'
                }
            }
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false
            }
        }
    };


    return (
        <div style={{ position: "relative", width: "1000px", height: "500px" }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default RealTimeChart;