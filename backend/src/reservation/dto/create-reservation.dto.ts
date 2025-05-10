import { IsDateString, IsEnum, IsString } from 'class-validator';
import { StatusType } from '@prisma/client';

export class CreateReservationDto {
  @IsString()
  userId: string;

  @IsString()
  parkingSpotNumber: string;

  @IsDateString()
  reservedDate: string;

  @IsString()
  reservedTime: string;

  @IsEnum(StatusType)
  status: StatusType;
}