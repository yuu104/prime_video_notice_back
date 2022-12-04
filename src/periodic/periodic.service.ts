import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';
import { VideoService } from 'src/video/video.service';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';
import { LeavingSoonVideosService } from 'src/leaving-soon-videos/leaving-soon-videos.service';
import { LeavingSoonVideosDto } from 'src/leaving-soon-videos/dto/leavingSoonVideos.dto';

@Injectable()
export class PeriodicService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    private readonly userService: UserService,
    private readonly videoService: VideoService,
    private readonly mailService: MailService,
    private readonly leavingSoonVideosService: LeavingSoonVideosService,
  ) {}

  @Cron('00 00 20 * * *')
  async notice(): Promise<void> {
    const notUpdatedVideos = await this.videoService.findNotUpdated();

    const leavingSoonVideos =
      await this.leavingSoonVideosService.getLeavingSoonVideos();
    const leavingSoonVideosItems = leavingSoonVideos.videos.split(',');
    for (let i = 0; i < notUpdatedVideos.length; i++) {
      if (
        leavingSoonVideosItems.find(
          (item) => item === notUpdatedVideos[i].title,
        )
      ) {
        const users = await this.userService.findById(
          notUpdatedVideos[i].user_id,
        );
        if (!users.length) return;
        const { mail } = users[0];
        await this.mailService.sendNotify(mail, notUpdatedVideos[i]);
        await this.videoService.updateIsNotified(notUpdatedVideos[i].id);
      } else {
        await this.videoService.updateUpdatedAt(notUpdatedVideos[i].id);
      }
    }
  }

  @Cron('0 0 */12 * * *')
  async updateLeavingSoonVideos(): Promise<void> {
    const requestUrl = this.config.get('GET_LEAVING_SOON_VIDEOS_API');

    const leavingSoonVideos: LeavingSoonVideosDto | null = await lastValueFrom(
      this.httpService.get(requestUrl).pipe(map((res) => res.data)),
    ).catch(() => {
      return null;
    });

    if (!leavingSoonVideos) return;

    const nowLeavingSoonVideos =
      await this.leavingSoonVideosService.getLeavingSoonVideos();
    const { id } = nowLeavingSoonVideos;

    await this.leavingSoonVideosService.updateLeavingSoonVideos(
      id,
      leavingSoonVideos,
    );
  }
}
