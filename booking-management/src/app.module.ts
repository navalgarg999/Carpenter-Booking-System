import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMconfig } from './config/typeorm.config';
import { CarpentersModule } from './carpenters/carpenters.module';
import { SlotsModule } from './slots/slots.module';
import { BookingsModule } from './bookings/bookings.module';
import { BookingsController } from './bookings/bookings.controller';
import { CarpentersController } from './carpenters/carpenters.controller';
import { SlotsController } from './slots/slots.controller';
import { BookingsService } from './bookings/bookings.service';
import { CarpentersService } from './carpenters/carpenters.service';
import { SlotsService } from './slots/slots.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMconfig),
    CarpentersModule,
    SlotsModule,
    BookingsModule,
  ],
  controllers:[BookingsController, CarpentersController, SlotsController],
  providers:[BookingsService, CarpentersService, SlotsService]
})
export class AppModule {}
