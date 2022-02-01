import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import moment from 'moment';
import { InjectModel } from 'nest-knexjs';
import { User } from 'src/models';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async findAll() {
    const users = await User.query();
    return { users };
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    const users = await User.query().modify('active').findOne({ id });
    return { users };
  }

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto.dob);
    try {
      const users = await User.query().insertAndFetch({
        // id: createUserDto.id,
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        email: createUserDto.email,
        dob: moment(createUserDto.dob).format('YYYY-MM-DD'),
        gender: createUserDto.gender,
        status: createUserDto.status,
        temp_email: createUserDto.temp_email,
      });
      return { users };
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const users = await User.query().findById(id).patch({
      first_name: updateUserDto.first_name,
    });
    return { users };
  }

  async remove(id: number) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    const users = await User.query().deleteById(1);
    return { users };
  }
}
