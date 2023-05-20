"use client";

import Image from "next/image";
import Graph from "../components/graph";
import { useEffect, useState } from "react";
import { fetchData } from "@/backend/firebase";

export default function Home() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchData().then((data) => {
            setData(data);
            setIsLoading(false);
        });
    }, []);

    console.log({ data });
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
            <Graph data={data} />
        </main>
    );
}
