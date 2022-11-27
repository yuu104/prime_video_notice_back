import { LeavingSoonVideos } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LeavingSoonVideosDto } from './dto/leavingSoonVideos.dto';

export class LeavingSoonVideosRepository extends PrismaService {
  async getLeavingSoonVideos(): Promise<LeavingSoonVideos> {
    const leavingSoonVideos = await this.$queryRaw<
      LeavingSoonVideos[]
    >`SELECT * FROM leaving_soon_videos`;

    return leavingSoonVideos[0];
  }

  async addLeavingSoonVideos(
    leavingSoonVideosDto: LeavingSoonVideosDto,
  ): Promise<number> {
    const { videos } = leavingSoonVideosDto;
    const videosString = videos.toString();
    const result = await this
      .$executeRaw`INSERT INTO leaving_soon_videos (videos) VALUES (${videosString})`;

    return result;
  }

  async updateLeavingSoonVideos(
    id: number,
    leavingSoonVideosDto: LeavingSoonVideosDto,
  ): Promise<number> {
    const { videos } = leavingSoonVideosDto;
    const videosString = videos.toString();
    const result = await this
      .$executeRaw`UPDATE leaving_soon_videos SET videos=${videosString} WHERE id=${id}`;

    return result;
  }
}
