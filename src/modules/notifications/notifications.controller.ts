import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern } from '@nestjs/microservices';
import { AccountCreatedEvent } from 'src/common/events/account.events';
import { RemoveStreakEvent } from 'src/common/events/removeStreak';
import { NotificationRepository } from './store/notification.repository';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly notificationRepository: NotificationRepository,
  ) {}

  @EventPattern('account.created')
  async handleAccountCreated(data: AccountCreatedEvent) {
    await this.notificationRepository.create(data);
    await this.notificationsService.welcome(data);
  }

  @EventPattern('remove.streak')
  async handleRemoveStreak(users: RemoveStreakEvent) {
    await this.notificationsService.removeStreak(users);
  }
}
