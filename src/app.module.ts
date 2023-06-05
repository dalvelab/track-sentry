import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackController } from './track/track.controller';

@Module({
  imports: [],
  controllers: [AppController, TrackController],
  providers: [AppService],
})
export class AppModule {}
