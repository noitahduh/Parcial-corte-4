export interface Station = {
    id:string
    name:string
    x:number
    Y:number
    capacity:number
    avaliableBikes:number

}

export interface Movie {
  id: string;
  title: string;
  description: string;
  duration: number;
  genre: string;
  posterUrl: string;
}

export interface Screening {
  id: string;
  movieId: string;
  date: string;
  startTime: string;
  room: string;
}

// GET /movies/:id devuelve la pelicula + sus horarios
export interface MovieDetail extends Movie {
  screenings: Screening[];
}

export interface Reservation {
  id: string;
  screeningId: string;
  seatNumber: number;
  uniqueCode: string;
}
