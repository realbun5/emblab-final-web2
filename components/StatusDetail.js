import { fetchData } from "@/backend/firebase";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Image from "next/image";

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
        <div className="w-5/12 h-auto flex flex-col flex-wrap text-md md:text-lg lg:text-xl xl:text-2xl">
            <h2 className="bg-[#255c2a] flex justify-center items-center text-white flex-grow">
                <Image className="mx-2"
                    src={"/clock.png"}
                    width={25}
                    height={25}
                    alt="header image"
                />
                {`Last update: ${
                    isLoading
                        ? "Loading..."
                        : getTimeString(data[data.length - 1].timestamp)
                }`}
            </h2>
            <p className="bg-[#c6c6c6] flex flex-grow items-center pl-2">
                <Image className="mr-2"
                    src={"/temp.png"}
                    width={25}
                    height={25}
                    alt="header image"
                />
                {`Air Temperature: ${
                    isLoading ? "Loading..." : data[data.length - 1].temp
                } °C`}
            </p>
            <p className="bg-[#dadada] flex flex-grow items-center pl-2">
                <Image className="mr-2"
                    src={"/waterdrop.png"}
                    width={25}
                    height={25}
                    alt="header image"
                />
                {`Air Humidity: ${
                    isLoading ? "Loading..." : data[data.length - 1].humid
                } %`}
            </p>
            <p className="bg-[#c6c6c6] flex flex-grow items-center pl-2">
                <Image className="mr-2"
                    src={"/plant.png"}
                    width={25}
                    height={25}
                    alt="header image"
                />
                {`Soil Humidity: ${
                    isLoading ? "Loading..." : data[data.length - 1].soilHumid
                } %`}
            </p>
            <p className="bg-[#dadada] flex flex-grow items-center pl-2">
                <Image className="mr-2"
                    src={"/sun.png"}
                    width={25}
                    height={25}
                    alt="header image"
                />
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
