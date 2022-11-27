import { Injectable } from '@nestjs/common';
import { Video } from '@prisma/client';
import { AddVideoDto } from './dto/addVideo.dto';
import { VideoRepository } from './video.repository';

@Injectable()
export class VideoService {
  constructor(private readonly videoRepository: VideoRepository) {}

  findAll(user_id: string): Promise<Video[]> {
    return this.videoRepository.findAll(user_id);
  }

  getAvailableVideos(user_id: string): Promise<Video[]> {
    return this.videoRepository.getAvailableVideos(user_id);
  }

  getNotAvailableVideos(user_id: string): Promise<Video[]> {
    return this.videoRepository.getNotAvailableVideos(user_id);
  }

  findNotUpdated(): Promise<Video[]> {
    return this.videoRepository.findNotUpdated();
  }

  addVideo(user_id: string, addVideoDto: AddVideoDto): Promise<number> {
    return this.videoRepository.addVideo(user_id, addVideoDto);
  }

  updateUpdatedAt(id: number): Promise<number> {
    return this.videoRepository.updateUpdatedAt(id);
  }

  deleteVideoById(user_id: string, videoId: number): Promise<number> {
    return this.videoRepository.deleteVideoById(user_id, videoId);
  }
}
