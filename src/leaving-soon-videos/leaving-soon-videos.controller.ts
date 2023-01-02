import { Body, Controller, Get, Post } from '@nestjs/common';
import { LeavingSoonVideosDto } from './dto/leavingSoonVideos.dto';
import { LeavingSoonVideosService } from './leaving-soon-videos.service';

@Controller('leaving_soon_videos')
export class LeavingSoonVideosController {
  constructor(
    private readonly leavingSoonVideosService: LeavingSoonVideosService,
  ) {}

  @Get()
  async getLeavingSoonVideos(): Promise<string[]> {
    const videos = await this.leavingSoonVideosService.getLeavingSoonVideos();
    const videosItems = videos.videos.split(',');

    return videosItems;
  }

  @Post('')
  addLeavingSoonVideo(
    @Body() leavingSoonVideoDto: LeavingSoonVideosDto,
  ): Promise<number> {
    return this.leavingSoonVideosService.addLeavingSoonVideos(
      leavingSoonVideoDto,
    );
  }
}
