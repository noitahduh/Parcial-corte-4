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
  const [movies, setMovies] = useState<Stations[]>([]);

  useEffect(() => {
    axios.get<Stations[]>("http://localhost:30002/stations").then((res) => {
      setMovies(res.data);
    });
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movies/${movie.id}`}
            className="border p-4 block"
          >
            <h2 className="text-lg font-bold">{movie.title}</h2>
            <p>Duration: {movie.duration} min</p>
            <p>Genre: {movie.genre}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}