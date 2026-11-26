import { Injectable, NotFoundException } from '@nestjs/common';
import { Bike, Station } from '../models/models';

// [name, x, y, capacity, bikes docked at start]
const SEED: [string, number, number, number, number][] = [
    ['Central Park', 50, 45, 12, 10],
    ['University Campus', 20, 25, 10, 6],
    ['Main Station', 75, 20, 12, 3],
    ['Harbor Docks', 85, 60, 8, 1],
    ['Old Town Square', 35, 65, 10, 10], // full: no free docks
    ['Tech Hub', 60, 80, 8, 0], // empty: no bikes
    ['Riverside', 15, 70, 6, 2],
    ['City Hospital', 45, 15, 8, 4],
    ['Stadium', 90, 30, 10, 2],
];
const BATTERIES = [90, 70, 55, 35, 12, 80]; // cycled over the electric bikes

@Injectable()
export class StationsService {
    private readonly stations: Station[] = [];
    private readonly bikes: Bike[] = [];

    constructor() {
        let electricCount = 0;
        SEED.forEach(([name, x, y, capacity, docked], index) => {
            const stationId = String(index + 1);
            this.stations.push({ id: stationId, name, x, y, capacity });
            for (let i = 0; i < docked; i++) {
                const id = String(this.bikes.length + 1);
                const electric = Number(id) % 4 === 0;
                this.bikes.push({
                    id,
                    type: electric ? 'ELECTRIC' : 'CLASSIC',
                    battery: electric ? BATTERIES[electricCount++ % BATTERIES.length] : null,
                    stationId,
                });
            }
        });
    }

    findAll() {
        return this.stations.map((station) => ({ ...station, availableBikes: this.dockedBikes(station.id).length }));
    }

    findOne(id: string) {
        const station = this.getStation(id);
        const bikes = this.dockedBikes(id).map(({ id, type, battery }) => ({ id, type, battery }));
        return { ...station, availableBikes: bikes.length, bikes };
    }

    getStation(id: string): Station {
        const station = this.stations.find((s) => s.id === id);
        if (!station) throw new NotFoundException(`Station ${id} not found`);
        return station;
    }

    getBike(id: string): Bike {
        const bike = this.bikes.find((b) => b.id === id);
        if (!bike) throw new NotFoundException(`Bike ${id} not found`);
        return bike;
    }

    private dockedBikes(stationId: string): Bike[] {
        return this.bikes.filter((b) => b.stationId === stationId);
    }
}
