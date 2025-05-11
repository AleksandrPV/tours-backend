import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TourDto } from 'src/dto/tourDto';
import { Tour, TourDocument } from 'src/shemas/tour';

@Injectable()
export class ToursService {

  private toursCount = 10;

  constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {
    
  }

  generateTours(): void {
    for (let i = 0; i <= this.toursCount; i++) {
      const tour = new TourDto('test'+i,'test desc', 'test operator', 'price'+i)
      const tourData = new this.tourModel(tour);
      tourData.save();
    }
    console.log('tours are generated')
  }

  async deleteTours(): Promise<any> {
    return this.tourModel.deleteMany({})
  }
}
