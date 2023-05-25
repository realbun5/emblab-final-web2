import { fetchData } from "@/backend/firebase";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Image from "next/image";
import {
    getTempScore,
    getHumidScore,
    getLightLevelScore,
    getSoilHumidScore,
} from "@/components/OverAllStatus";

const color_score = { 1: "bg-[#dc2626]", 2: "bg-[#fde047]", 3: "bg-[#bef264]" };

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
                <Image
                    className={`mx-2`}
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
                <Image
                    className={`mr-2 ${
                        isLoading
                            ? ""
                            : color_score[
                                  getTempScore(data[data.length - 1].temp)
                              ]
                    }`}
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
                <Image
                    className={`mr-2 ${
                        isLoading
                            ? ""
                            : color_score[
                                  getHumidScore(data[data.length - 1].humid)
                              ]
                    }`}
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
                <Image
                    className={`mr-2 ${
                        isLoading
                            ? ""
                            : color_score[
                                  getSoilHumidScore(
                                      data[data.length - 1].soilHumid
                                  )
                              ]
                    }`}
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
                <Image
                    className={`mr-2 ${
                        isLoading
                            ? ""
                            : color_score[
                                  getLightLevelScore(
                                      data[data.length - 1].lightLevel,
                                      data[data.length - 1].timestamp
                                  )
                              ]
                    }`}
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
