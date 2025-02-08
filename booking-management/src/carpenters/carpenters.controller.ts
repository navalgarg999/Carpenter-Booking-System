import { Controller, Post, Body, Get } from '@nestjs/common';
import { CarpentersService } from './carpenters.service';
import { CreateCarpenterDto } from './carpenters.dto';

@Controller('carpenters')
export class CarpentersController {
  constructor(private readonly carpentersService: CarpentersService) {}

  @Post()
  createCarpenter(@Body() createCarpenterDto: CreateCarpenterDto) {
    return this.carpentersService.createCarpenter(createCarpenterDto);
  }

  @Get()
  getAllCarpenters() {
    return this.carpentersService.getAllCarpenters();
  }
}
