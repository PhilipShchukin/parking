import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ParkingSpotModule } from './parking-spot/parking-spot.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, ParkingSpotModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
