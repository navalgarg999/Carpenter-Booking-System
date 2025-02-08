import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { slots } from 'src/entities/slots.entity';
import { SlotsController } from './slots.controller';
import { SlotsService } from './slots.service';

@Module({
    imports:[TypeOrmModule.forFeature([slots])],
    controllers: [SlotsController],
    providers:[SlotsService],
    exports:[SlotsService]
})
export class SlotsModule {}
