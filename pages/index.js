import StatusDetail from "@/components/StatusDetail";
import StatusGraph from "../components/StatusGraph";
import { useState } from "react";

export default function Home() {
    return (
        <main className="bg-[#e3e3e3] h-100%">
            {/* top bar */}
            <div className="bg-[#255c2a]">
                <h1 className="flex justify-center font-sans py-5 text-5xl text-white">
                    {" "}
                    Plantmeter{" "}
                </h1>
            </div>
            <div className="px-7">
                <h1 className="flex justify-left font-sans pt-4 pb-2 text-4xl text-black">
                    {" "}
                    Dashboard{" "}
                </h1>
                <div className="flex gap-5 justify-center pb-4 font-sans">
                    {/* overall status */}
                    <div className="w-5/12 h-64 flex flex-col flex-wrap">
                        <h2 className="bg-[#d6aa0f] flex justify-center font-sans text-2xl text-wihte">
                            Overall Status: ...
                        </h2>
                    </div>
                    {/* stats */}
                    <StatusDetail />
                </div>
            </div>
            {/* graph */}
            <StatusGraph />
        </main>
    );
}
