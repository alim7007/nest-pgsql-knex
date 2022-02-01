require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
console.log(
  'host:' + process.env.POSTGRES_HOST,
  'user:' + process.env.POSTGRES_USER,
  'password:' + process.env.POSTGRES_PASSWORD,
  'database:' + process.env.POSTGRES_DB,
);
const config = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'db_migrations',
      directory: __dirname + '/dist/db/migrations',
    },
    seeds: {
      directory: __dirname + '/dist/db/seeds',
    },
  },

  staging: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'db_migrations',
      directory: __dirname + '/dist/db/migrations',
    },
    seeds: {
      directory: __dirname + '/dist/db/seeds',
    },
  },

  test: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'db_migrations',
      directory: __dirname + '/dist/db/migrations',
    },
    seeds: {
      directory: __dirname + '/dist/db/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'db_migrations',
      directory: __dirname + '/dist/db/migrations',
    },
    seeds: {
      directory: __dirname + '/dist/db/seeds',
    },
  },

  make: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'dbuser',
      password: 'admin2021',
      database: 'todoapp',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'db_migrations',
      directory: __dirname + '/src/db/migrations',
    },
    seeds: {
      directory: __dirname + '/src/db/seeds',
    },
  },
};

module.exports = config[env];
