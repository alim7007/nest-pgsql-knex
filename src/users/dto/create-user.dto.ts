import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { GenderType, StatusType } from 'src/common/enums';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  // id: number;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dob: Date;

  @IsNotEmpty()
  gender: GenderType;

  @IsNotEmpty()
  status: StatusType;

  @IsNotEmpty()
  @IsEmail()
  temp_email: string;
}
