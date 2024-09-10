import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern } from '@nestjs/microservices';
import { AccountCreatedEvent } from 'src/common/events/account.events';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('account.created')
  async handleAccountCreated(data: AccountCreatedEvent) {
    await this.notificationsService.welcome(data);
  }
}
