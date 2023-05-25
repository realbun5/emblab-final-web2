import StatusDetail from "@/components/StatusDetail";
import StatusGraph from "../components/StatusGraph";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
    return (
        <main>
            {/* top bar */}
            <div className="bg-[#255c2a]">
                <h1 className="flex justify-center font-aleo py-5 text-5xl text-white">
                    {" "}
                    Plantmeter{" "}
                </h1>
            </div>
            <div className="px-7">
                <h1 className="flex justify-left font-aleo pt-4 pb-2 text-4xl text-black">
                    {" "}
                    Dashboard{" "}
                </h1>
                <div className="flex gap-5 justify-center pb-4 font-aleo">
                    {/* overall status */}
                    <div className="w-5/12 h-auto flex flex-col flex-wrap">
                        <h2 className="bg-[#d6aa0f] flex flex-grow justify-center items-center font-aleo text-white text-md md:text-lg lg:text-xl xl:text-2xl">
                            Overall Status: ...
                        </h2>
                        <Image className="flex flex-grow items-center mx-auto"
                            src={"/plant.png"}
                            width={200}
                            height={200}
                            alt="header image"
                        />
                    </div>
                    {/* stats */}
                    <StatusDetail className="font-aleo"/>
                </div>
            </div>
            {/* graph */}
            <div className="px-7">
                <h1 className="flex justify-left font-aleo pt-4 pb-3 text-4xl text-black">
                        {" "}
                        Summary{" "}
                </h1>
                <div className="bg-[#c6c6c6] px-2 mb-6">
                    <StatusGraph /> 
                </div>
            </div>
        </main>
    );
}
