import * as Joi from 'joi';

export const configSchemaValidation = Joi.object({
  REDIS_HOST: Joi.string().required(),
  REDIS_USER: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().required(),
  REDIS_PORT: Joi.number().port().required(),
  MAIL_USERNAME: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),
  OAUTH_CLIENTID: Joi.string().required(),
  OAUTH_CLIENT_SECRET: Joi.string().required(),
  OAUTH_REFRESH_TOKEN: Joi.string().required(),
  HTML_WELCOME_TEMPLATE: Joi.string().required(),
});
