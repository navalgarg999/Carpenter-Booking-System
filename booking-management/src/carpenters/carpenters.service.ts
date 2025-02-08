import { Injectable } from '@nestjs/common';
import { CARPENTERS } from './carpenters.mock';
import { CreateCarpenterDto } from './carpenters.dto';
import { SlotsService } from 'src/slots/slots.service';
import { slots } from 'src/entities/slots.entity';

@Injectable()
export class CarpentersService {
  constructor(private readonly SlotsService:SlotsService){}
  private carpenters = CARPENTERS;
  

  createCarpenter(createCarpenterDto: CreateCarpenterDto) {
   const newCarpenter = {
    id: this.carpenters.length,
    name: createCarpenterDto.name,
   };
   this.carpenters.push(newCarpenter);
   const carpenterslots = this.SlotsService.createSlots(newCarpenter.id);

   return {
    message: 'Carpenter Created!',
    data: newCarpenter,
    slots: carpenterslots,
   }
  }

  getAllCarpenters() {
    return this.carpenters;
  }
}
