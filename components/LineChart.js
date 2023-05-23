import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(...registerables);

const TIME_STEP = 10 * 60;
const displayName = {
    temp: "Air Temperature",
    humid: "Air Humidity",
    soilHumid: "Soil Humidity",
    lightLevel: "Light Intensity"
}

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

export default function LineChart({ data, type, time }) {
    return (
        <div className="bg-[white]">
            <h1 className="text-2xl py-1 px-2 text-center">{`${displayName[type]}`}</h1>
            <Line
                options={options}
                data={{
                    labels: getLabels(time),
                    datasets: [
                        {
                            label: type,
                            data: getGraphData(data, type, time),
                            spanGaps: true,
                            tension: 0.1,
                            pointRadius: 0,
                        },
                    ],
                }}
            />
        </div>
    );
}

function getLabels(timeRange) {
    const timeTo = Math.floor(Date.now() / 1000);
    const timeFrom = timeTo - timeRange;
    const labels = Array(Math.floor(timeRange / TIME_STEP))
        .fill(0)
        .map((_, i) => {
            const date = new Date((timeFrom + i * TIME_STEP) * 1000);
            return (
                date.toLocaleDateString("th-TH") +
                " " +
                date
                    .toLocaleTimeString("th-TH")
                    .split(":")
                    .slice(0, 2)
                    .join(":")
            );
        });
    return labels;
}

function getGraphData(data, type, timeRange) {
    const timeTo = Math.floor(Date.now() / 1000) + TIME_STEP;
    const timeFrom = timeTo - timeRange;
    const labels = Array(Math.floor(timeRange / TIME_STEP))
        .fill(0)
        .map((_, i) => timeFrom + i * TIME_STEP);

    const graphData = Array(Math.floor(timeRange / TIME_STEP)).fill(null);

    data.forEach((d) => {
        for (let i = 0; i < labels.length - 1; i++) {
            if (labels[i] <= d.timestamp && d.timestamp < labels[i + 1]) {
                graphData[i] = d[type];
                // break;
            }
        }
    });

    return graphData;
}
