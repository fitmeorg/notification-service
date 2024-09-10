import { Module } from '@nestjs/common';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './modules/mail/mail.module';
import { config } from './config';
import { configSchemaValidation } from './config/validation';

@Module({
  imports: [
    NotificationsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
      validationSchema: configSchemaValidation,
    }),
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
