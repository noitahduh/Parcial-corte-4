"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getMovie, getErrorMessage } from "@/lib/api";
import { getDayName } from "@/lib/format";
import type { MovieDetail } from "@/types";
import { ErrorMessage, LoadingMessage } from "@/components/Messages";

export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMovie(id)
      .then(setMovie)
      .catch((e) => setError(getErrorMessage(e)))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingMessage />;
  if (error || !movie) return <ErrorMessage message={error || "Movie not found"} />;

  return (
    <section>
      <Link href="/" className="text-sm text-blue-700 underline">
        &larr; Back to movies
      </Link>

      <h1 className="mt-4 text-2xl font-bold">{movie.title}</h1>
      <p className="text-gray-600">
        {movie.duration} min &middot; {movie.genre}
      </p>
      <p className="mt-2 max-w-2xl text-gray-700">{movie.description}</p>

      <h2 className="mb-3 mt-8 text-xl font-semibold">Screenings</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {movie.screenings.map((screening) => (
          <Link
            key={screening.id}
            href={`/movies/${movie.id}/${screening.id}`}
            className="rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <p className="font-semibold">{getDayName(screening.date)}</p>
            <p className="text-sm text-gray-600">Date: {screening.date}</p>
            <p className="text-sm text-gray-600">
              {screening.startTime} &middot; {screening.room}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
