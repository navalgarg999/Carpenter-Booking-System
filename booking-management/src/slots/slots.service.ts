import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class SlotsService {
  private slots: {slotId:number, time: number; carpenterId: number; is_available: boolean }[] = [];

  createSlots(carpenterId: number) {
    for (let hour = 9; hour <= 17; hour++) {
      this.slots.push({slotId:this.slots.length, time: hour, carpenterId, is_available: true });
    }
    return this.slots;
  }

  getSlotsofCarpenter(carpenterId: number) {
    if(!this.slots.some(slot=>slot.carpenterId === carpenterId)){
      this.createSlots(carpenterId);
    }
    return this.slots.filter((slots) => slots.carpenterId === carpenterId);
  }

  getslotID(carpenterId:number, time:number){
    if((time<9 || time>17)){
      throw new HttpException('Not Found', 404);
    };
    const index = this.slots.findIndex((slot)=> slot.carpenterId === carpenterId && slot.time == time);
    if(index === -1){
      throw new HttpException('Not Found', 404);
    }
    return this.slots[index].slotId;
  }

  slotbooked(slotId:number){
    const index = this.slots.findIndex((slot)=>slot.slotId===slotId);
    if(index === -1){
      throw new HttpException('Not Found', 404);
    }
    this.slots[index].is_available = false;
  }

  bookingCancel(slotId:number){
    const index = this.slots.findIndex((slot)=>slot.slotId===slotId);
    if(index === -1){
      throw new HttpException('Not Found', 404);
    }
    this.slots[index].is_available = true;
  }
}
