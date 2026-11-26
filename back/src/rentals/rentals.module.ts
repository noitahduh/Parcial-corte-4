import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { StationsModule } from '../stations/stations.module';

@Module({
    imports: [StationsModule],
    providers: [RentalsService],
    controllers: [RentalsController],
})
export class RentalsModule {}
