import { HttpException, Injectable } from '@nestjs/common';
import { SlotsService } from 'src/slots/slots.service';
import { BOOKINGS } from './bookings.dto';
import { carpenters } from 'src/entities/carpenters.entity';
import { CarpentersService } from 'src/carpenters/carpenters.service';

@Injectable()
export class BookingsService {
  constructor(
    private readonly SlotsService: SlotsService,
  ) {}
  private bookings: BOOKINGS[] = [];

  createBooking(carpenterId: number, time: number) {
    const slotID = this.SlotsService.getslotID(carpenterId, time);
    if (slotID === null) {
      throw new HttpException('No available slots for the given time', 404);
    }
    const newBooking: BOOKINGS = {
      bookingId: this.bookings.length,
      carpenterId: carpenterId,
      slotId: slotID,
      slotTime: time,
      status: 'confirmed',
      bookedAt: new Date(),
    };
    this.bookings.push(newBooking);
    this.SlotsService.slotbooked(slotID);
    return newBooking;
  }

  cancelBooking(carpenterId: number, slotTime: number) {
    const slotid = this.SlotsService.getslotID(carpenterId, slotTime);
    if (slotid === null) {
      throw new HttpException('No available slots for the given time', 404);
    }
    const index = this.bookings.findIndex(
      (booking) =>
        booking.carpenterId === carpenterId && booking.slotId === slotid,
    );
    if (index === -1) {
      throw new HttpException('Booking not found', 404);
    }
    const cancelledBooking = this.bookings[index];
    this.bookings.splice(index, 1);
    this.SlotsService.bookingCancel(slotid);
    return {
      message: 'Booking Cancelled successfully',
      booking: cancelledBooking,
    };
  }

  getBookings() {
    return this.bookings;
  }

}