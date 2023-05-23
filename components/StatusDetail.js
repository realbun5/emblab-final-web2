import { fetchData } from "@/backend/firebase";
import { useQuery } from "@tanstack/react-query";
import React from "react";

async function getData() {
    const data = await fetchData();
    return data;
}

export default function StatusDetail() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["data"],
        queryFn: getData,
    });

    if (data) {
        data.sort((a, b) => a.time - b.time);
    }

    return (
        <div className="w-5/12 h-64 flex flex-col flex-wrap">
            <h2 className="bg-[#255c2a] flex justify-center items-center font-sans text-2xl text-white flex-grow">
                {`⏰ Last update: ${
                    isLoading
                        ? "Loading..."
                        : getTimeString(data[data.length - 1].timestamp)
                }`}
            </h2>
            <p className="text-2xl bg-[#c6c6c6] flex flex-grow items-center">
                {`Air Temperature: ${
                    isLoading ? "Loading..." : data[data.length - 1].temp
                } °C`}
            </p>
            <p className="text-2xl bg-[#dadada] flex flex-grow items-center">
                {`Air Humidity: ${
                    isLoading ? "Loading..." : data[data.length - 1].humid
                } %`}
            </p>
            <p className="text-2xl bg-[#c6c6c6] flex flex-grow items-center">
                {`Soil Humidity: ${
                    isLoading ? "Loading..." : data[data.length - 1].soilHumid
                } %`}
            </p>
            <p className="text-2xl bg-[#dadada] flex flex-grow items-center">
                {`Light Intensity: ${
                    isLoading ? "Loading..." : data[data.length - 1].lightLevel
                } %`}
            </p>
        </div>
    );
}

function getTimeString(time) {
    const date = new Date(time * 1000);
    return (
        date.toLocaleDateString("th-TH") +
        " " +
        date.toLocaleTimeString("th-TH").split(":").slice(0, 2).join(":")
    );
}
