import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentionalsUserDto } from './dto/user-credentional.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signUp(
    authCredentionalsUserDto: AuthCredentionalsUserDto,
  ): Promise<UserEntity> {
    const { username, password } = authCredentionalsUserDto;

    const user = this.userRepository.create({
      username,
      password,
    });

    this.userRepository.save(user);
    return user;
  }
}
