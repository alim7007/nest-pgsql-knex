import { Knex } from 'knex';
import { dbNames } from '../db.names';
import users from './users.json';

export const seed = async (knex: Knex): Promise<void> => {
  await knex(dbNames.users.tableName).insert(users);
};
