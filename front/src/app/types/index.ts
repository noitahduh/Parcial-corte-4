export interface Station {
    id:string
    name:string
    x:number
    Y:number
    capacity:number
    avaliableBikes:number

}

export interface Screening {
  id: string;
  StationId: string;
  date: string;
  startTime: string;
  room: string;
}

// GET /Stations/:id devuelve la pelicula + sus horarios
export interface StationDetail extends Station {
  screenings: Screening[];
}

export interface Rental {
  id: string;
  screeningId: string;
  seatNumber: number;
  uniqueCode: string;
}
