export interface BOOKINGS {
  bookingId: number;
  carpenterId: number;
  slotId: number;
  slotTime: number;
  status: 'confirmed' | 'cancelled';
  bookedAt: Date;
}
