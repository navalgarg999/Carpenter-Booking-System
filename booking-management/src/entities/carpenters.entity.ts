import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { slots } from './slots.entity';

@Entity()
export class carpenters {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => slots, (slot) => slots.carpenter, {cascade:true})
  slots: slots[];
}
