import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { RegisterDto } from './dto';
import * as argon from 'argon2';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (e) {
      console.error(e);
    }
  }
  async createUser(dto: RegisterDto) {
    const password = await argon.hash(dto.password);
    const aUser = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });
    if (aUser) {
      if (aUser.email === dto.email)
        throw new ForbiddenException('This Email Address Already Taken');
    }
    try {
      await this.prisma.user.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          password,
          jobTitle: dto.jobTitle,
          salary: dto.salary,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user)
      throw new NotFoundException('User with id: ' + id + ' not found');
    return user;
  }
  async updatePost(params: {
    where: Prisma.UserCreateInput;
    data: Prisma.UserUpdateInput;
  }) {
    const { data, where } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }
}
