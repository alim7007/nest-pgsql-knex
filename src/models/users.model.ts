import { Model } from 'objection';

export default class UserModel extends Model {
  static tableName = 'users';
  static virtualAttributes = ['fullName'];

  first_name!: string;
  last_name!: string;
  is_active!: boolean;

  fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  static jsonSchema = {
    type: 'object',
    required: ['first_name', 'last_name', 'is_active'],
    properties: {
      id: { type: 'number' },
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      is_active: { type: 'boolean' },
    },
  };
}
