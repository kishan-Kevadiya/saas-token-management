import { IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { TokenStatus } from '@prisma/client';

export class SeriesDto {
  @IsNumber()
  id: number;

  @IsString()
  hash_id: string;
}

export class CounterDto {
  @IsNumber()
  id: number;

  @IsString()
  hash_id: string;

  @IsNumber()
  counter_no: number;
}

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  hash_id: string;

  @IsString()
  name: string;
}

export class LanguageDto {
  @IsNumber()
  id: number;

  @IsString()
  hash_id: string;

  @IsString()
  name: string;

  @IsString()
  code: string;
}

export class CompanyDto {
  @IsNumber()
  id: number;

  @IsString()
  hash_id: string;

  @IsString()
  name: string;
}

export class DepartmentDto {
  @IsNumber()
  id: number;

  @IsString()
  hash_id: string;

  @IsString()
  name: string;
}

export class tokenDto {
  @IsString()
  token_id: string;

  @IsString()
  token_abbreviation: string;

  @IsObject()
  series: SeriesDto;

  @IsNumber()
  token_number: number;

  @IsString()
  token_date: string;

  @IsNumber()
  priority: number;

  @IsEnum(TokenStatus)
  token_status: TokenStatus;

  @IsObject()
  counter: CounterDto | null;

  @IsObject()
  user: UserDto | null;

  @IsString()
  token_series_number: string;

  @IsString()
  token_calling_time: string | null;

  @IsString()
  token_out_time: string | null;

  @IsObject()
  language: LanguageDto;

  @IsObject()
  company: CompanyDto;

  @IsObject()
  transfer_counter: CounterDto | null;

  @IsObject()
  transfer_department: DepartmentDto | null;

  @IsString()
  customer_name?: string;

  @IsString()
  customer_mobile_number?: string;

  @IsString()
  token_generate_time: string;

  @IsString()
  form_data?: string;

  @IsString()
  time_taken: string;
}
