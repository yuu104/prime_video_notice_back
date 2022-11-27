import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PeriodicModule } from './periodic/periodic.module';
import { MailModule } from './mail/mail.module';
import { LeavingSoonVideosModule } from './leaving-soon-videos/leaving-soon-videos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    UserModule,
    VideoModule,
    PeriodicModule,
    MailModule,
    LeavingSoonVideosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
