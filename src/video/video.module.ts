import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VideoController } from './video.controller';
import { VideoRepository } from './video.repository';
import { VideoService } from './video.service';

@Module({
  imports: [PrismaModule],
  controllers: [VideoController],
  providers: [VideoService, VideoRepository],
  exports: [VideoService],
})
export class VideoModule {}
