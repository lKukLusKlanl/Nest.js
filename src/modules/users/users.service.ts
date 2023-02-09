import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt'
import { createUserDTO, UpdateUserDTO } from './dto';
import { AppError } from 'src/common/constants/errors';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userRepoitory: typeof User) { }

  async hashPassword(password) {
    return bcrypt.hash(password, 10)
  }

  async findUserByEmail(email: string) {
    return this.userRepoitory.findOne({ where: { email } })
  }

  async createUser(dto: createUserDTO): Promise<createUserDTO> {
    // const existUser = await this.findUserByEmail(dto.email)
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
  async publicUser(email: string) {
    return this.userRepoitory.findOne({
      where: { email },
      attributes: { exclude: ['password'] }
    })
  }
  async updateUser(email: string, dto:UpdateUserDTO): Promise<UpdateUserDTO>{
    await this.userRepoitory.update(dto, {where: {email}})
    return dto
  }
  async deleteUser (email: string){
    await this.userRepoitory.destroy({where:{email}})
    return true
  }
}
