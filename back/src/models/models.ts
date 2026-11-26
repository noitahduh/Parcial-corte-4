export type BikeType = 'CLASSIC' | 'ELECTRIC';

export class Station {
    id: string;
    name: string;
    x: number; // map position, 0-100 (percentage from the left)
    y: number; // map position, 0-100 (percentage from the top)
    capacity: number; // total docks
}

export class Bike {
    id: string;
    type: BikeType;
    battery: number | null; // 0-100, only for ELECTRIC bikes
    stationId: string | null; // null while the bike is being rented
}

export class Rental {
    id: string;
    bikeId: string;
    stationId: string; // station where the bike was taken
    startedAt: string; // ISO date
}
