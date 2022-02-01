// import moment from 'moment';
import { AnyQueryBuilder, Model } from 'objection';
import { dbNames } from 'src/db/db.names';
import { GenderType, StatusType } from 'src/common/enums';
import { commonConstants } from 'src/common/constants';
// import { UserProfileInfo } from 'src/api/profile/dto';
// import { UserBaseInfo } from 'src/api/user/dto';
import { resolve } from 'path';
const knexConfig = require(resolve('knexfile.js'));
const knex = require('knex')(knexConfig);
Model.knex(knex);
export class User extends Model {
  id: number;
  // Auth
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  dob?: Date | string | null;
  gender?: GenderType;

  temp_email?: string | null;
  status: StatusType;

  static get tableName() {
    return dbNames.users.tableName;
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email'],

      properties: {
        id: { type: 'integer' },
        // Auth
        email: { type: 'string', maxLength: commonConstants.maxEmailLength },

        // Profile
        first_name: {
          type: ['null', 'string'],
          maxLength: commonConstants.maxNameLength,
        },
        last_name: {
          type: ['null', 'string'],
          maxLength: commonConstants.maxNameLength,
        },
        dob: {
          items: {
            enum: ['null', 'date', 'string'],
          },
        },
        gender: { type: 'string', enum: ['MALE', 'FEMALE', 'OTHER'] },

        // Notifications
        temp_email: {
          type: ['null', 'string'],
          maxLength: commonConstants.maxEmailLength,
        },

        status: {
          type: 'string',
          enum: ['ACTIVE', 'DISABLED', 'DELETED'],
          default: StatusType.Active,
        },

        created_at: { type: 'string', enum: ['timestamp'] },
        updated_at: { type: 'string', enum: ['timestamp'] },
      },
    };
  }

  static get modifiers() {
    return {
      active(builder: AnyQueryBuilder) {
        const { ref } = User;
        builder.where(ref('status'), StatusType.Active);
      },
    };
  }

  get fullName(): string {
    const fullName: string[] = [];
    if (this?.first_name) {
      fullName.push(this.first_name);
    }
    if (this?.last_name) {
      fullName.push(this.last_name);
    }
    return fullName.length
      ? fullName.join(' ')
      : commonConstants.defaultUserName;
  }

  isActive(): boolean {
    return this.status === StatusType.Active;
  }

  //   toUserProfileInfoDTO(): UserProfileInfo {
  //     return {
  //       firstName: this.first_name || commonConstants.defaultUserName,
  //       lastName: this.last_name || undefined,
  //       dateOfBirth: moment(this.dob).format('YYYY-MM-DD'),
  //       gender: this.gender || GenderType.Other,
  //     };
  //   }

  //   toUserBaseInfoDTO(): UserBaseInfo {
  //     return {
  //       id: this.id,
  //       fullName: this.fullName,
  //     };
  //   }
}
