import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentionalsUserDto } from './dto/user-credentional.dto';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(
    authCredentionalsUserDto: AuthCredentionalsUserDto,
  ): Promise<UserEntity> {
    const { username, password } = authCredentionalsUserDto;

    const user = this.create({
      username,
      password,
    });

    this.save(user);
    return user;
  }
}
