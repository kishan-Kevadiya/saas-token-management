import { IsString, IsNumber, IsOptional, IsObject, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UserCompanyDto {
  @IsNumber()
  id: number;

  @IsString()
  hash_id: string;

  @IsString()
  company_name: string;
}

export class UserDepartmentDto {
  @IsString()
  id: string;

  @IsString()
  dept_english_name: string;

  @IsString()
  dept_hindi_name: string;

  @IsString()
  dept_regional_name: string;
}

export class UserCounterDetailsDto {
  @IsNumber()
  id: number;

  @IsString()
  hash_id: string;

  @IsString()
  counter_name: string;

  @IsNumber()
  counter_no: number;
}

export class UserResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsString()
  data: string;

  @IsObject()
  counter_details: UserCounterDetailsDto;

  @IsNumber()
  is_active: number;

  @IsObject()
  company: UserCompanyDto;

  @IsObject()
  department: UserDepartmentDto | null;

  @IsString()
  session_log_id: string;

  @IsString()
  created_at: string;

  @IsString()
  updated_at: string | null;
}
