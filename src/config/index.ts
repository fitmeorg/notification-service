import redis from './redis';
import mail from './mail';
import database from './database';
import bullmq from './bullmq';

export const config = [redis, mail, database, bullmq];
