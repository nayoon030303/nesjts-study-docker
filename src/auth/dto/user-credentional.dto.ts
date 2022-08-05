import { IsNotEmpty } from 'class-validator';

export class AuthCredentionalsUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
