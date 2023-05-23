import React, { useState } from "react";
import LineChart from "./LineChart";
import { testData } from "@/test/testGraphData";
import { fetchData } from "@/backend/firebase";
import { useQuery } from "@tanstack/react-query";

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

async function getData() {
    const data = await fetchData();
    return data;
}

export default function StatusGraph() {
    const [graphDataType, setGraphDataType] = useState("temp");
    // const [isLoading, setIsLoading] = useState(false);
    const [time, setTime] = useState(60 * 60);

    const { data, isLoading, error } = useQuery({
        queryKey: ["data"],
        queryFn: getData,
    });

    if (isLoading) return <div>Loading...</div>;
    data.sort((a, b) => a.time - b.time);
    return (
        <div className="mx-auto max-w-3xl">
            <LineChart data={data} type={graphDataType} time={time} />
            <div className="flex justify-between">
                <div className="flex">
                    {GRAPH_DATA_TYPES.map((m) => (
                        <GraphOptionButton
                            key={m}
                            onClick={() => setGraphDataType(m)}
                        >
                            {m}
                        </GraphOptionButton>
                    ))}
                </div>
                <div className="flex">
                    {TIME_PER_DATA.map((t) => (
                        <GraphOptionButton
                            key={t.label}
                            onClick={() => setTime(t.time)}
                        >
                            {t.label}
                        </GraphOptionButton>
                    ))}
                </div>
            </div>
        </div>
    );
}

function GraphOptionButton({ onClick, children }) {
    return (
        <button
            className="border-2 border-black rounded-md p-1 m-1"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
