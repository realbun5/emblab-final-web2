import React from "react";
import Image from "next/image";

export default function OverAllStatus() {
    return (
        <div className="w-5/12 h-auto flex flex-col flex-wrap">
            <h2 className="bg-[#d6aa0f] flex flex-grow justify-center items-center font-aleo text-white text-md md:text-lg lg:text-xl xl:text-2xl">
                Overall Status: ...
            </h2>
            <Image
                className="flex flex-grow items-center mx-auto"
                src={"/plant.png"}
                width={200}
                height={200}
                alt="header image"
            />
        </div>
    );
}
