import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  user: process.env.MAIL_USERNAME,
  pass: process.env.MAIL_PASSWORD,
  clientId: process.env.OAUTH_CLIENTID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  htmlWelcomeTemplate: process.env.HTML_WELCOME_TEMPLATE,
}));
