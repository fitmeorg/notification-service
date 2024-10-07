import redis from './redis';
import mail from './mail';
import database from './database';

export const config = [redis, mail, database];
