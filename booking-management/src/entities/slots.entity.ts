import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { carpenters } from './carpenters.entity';
import { bookings } from './bookings.entity';

@Entity()
export class slots {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => carpenters, (carpenter) => carpenter.slots, { onDelete: 'CASCADE' })
  carpenter: carpenters;

  @Column()
  slot_time: string;

  @Column({ default: true })
  is_available: boolean;

  @OneToMany(() => bookings, (booking) => booking.slot)
  bookings: bookings[];
  static carpenter: any;
}
