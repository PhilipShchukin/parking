import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReservationDto) {
    return this.prisma.reservation.create({ data: dto });
  }

  async findBySpotDate(spotNumber: string) {
    const reservationsDays = await this.prisma.reservation.findMany({
      where: {
        parkingSpotNumber: spotNumber,
      },
      select: {
        reservedDate: true,
        reservedTime:true,
        status: true

      },
    });
  
    return reservationsDays;
  }

  async findByUser(userId: string) {
    return this.prisma.reservation.findMany({ 
      where: {
         userId 
        } ,
        include: {
          parkingSpot: {
            select: {
              identifier: true,
              location: true, 
            },
          },
        },
        
      });
  }

  async cancel(id: string) {
    return this.prisma.reservation.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }
}