import { Module } from '@nestjs/common';
import { LeavingSoonVideosRepository } from './leaving-soon-videos.repository';
import { LeavingSoonVideosService } from './leaving-soon-videos.service';
import { LeavingSoonVideosController } from './leaving-soon-videos.controller';

@Module({
  providers: [LeavingSoonVideosService, LeavingSoonVideosRepository],
  exports: [LeavingSoonVideosService],
  controllers: [LeavingSoonVideosController],
})
export class LeavingSoonVideosModule {}
