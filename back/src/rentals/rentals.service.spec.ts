import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { StationsService } from '../stations/stations.service';

describe('RentalsService', () => {
    let stations: StationsService;
    let rentals: RentalsService;

    beforeEach(() => {
        stations = new StationsService();
        rentals = new RentalsService(stations);
    });

    it('rents a docked bike and frees a dock at its station', () => {
        const before = stations.findOne('1').availableBikes;
        const rental = rentals.create({ bikeId: '1' });
        expect(rental.stationId).toBe('1');
        expect(stations.findOne('1').availableBikes).toBe(before - 1);
    });

    it('rejects missing, unknown, already rented and low battery bikes', () => {
        expect(() => rentals.create({} as never)).toThrow(BadRequestException);
        expect(() => rentals.create({ bikeId: '999' })).toThrow(NotFoundException);
        rentals.create({ bikeId: '1' });
        expect(() => rentals.create({ bikeId: '1' })).toThrow(ConflictException);
        const lowBattery = stations.findAll().flatMap((s) => stations.findOne(s.id).bikes).find((b) => (b.battery ?? 100) < 15);
        expect(() => rentals.create({ bikeId: lowBattery!.id })).toThrow(BadRequestException);
    });
});
