import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BOOKINGS } from './bookings.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  getBookings() {
    return this.bookingsService.getBookings();
  }

  @Post()
  createBooking(@Body() body: { carpenterId: number; time: number }) {
    return this.bookingsService.createBooking(body.carpenterId, body.time);
  }
  @Post('cancel')
  cancelBooking(@Body() body: { carpenterId: number; time: number }) {
    return this.bookingsService.cancelBooking(body.carpenterId, body.time);
  }
}
