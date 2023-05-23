import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(...registerables);

const TIME_STEP = 10 * 60;

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: "status chart",
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
        <div>
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
        .map(
            (_, i) => new Date((timeFrom + i * TIME_STEP) * 1000).toISOString()
            // TODO: timezone issue+  format date
        );
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
