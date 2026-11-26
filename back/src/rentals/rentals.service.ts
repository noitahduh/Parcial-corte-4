import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { Rental } from '../models/models';
import { CreateRentalDto } from '../models/dto';
import { StationsService } from '../stations/stations.service';

const MIN_BATTERY = 15;

@Injectable()
export class RentalsService {
    private readonly rentals: Rental[] = [];

    constructor(private readonly stationsService: StationsService) {}

    create(dto: CreateRentalDto): Rental {
        if (typeof dto?.bikeId !== 'string' || !dto.bikeId.trim()) {
            throw new BadRequestException('bikeId is required');
        }
        const bike = this.stationsService.getBike(dto.bikeId);
        if (bike.stationId === null) {
            throw new ConflictException(`Bike ${bike.id} is already being rented`);
        }
        if (bike.type === 'ELECTRIC' && (bike.battery ?? 0) < MIN_BATTERY) {
            throw new BadRequestException(`Bike ${bike.id} battery is too low (${bike.battery}%)`);
        }

        const rental: Rental = {
            id: String(this.rentals.length + 1),
            bikeId: bike.id,
            stationId: bike.stationId,
            startedAt: new Date().toISOString(),
        };
        bike.stationId = null;
        this.rentals.push(rental);
        return rental;
    }
}
