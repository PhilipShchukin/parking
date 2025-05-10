import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() dto: CreateReservationDto) {
    return this.reservationService.create({
        userId: dto.userId,
        parkingSpotNumber: dto.parkingSpotNumber,
        reservedDate: new Date(dto.reservedDate).toISOString(),
        reservedTime: dto.reservedTime,
        status: dto.status
    });
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.reservationService.findByUser(userId);
  }

  @Delete(':id')
  cancel(@Param('id') id: string) {
    return this.reservationService.cancel(id);
  }

  @Get(':spotId')
  findBySpotDate(@Param('spotId') spotId: string  ) {
    return this.reservationService.findBySpotDate(spotId);
  }
}