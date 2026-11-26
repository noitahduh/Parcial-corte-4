import axios from "axios";
import type { Station, StationDetail, Reservation } from "@/types";

// Un solo cliente Axios para toda la app. La URL vive en .env.local
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002",
});

export async function getStations() {
  const { data } = await api.get<Station[]>("/Stations");
  return data;
}

export async function getStation(id: string) {
  const { data } = await api.get<StationDetail>(`/Stations/${id}`);
  return data;
}

export async function getReservations() {
  const { data } = await api.get<Reservation[]>("/reservations");
  return data;
}

// Numeros de asiento ya reservados en UN horario (el API devuelve las reservas de todos)
export async function getReservedSeats(screeningId: string) {
  const all = await getReservations();
  return all.filter((r) => r.screeningId === screeningId).map((r) => r.seatNumber);
}

export async function createReservation(screeningId: string, seatNumber: number) {
  const { data } = await api.post<Reservation>("/reservations", {
    screeningId,
    seatNumber,
  });
  return data;
}

// Convierte cualquier error en un texto que se puede mostrar en pantalla
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? "Could not reach the server. Is the API running?";
  }
  return "Something went wrong.";
}
