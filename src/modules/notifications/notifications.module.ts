import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { BullModule } from '@nestjs/bullmq';
import { NotificationConsumer } from './notification.processor';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema, Notification } from './store/notification.entity';
import { NotificationRepository } from './store/notification.repository';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification',
    }),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationConsumer,
    NotificationRepository,
  ],
})
export class NotificationsModule {}
