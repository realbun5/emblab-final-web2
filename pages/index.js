import StatusGraph from "../components/StatusGraph";
import { useState } from "react";

export default function Home() {
    return (
        <main className="bg-[#C6C6C6]">
            {/* top bar */}
            <div className="bg-[#255c2a]">
                <h1 className="flex justify-center font-sans py-5 text-5xl text-white"> Plant Meter </h1>
            </div>
            <div className="flex gap-5 justify-center py-4 font-sans">
                {/* overall status */}
                <div>
                    <h2>Overall status</h2>
                </div>
                {/* stats */}
                <div>
                    <h2>Stats</h2>
                    <h3>last update: --/--/--:--.--</h3>
                    <div>
                        <p>Temperature: 00</p>
                        <p>Humidity: 00</p>
                        <p>Soil Moisture: 00</p>
                        <p>Light intensity: 00</p>
                    </div>
                </div>
            </div>
            {/* graph */}
            <StatusGraph />
        </main>
    );
}
