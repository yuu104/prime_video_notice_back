import { Controller, Get, Param } from '@nestjs/common';
import { LeavingSoonVideosService } from './leaving-soon-videos.service';

@Controller('leaving_soon_videos')
export class LeavingSoonVideosController {
  constructor(
    private readonly leavingSoonVideosService: LeavingSoonVideosService,
  ) {}

  @Get(':title')
  async isLeavingSoon(@Param('title') title: string): Promise<boolean> {
    const videos = await this.leavingSoonVideosService.getLeavingSoonVideos();
    const videosItems = videos.videos.split(',');
    if (videosItems.find((item) => item === title)) {
      return true;
    } else {
      return false;
    }
  }
}
