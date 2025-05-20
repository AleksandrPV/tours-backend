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
      const tour = new TourDto('testi'+i,'test desc', 'test operator', 'cc'+i)
      const tourData = new this.tourModel(tour);
      console.log('tourData for i', i, ' = ', tourData);
      tourData.save();
    }
    console.log('tours are generated')
  }

  async deleteTours(): Promise<any> {
    return this.tourModel.deleteMany({})
  }

  async getTourById(id): Promise<Tour | null> {
    return this.tourModel.findById(id)
  }

  async getTours(): Promise<Tour[]> {
    return this.tourModel.find();
  }
}
