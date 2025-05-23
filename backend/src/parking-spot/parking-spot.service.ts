import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParkingSpotService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.parkingSpot.findMany();
  }

}