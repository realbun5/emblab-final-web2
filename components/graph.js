"use client";

import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { testData } from "@/test/testGraphData";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

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

const TIME_PER_DATA = [
    {
        label: "hour",
        time: 60 * 60,
    },
    {
        label: "day",
        time: 24 * 60 * 60,
    },
    {
        label: "week",
        time: 7 * 24 * 60 * 60,
    },
];

const GRAPH_DATA_TYPES = ["temp", "humid", "soilHumid", "lightLevel"];

const TIME_STEP = 10 * 60;

export default function Graph({ data }) {
    const [graphDataType, setGraphDataType] = useState("temp");
    const [isLoading, setIsLoading] = useState(false);
    const [time, setTime] = useState(60 * 60);

    if (data == null) return <div>loading...</div>;
    data.sort((a, b) => a.time - b.time);
    return (
        <div className="mx-auto max-w-3xl">
            <Line
                options={options}
                data={getGraphData(graphDataType, time, data)}
            />
            <div className="flex justify-between">
                <div className="flex">
                    {GRAPH_DATA_TYPES.map((m) => (
                        <ChangeGraphDataTypeButton
                            key={m}
                            type={m}
                            setType={setGraphDataType}
                        >
                            {m}
                        </ChangeGraphDataTypeButton>
                    ))}
                </div>
                <div className="flex">
                    {TIME_PER_DATA.map((t) => (
                        <ChangeTimeButton
                            key={t.label}
                            time={t.time}
                            setTime={setTime}
                        >
                            {t.label}
                        </ChangeTimeButton>
                    ))}
                </div>
            </div>
        </div>
    );
}

function getGraphData(type, time, data) {
    if (data.length === 0) return [];
    const graphData = {
        labels: [],
        datasets: [
            {
                label: type,
                data: [],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                tension: 0.1,
            },
        ],
    };
    const stopTime = Date.now() / 1000;
    let currentTime = stopTime - time;
    data.forEach((d) => {
        if (d.time > stopTime) return;
        if (d.time < currentTime) return;
        graphData.datasets[0].data.push(d[type]);
        graphData.labels.push(d.time);
        currentTime += TIME_STEP;
    });
    console.log(graphData);
    return graphData;
}

function ChangeGraphDataTypeButton({ type, setType, children }) {
    return (
        <button
            className="border-2 border-black rounded-md p-1 m-1"
            onClick={() => setType(type)}
        >
            {children}
        </button>
    );
}

function ChangeTimeButton({ time, setTime, children }) {
    return (
        <button
            className="border-2 border-black rounded-md p-1 m-1"
            onClick={() => setTime(time)}
        >
            {children}
        </button>
    );
}
