import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Video } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendNotify(mailAdress: string, video: Video) {
    await this.mailerService.sendMail({
      to: mailAdress,
      subject: '配信終了予定の作品に関するお知らせ',
      template: './confirmation',
      context: {
        url: video.url,
        title: video.title,
      },
    });
  }
}
