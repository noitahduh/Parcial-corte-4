import axios from "axios";
import type { Station, StationDetail, Rental } from "/types"

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

export async function getRentals() {
  const { data } = await api.get<Rental[]>("/Rentals");
  return data;
}

// Numeros de asiento ya reservados en UN horario (el API devuelve las reservas de todos)
export async function getReservedBikes(screeningId: string) {
  const all = await getRentals();
  return all.filter((r) => r.screeningId === screeningId).map((r) => r.BikeNumber);
}

export async function createRental(screeningId: string, BikeNumber: number) {
  const { data } = await api.post<Rental>("/Rentals", {
    screeningId,
    BikeNumber,
  });
  return data;
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? "Could not reach the server. Is the API running?";
  }
  return "Something went wrong.";
}
