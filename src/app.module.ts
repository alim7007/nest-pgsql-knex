import { forwardRef, Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
require('dotenv').config();

@Module({
  imports: [
    UsersModule,
    KnexModule.forRoot({
      config: {
        client: 'pg',
        // version: '5.7',
        useNullAsDefault: true,
        connection: {
          host: process.env.POSTGRES_HOST,
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
