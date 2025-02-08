import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { SlotsService } from 'src/slots/slots.service';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, SlotsService]
})
export class BookingsModule {}
