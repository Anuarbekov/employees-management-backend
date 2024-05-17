import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsNumber()
  @IsNotEmpty()
  salary: number;
}
export class UpdateUserDto {
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  jobTitle?: string;

  @IsNumber()
  @IsOptional()
  salary?: number;
}
export class RegisterDto extends UserDto {
  user: UserDto;

  @IsString()
  @IsNotEmpty()
  password: string;
}
