import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { bookings } from 'src/entities/bookings.entity';
import { carpenters } from 'src/entities/carpenters.entity';
import { slots } from 'src/entities/slots.entity';

export const typeORMconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'booking-system',
  autoLoadEntities: true,
  synchronize: true, // Auto-sync schema (disable in production)
  entities:[carpenters, slots, bookings],
};
