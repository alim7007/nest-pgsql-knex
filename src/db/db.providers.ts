import { Logger } from '@nestjs/common';
import { resolve } from 'path';
import { Model } from 'objection';
const knexConfig = require(resolve('knexfile.js'));
const knex = require('knex')(knexConfig);

const logger = new Logger('DbProvider');
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      await knex
        .raw('SELECT VERSION() as version')
        .then(([version]: any) =>
          logger.debug(`Database version:${version[0]?.version}`),
        )
        .catch((err: any) => {
          logger.error(err.message);
          knex.destroy();
        }),
        Model.knex(knex);
    },
  },
];
