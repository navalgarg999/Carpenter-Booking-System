import { Module } from '@nestjs/common';
import { CarpentersService } from './carpenters.service';
import { CarpentersController } from './carpenters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { carpenters } from 'src/entities/carpenters.entity';
import { slots } from 'src/entities/slots.entity';
import { SlotsService } from 'src/slots/slots.service';

@Module({
  providers: [CarpentersService, SlotsService],
  controllers: [CarpentersController],
  imports:[TypeOrmModule.forFeature([carpenters,slots])]
})
export class CarpentersModule {}
