import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { promisify } from 'util';
import Handlebars from 'handlebars';
import { AccountCreatedEvent } from 'src/common/events/account.events';

const readFileAsync = promisify(fs.readFile);

@Injectable()
export class MailService {
  private transporter;
  private templates;

  constructor(private configService: ConfigService) {
    this.templates = {
      welcome: {
        html: this.configService.get('mail.htmlWelcomeTemplate'),
        templateVariables: (data: AccountCreatedEvent) => ({
          name: data.name,
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

  async sendMail(
    templateName,
    data: any,
    emailSubject: string,
    plainText?: string,
  ) {
    let templateContent;
    let compiledHtml;

    if (typeof templateName === 'string') {
      const selectedTemplate = this.templates[templateName];
      templateContent = await readFileAsync(selectedTemplate.html, 'utf-8');

      const compileTemplate = Handlebars.compile(templateContent);
      compiledHtml = compileTemplate(selectedTemplate.templateVariables(data));
    }

    await this.transporter.sendMail({
      from: 'herrera.clip@gmail.com',
      to: `${data.mail}`,
      subject: emailSubject,
      text: plainText,
      html: compiledHtml,
    });
  }
}
