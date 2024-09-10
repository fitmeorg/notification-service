import { Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { AccountCreatedEvent } from 'src/common/events/account.events';

@Injectable()
export class NotificationsService {
  constructor(private readonly mailService: MailService) {}

  async welcome(data: AccountCreatedEvent) {
    this.mailService.sendMail(
      'welcome',
      data,
      `Bienvenido ${data.name} a fitme`,
    );
  }
}
