import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthCredentionalsUserDto } from './dto/user-credentional.dto';
import { UserEntity } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() authCredentionalUserDto: AuthCredentionalsUserDto,
  ): Promise<UserEntity> {
    return this.authService.signUp(authCredentionalUserDto);
  }
}
