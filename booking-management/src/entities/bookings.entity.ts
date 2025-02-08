import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { carpenters } from './carpenters.entity';
import { slots } from './slots.entity';

@Entity()
export class bookings {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => carpenters, { onDelete: 'CASCADE' })
  carpenter: carpenters;

  @ManyToOne(() => slots, (slot) => slot.bookings, { onDelete: 'CASCADE' })
  slot: slots;

  @Column()
  user_name: string;

  @Column()
  user_email: string;

  @Column({ default: 'confirmed' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  booked_at: Date;
}
