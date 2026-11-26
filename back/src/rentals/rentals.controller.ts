import { Controller, Post, Body } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from '../models/dto';

@Controller('rentals')
export class RentalsController {
    constructor(private readonly rentalsService: RentalsService) {}

    @Post()
    create(@Body() dto: CreateRentalDto) {
        return this.rentalsService.create(dto);
    }
}
