import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { AccountCreatedEvent } from 'src/common/events/account.events';
import { RemoveStreakEvent } from 'src/common/events/removeStreak';

@Injectable()
export class NotificationsService {
  constructor(@InjectQueue('notification') private notificationQueue: Queue) {}

  async welcome(users: AccountCreatedEvent) {
    this.notificationQueue.add(
      'mail',
      {
        templateName: 'welcome',
        users,
      },
      { attempts: 1 },
    );
  }

  async removeStreak(users: RemoveStreakEvent) {
    this.notificationQueue.add(
      'mail',
      {
        templateName: 'warningRemoveStreak',
        users,
      },
      {
        attempts: 1,
        removeOnFail: true,
      },
    );
  }
}
