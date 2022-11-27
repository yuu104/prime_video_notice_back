import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User, Video } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { AddVideoDto } from './dto/addVideo.dto';
import { VideoService } from './video.service';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@GetUser() user: User): Promise<Video[]> {
    const { id } = user;
    return this.videoService.findAll(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('available')
  getAvailableVideos(@GetUser() user: User): Promise<Video[]> {
    const { id } = user;
    return this.videoService.getAvailableVideos(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('not_available')
  getNotAvailableVideos(@GetUser() user: User): Promise<Video[]> {
    const { id } = user;
    return this.videoService.getNotAvailableVideos(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  addVideo(
    @GetUser() user: User,
    @Body() addVideoDto: AddVideoDto,
  ): Promise<number> {
    const { id } = user;
    return this.videoService.addVideo(id, addVideoDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteById(
    @GetUser() user: User,
    @Param('id') videoId: number,
  ): Promise<number> {
    const { id } = user;
    return this.videoService.deleteVideoById(id, videoId);
  }
}
