import { Module } from '@nestjs/common';
import { ParkingSpotService } from './parking-spot.service';
import { ParkingSpotController } from './parking-spot.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ParkingSpotController],
  providers: [ParkingSpotService],
})
export class ParkingSpotModule {}