import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async populateUsers(): Promise<void> {
    const users: User[] = [];
    for (let i = 0; i < 1000; i++) {
      users.push(
        this.userRepository.create({
          firstName: `User${i}`,
          lastName: `LastName${i}`,
          age: Math.floor(Math.random() * 100),
          gender: i % 2 === 0 ? 'male' : 'female',
          problems: i % 2 === 0 ? true : false,
        }),
      );
    }
    await this.userRepository.save(users);
  }

  async resetProblemsAndCountTrue(): Promise<number> {
    const count = await this.userRepository.count({
      where: { problems: true },
    });
    await this.userRepository.update({ problems: true }, { problems: false });
    return count;
  }
}
