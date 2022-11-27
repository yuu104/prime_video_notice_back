import { Injectable } from '@nestjs/common';
import { Video } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddVideoDto } from './dto/addVideo.dto';

@Injectable()
export class VideoRepository extends PrismaService {
  async findAll(user_id: string): Promise<Video[]> {
    const videos = await this.$queryRaw<
      Video[]
    >`SELECT * FROM videos WHERE user_id=${user_id}`;

    return videos;
  }

  async getAvailableVideos(user_id: string): Promise<Video[]> {
    const availableVideos = await this.$queryRaw<
      Video[]
    >`SELECT * FROM videos WHERE user_id=${user_id} AND is_available=true`;

    return availableVideos;
  }

  async getNotAvailableVideos(user_id: string): Promise<Video[]> {
    const notAvailableVideos = await this.$queryRaw<
      Video[]
    >`SELECT * FROM videos WHERE user_id=${user_id} AND is_available=false`;

    return notAvailableVideos;
  }

  async findNotUpdated(): Promise<Video[]> {
    const videos = await this.$queryRaw<
      Video[]
    >`SELECT * FROM videos WHERE updated_at < DATE_SUB(NOW(),INTERVAL 24 HOUR)`;

    return videos;
  }

  async addVideo(user_id: string, addVideoDto: AddVideoDto): Promise<number> {
    const { title, url, image, is_available } = addVideoDto;
    const result = await this
      .$executeRaw`INSERT INTO videos (title, url, image, is_available, user_id) VALUES (${title}, ${url}, ${image}, ${is_available}, ${user_id})`;

    return result;
  }

  async updateUpdatedAt(id: number): Promise<number> {
    const result = await this
      .$executeRaw`UPDATE videos SET updated_at=${new Date()} WHERE id=${id}`;

    return result;
  }

  async deleteVideoById(user_id: string, videoId: number): Promise<number> {
    const result = await this
      .$executeRaw`DELETE FROM videos WHERE user_id=${user_id} AND id=${videoId}`;

    return result;
  }
}
