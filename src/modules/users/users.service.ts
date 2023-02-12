import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt'
import { createUserDTO, UpdateUserDTO } from './dto';
import { Watchlist } from '../watchlist/models/watchlist.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userRepoitory: typeof User) { }

  async hashPassword(password: string): Promise<string> {
    try { return bcrypt.hash(password, 10) }
    catch (e) {
      throw new Error(e)
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.userRepoitory.findOne({
        where: { email }, include: {
          model: Watchlist,
          required: false
        }
      })
    }
    catch (e) {
      throw new Error(e)
    }
  }

  async createUser(dto: createUserDTO): Promise<createUserDTO> {
    try { // const existUser = await this.findUserByEmail(dto.email)
      // if(existUser) throw new BadRequestException(AppError.USER_EXIST)
      dto.password = await this.hashPassword(dto.password)
      // const newUser ={
      //   firstName: dto.firstname,
      //   username: dto.username,
      //   email: dto.email,
      //   password: dto.password
      // }

      await this.userRepoitory.create({
        firstname: dto.firstname,
        username: dto.username,
        email: dto.email,
        password: dto.password
      })
      return dto
    }
    catch (e) {
      throw new Error(e)
    }
  }
  async publicUser(email: string): Promise<User> {
    try {
      return await this.userRepoitory.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
        include: {
          model: Watchlist,
          required: false
        }
      })
    }
    catch (e) {
      throw new Error(e)
    }
  }
  async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    try {
      await this.userRepoitory.update(dto, { where: { email } })
      return dto
    }
    catch (e) {
      throw new Error(e)
    }
  }
  async deleteUser(email: string): Promise<boolean> {
    try {
      await this.userRepoitory.destroy({ where: { email } })
      return true
    }
    catch (e) {
      throw new Error(e)
    }
  }
}
