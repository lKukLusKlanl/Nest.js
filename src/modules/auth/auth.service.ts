import { BadRequestException, Injectable } from '@nestjs/common';
import { AppError } from 'src/common/constants/errors';
import { createUserDTO } from '../users/dto';
import { UserService } from '../users/users.service';
import { UserloginDTO } from './dto';
import * as bcrypt from 'bcrypt'
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) { }

    async registerUser(dto: createUserDTO): Promise<createUserDTO> {
        const existUser = await this.userService.findUserByEmail(dto.email)
        if (existUser) throw new BadRequestException(AppError.USER_EXIST)
        return this.userService.createUser(dto)
    }

    async loginUser(dto: UserloginDTO): Promise<AuthUserResponse> {
        const existUser = await this.userService.findUserByEmail(dto.email)
        if (!existUser) throw new BadRequestException(AppError.USET_NOT_EXIST)
        const validatePassword = await bcrypt.compare(dto.password, existUser.password)
        if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA)
        const userData={
            name: existUser.firstname,
            email: existUser.email
        }
        const token = await this.tokenService.generateJwtToken(userData)
        //  existUser.password= undefined вариант прощще
        const user = await this.userService.publicUser(dto.email)
        return { ...user, token }
    }
}