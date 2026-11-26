"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Stations {
  id: string;
  name: string;
  x: string;
  y: number;
  capacity: string;
  avaliableBikes: string;

}

export default function HomePage() {
  const [stations, setStations] = useState<Stations[]>([]);

  useEffect(() => {
    axios.get<Stations[]>("http://localhost:30002/stations").then((res) => {
      setStations(res.data);
    });
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stations.map((station) => (
          <Link
            key={station.id}
            href={`/stations/${station.id}`}
            className="border p-4 block"
          >
            <h2 className="text-lg font-bold">{station.name}</h2>
            <p>X: {station.x}</p>
            <p>Y: {station.y}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}