import React, { useState } from "react";
import LineChart from "./LineChart";
import { testData } from "@/test/testGraphData";
import { fetchData } from "@/backend/firebase";
import { useQuery } from "@tanstack/react-query";

const TIME_PER_DATA = [
    {
        label: "W",
        time: 7 * 24 * 60 * 60,
    },
    {
        label: "D",
        time: 24 * 60 * 60,
    },
    {
        label: "H",
        time: 60 * 60,
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
        <div className="mx-auto max-w-3xl py-5">
            <LineChart data={data} type={graphDataType} time={time} />
            <div className="flex justify-between mt-[10px]">
                <div className="flex justify-between gap-2">
                    {GRAPH_DATA_TYPES.map((m) => (
                        <GraphOptionButton
                            key={m}
                            onClick={() => setGraphDataType(m)}
                        >
                            {m}
                        </GraphOptionButton>
                    ))}
                </div>
                <div className="flex justify-between gap-2">
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
            className="min-w-[50px] bg-gray-300 py-2 px-2 text-lg font-bold text-black hover:bg-gray-400 transition duration-100 ease-in-outs"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
