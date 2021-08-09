import { IsEmail, IsOptional, IsString, NotEquals } from 'class-validator';
import { IEmail } from './customer.interface';

export class GetCustomerDTO implements IEmail {
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly page: string;

  @IsString()
  @IsOptional()
  readonly limit: string;
}
