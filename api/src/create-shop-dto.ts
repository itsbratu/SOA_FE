import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateShopDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsNumber()
  income: number;

  @IsDateString()
  openedAt: Date;
}
