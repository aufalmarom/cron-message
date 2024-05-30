import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsTimeZone,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsNotEmpty()
  @IsDateString()
  birthday_date: Date;

  @IsNotEmpty()
  timezone: string;
}
