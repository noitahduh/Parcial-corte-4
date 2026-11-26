"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStations, getErrorMessage } from "src/app/lib/api";
import type { Station } from "@/types";

export default function HomePage() {
  const [Stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getStations()
      .then(setStations)
      .catch((e) => setError(getErrorMessage(e)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">Stations</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Stations.map((Station) => (
          <Link
            key={Station.id}
            href={`/Stations/${Station.id}`}
            className="rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-lg font-semibold">{Station.title}</h2>
            <p className="text-sm text-gray-600">Duration: {Station.duration} min</p>
            <p className="text-sm text-gray-600">Genre: {Station.genre}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
