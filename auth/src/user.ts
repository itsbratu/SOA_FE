import { IsString} from 'class-validator';

export class User {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
