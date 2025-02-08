import { Controller, Get, Param, Query } from '@nestjs/common';
import { SlotsService } from './slots.service';

@Controller('slots')
export class SlotsController {
    constructor(private readonly slotsService: SlotsService){};

    @Get(':id')
    getSlots(@Param('id') id:string){
        return this.slotsService.getSlotsofCarpenter(Number(id));
    }
}
