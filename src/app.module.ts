import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './controllers/users/users.module';
import { AuthService } from './services/Authentication/auth/auth.service';
import { AuthModule } from './controllers/auth/auth.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
