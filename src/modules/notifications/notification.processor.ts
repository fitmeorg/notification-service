import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { promisify } from 'util';
import Handlebars from 'handlebars';
import { AccountCreatedEvent } from 'src/common/events/account.events';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { RemoveStreakEvent } from 'src/common/events/removeStreak';
import { NotificationRepository } from './store/notification.repository';

const readFileAsync = promisify(fs.readFile);

@Processor('notification')
export class NotificationConsumer extends WorkerHost {
  private transporter;
  private templates;

  constructor(
    private configService: ConfigService,
    private readonly notificationRepository: NotificationRepository,
  ) {
    super();
    this.templates = {
      welcome: {
        html: this.configService.get('mail.htmlWelcomeTemplate'),
        emailSubject: (username) => {
          `Bienvenido ${username} a fitme`;
        },
        templateVariables: (data: AccountCreatedEvent) => ({
          name: data.name,
        }),
      },
      warningRemoveStreak: {
        html: this.configService.get('mail.htmlRemoveStreakTemplate'),
        emailSubject: (username) =>
          `Don't give up ${username}, your progress continues!`,
        templateVariables: (data: RemoveStreakEvent) => ({
          username: data.username,
        }),
      },
    };
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        ...this.configService.get('mail'),
      },
    });
  }

  async process(job: Job<any, any, string>) {
    const selectedTemplate = this.templates[job.data.templateName];
    const templateContent = await readFileAsync(selectedTemplate.html, 'utf-8');
    const compileTemplate = Handlebars.compile(templateContent);

    for (const user of job.data.users) {
      const compiledHtml = compileTemplate(
        selectedTemplate.templateVariables(user),
      );

      await this.transporter.sendMail({
        from: 'herrera.clip@gmail.com',
        to: `${user.mail}`,
        subject: selectedTemplate.emailSubject(user.username),
        text: job.data.plainText,
        html: compiledHtml,
      });
    }
  }
}
