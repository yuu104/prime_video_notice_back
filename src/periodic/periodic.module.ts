import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { VideoModule } from 'src/video/video.module';
import { PeriodicService } from './periodic.service';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';
import { LeavingSoonVideosModule } from 'src/leaving-soon-videos/leaving-soon-videos.module';

@Module({
  imports: [
    UserModule,
    VideoModule,
    HttpModule,
    MailModule,
    LeavingSoonVideosModule,
  ],
  providers: [PeriodicService],
})
export class PeriodicModule {}
