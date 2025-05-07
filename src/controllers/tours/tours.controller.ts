import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuardService } from 'src/services/authentication/jwt-auth.guard/jwt-auth.guard.service';
import { ToursService } from 'src/services/tours/tours.service';

@Controller('tours')
export class ToursController {

  constructor(private toursService: ToursService) {

  }

  // @UseGuards(JwtAuthGuardService)
  @Get()
  getAllTours(): void {
    this.toursService.generateTours();
  }

  @Get(':remove')
  removeAllTours(@Param('remove') remove: string): void {
    this.toursService.deleteTours();
  }
}
