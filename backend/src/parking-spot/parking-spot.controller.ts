import { Controller, Get} from '@nestjs/common';
import { ParkingSpotService } from './parking-spot.service';

@Controller('parking-spots')
export class ParkingSpotController {
  constructor(private readonly parkingSpotService: ParkingSpotService) {}

  @Get()
  findAll() {
    return this.parkingSpotService.findAll();
  }
 
}