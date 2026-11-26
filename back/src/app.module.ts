import { Module } from '@nestjs/common';
import { StationsModule } from './stations/stations.module';
import { RentalsModule } from './rentals/rentals.module';

@Module({
    imports: [StationsModule, RentalsModule],
})
export class AppModule {}
