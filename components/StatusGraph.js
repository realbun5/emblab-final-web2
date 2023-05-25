import React, { useState } from "react";
import LineChart from "./LineChart";
import { fetchData } from "@/backend/firebase";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const TIME_PER_DATA = [
    {
        label: "1D",
        time: 24 * 60 * 60,
    },
    {
        label: "6H",
        time: 6 * 60 * 60,
    },
    {
        label: "1H",
        time: 60 * 60,
    },
];

const GRAPH_DATA_TYPES = [
    {
        label: "temp",
        displayName: "Air Temperature",
        image_src: "/temp.png",
    },
    {
        label: "humid",
        displayName: "Air Humidity",
        image_src: "/waterdrop.png",
    },
    {
        label: "soilHumid",
        displayName: "Soil Humidity",
        image_src: "/plant.png",
    },
    {
        label: "lightLevel",
        displayName: "Light Intensity",
        image_src: "/sun.png",
    },
];

async function getData() {
    const data = await fetchData();
    return data;
}

export default function StatusGraph() {
    const [graphDataType, setGraphDataType] = useState("temp");
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
                            key={m.label}
                            onClick={() => setGraphDataType(m.label)}
                        >
                            <Image
                                src={m.image_src}
                                width={25}
                                height={25}
                                alt="header image"
                            />
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
            className="flex justify-center items-center min-w-[50px] bg-gray-300 py-2 px-2 text-lg font-bold text-black hover:bg-gray-400 transition duration-100 ease-in-outs"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
