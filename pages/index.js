import StatusGraph from "../components/StatusGraph";
import { useState } from "react";

export default function Home() {
    return (
        <main>
            {/* top bar */}
            <div>
                <h1>Plant Meter</h1>
            </div>
            <div className="flex">
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
