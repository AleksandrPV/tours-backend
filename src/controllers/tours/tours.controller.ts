import { Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ParamIdPipe } from 'src/pipes/param-id.pipe';
import { JwtAuthGuardService } from 'src/services/authentication/jwt-auth.guard/jwt-auth.guard.service';
import { ToursService } from 'src/services/tours/tours.service';
import { Tour } from 'src/shemas/tour';

@Controller('tours')
export class ToursController {

  constructor(private toursService: ToursService) {

  }

  // @UseGuards(JwtAuthGuardService)
  @Post()
  getAllTours(): Promise<Tour[]> {
     this.toursService.generateTours();
     return this.toursService.getTours()
  }
  @Get()
    getAll(): any {
      return this.toursService.getTours()

    }
  

  @Get(":id")
  getTourById(@Param('id', ParamIdPipe) id ): Promise<Tour | null> {
    console.log('id', id);
    return this.toursService.getTourById(id);
  }
  @Delete()
  removeAllTours(): void {
    this.toursService.deleteTours();
  }
}
