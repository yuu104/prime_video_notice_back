import { Injectable } from '@nestjs/common';
import { LeavingSoonVideos } from '@prisma/client';
import { LeavingSoonVideosDto } from './dto/leavingSoonVideos.dto';
import { LeavingSoonVideosRepository } from './leaving-soon-videos.repository';

@Injectable()
export class LeavingSoonVideosService {
  constructor(
    private readonly leavingSoonVideosRepository: LeavingSoonVideosRepository,
  ) {}

  async getLeavingSoonVideos(): Promise<LeavingSoonVideos> {
    const leavingSoonVideos =
      await this.leavingSoonVideosRepository.leavingSoonVideos.findMany();

    return leavingSoonVideos[0];
  }

  addLeavingSoonVideos(
    leavingSoonVideosDto: LeavingSoonVideosDto,
  ): Promise<number> {
    return this.leavingSoonVideosRepository.addLeavingSoonVideos(
      leavingSoonVideosDto,
    );
  }

  updateLeavingSoonVideos(
    id: number,
    leavingSoonVideosDto: LeavingSoonVideosDto,
  ): Promise<number> {
    console.log('updateLeavingSoonVideos');
    return this.leavingSoonVideosRepository.updateLeavingSoonVideos(
      id,
      leavingSoonVideosDto,
    );
  }
}
