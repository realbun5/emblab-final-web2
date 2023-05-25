import React from "react";
import Image from "next/image";
import { fetchData } from "@/backend/firebase";
import { useQuery } from "@tanstack/react-query";

const IDEAL_TEMP = 30;
const IDEAL_HUMID = 70;
const IDEAL_SOIL_HUMID = 75;
const IDEAL_LIGHT_LEVEL = 80;
const color_score = {
    0: "",
    1: "bg-[#dc2626]",
    2: "bg-[#fde047]",
    3: "bg-[#bef264]",
};
const overall_rating = {
    0: "Loading...",
    1: "Need help :(",
    2: "Balanced",
    3: "Vital",
};
const overall_pic = {
    0: "/plant.png",
    1: "/overall_1.png",
    2: "/overall_2.png",
    3: "/overall_3.png",
};

async function getData() {
    const data = await fetchData();
    return data;
}

export function getTempScore(temp) {
    if (Math.abs(temp - IDEAL_TEMP) <= 3) {
        return 3;
    } else if (Math.abs(temp - IDEAL_TEMP) <= 6) {
        return 2;
    } else {
        return 1;
    }
}

export function getHumidScore(humid) {
    if (Math.abs(humid - IDEAL_HUMID) <= 10) {
        return 3;
    } else if (Math.abs(humid - IDEAL_HUMID) <= 20) {
        return 2;
    } else {
        return 1;
    }
}

export function getSoilHumidScore(soilHumid) {
    if (Math.abs(soilHumid - IDEAL_SOIL_HUMID) <= 10) {
        return 3;
    } else if (Math.abs(soilHumid - IDEAL_SOIL_HUMID) <= 20) {
        return 2;
    } else {
        return 1;
    }
}

export function getLightLevelScore(lightLevel, time) {
    const hour = new Date(time).getHours();
    if (hour <= 6 || hour >= 18) {
        return 3;
    }
    if (Math.abs(lightLevel - IDEAL_LIGHT_LEVEL) <= 10) {
        return 3;
    } else if (Math.abs(lightLevel - IDEAL_LIGHT_LEVEL) <= 20) {
        return 2;
    } else {
        return 1;
    }
}

function getTotalScore(data, isLoading) {
    if (isLoading) return 0;
    const score =
        getTempScore(data[data.length - 1].temp) +
        getHumidScore(data[data.length - 1].humid) +
        getSoilHumidScore(data[data.length - 1].soilHumid) +
        getLightLevelScore(
            data[data.length - 1].lightLevel,
            data[data.length - 1].time
        );
    if (score >= 10) return 3;
    else if (score >= 7) return 2;
    return 1;
}

export default function OverAllStatus() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["data"],
        queryFn: getData,
    });

    if (data) {
        data.sort((a, b) => a.time - b.time);
    }

    return (
        <div className="w-5/12 h-auto flex flex-col flex-wrap bg-[#C6C6C6]">
            <h2
                className={`${
                    isLoading
                        ? ""
                        : color_score[getTotalScore(data, isLoading)]
                } 
            flex flex-grow justify-center items-center font-aleo text-black text-md md:text-lg lg:text-xl xl:text-2xl`}
            >
                Overall Status: {overall_rating[getTotalScore(data, isLoading)]}
            </h2>
            <Image
                className="flex flex-grow items-center mx-auto"
                src={overall_pic[getTotalScore(data, isLoading)]}
                width={200}
                height={200}
                alt="header image"
            />
        </div>
    );
}
