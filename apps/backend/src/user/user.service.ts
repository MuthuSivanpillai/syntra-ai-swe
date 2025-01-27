import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(
    fullName: string,
    email: string,
    password: string,
    role: string,
    companyName?: string,
    universityName?: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    // Set companyName or universityName based on the role
    let userCompanyName = null;
    let userUniversityName = null;

    if (role === 'Company' && companyName) {
      userCompanyName = companyName;
    } else if (role === 'University' && universityName) {
      userUniversityName = universityName;
    }

    const newUser = this.userRepository.create({
      fullName,
      email,
      password: hashedPassword,
      role,
      companyName: userCompanyName,
      universityName: userUniversityName,
    });
    
    return this.userRepository.save(newUser);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
