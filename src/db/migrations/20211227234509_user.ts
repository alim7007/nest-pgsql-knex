import { Knex } from 'knex';
import { dbNames } from '../db.names';

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable(
    dbNames.users.tableName,
    (t: Knex.TableBuilder) => {
      t.increments('id').primary();
      t.string('email').unique().notNullable();
      t.string('first_name').index();
      t.string('last_name').index();
      t.date('dob');
      t.enum('gender', ['MALE', 'FEMALE', 'OTHER']);
      t.string('temp_email');
      t.enum('status', ['ACTIVE', 'DISABLED', 'DELETED'])
        .notNullable()
        .defaultTo(['ACTIVE']);
      t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    },
  );
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTableIfExists(dbNames.users.tableName);
};
